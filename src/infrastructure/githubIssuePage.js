import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setData } from "../application/actions/githubActions";
import { Container, makeStyles, alpha, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CheckIcon from "@material-ui/icons/Check";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import InfiniteScroll from "react-infinite-scroll-component";
import "semantic-ui-css/semantic.min.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
    border: "1px solid grey",
    borderRadius: 5,
  },
}));

const GithubIssuePage = () => {
  const issue = useSelector((state) => state.allGithubIssue.issue);
  console.log(issue);
  const [hasMore, setHasMore] = useState(true);
  const [getData, setGetData] = useState([].slice(0, 10));
  const [count, setCount] = useState(10);
  const dispatch = useDispatch();
  const classes = useStyles();

  const fetchGithubIssue = async () => {
    const token = "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";
    const config = {
      headers: {
        Authorization: "token" + token,
      },
    };
    const response = await axios
      .get("https://api.github.com/repos/facebook/create-react-app/issues")
      .catch((err) => {
        console.log(err);
      });
    setGetData(response.data);
    dispatch(setData(response.data));
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setGetData(getData.concat(getData.slice(count, count + 10)));
      setCount(count + 10);
    }, 200);
  };

  useEffect(() => {
    fetchGithubIssue();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={10}>
            <Grid item xs={6}>
              <div
                class="ui left action right icon input"
                style={{ width: "80ch" }}
              >
                <div class="ui basic floating dropdown button">
                  <div class="text">filter</div>
                  <i class="dropdown icon"></i>
                </div>
                <i class="search icon"></i>
                <input type="text" placeholder="Search" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div class="ui labeled button" tabindex="0">
                <div class="ui button">
                  <i class="sticky note icon"></i> label
                </div>
                <a class="ui basic label">2,048</a>
              </div>
              <div class="ui labeled button" tabindex="0">
                <div class="ui button">
                  <i class="sticky note icon"></i> Milestones
                </div>
                <a class="ui basic label">2,048</a>
              </div>
              <button class="positive ui button">New Issue</button>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                <ErrorOutlineIcon style={{ marginRight: "5px" }} />
                495 Open
              </Typography>
            </Grid>
            <Grid item>
            <Typography variant="h6">
                <CheckIcon style={{ marginRight: "5px" }} />
                5,465 Closed
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={10} style={{ padding: 50, marginRight: 30 }}>
            <div className="container">
              <div className="card">
                <div className="card-header">Status</div>
              </div>
              <React.Fragment>
                <InfiniteScroll
                  dataLength={getData.length}
                  hasMore={hasMore}
                  next={fetchMoreData}
                  loader={<h4>Loading...</h4>}
                >
                  {getData.map((data, index) => {
                    return <Row data={data} key={index} />;
                  })}
                </InfiniteScroll>
              </React.Fragment>
            </div>
          </Grid>
        </Container>
      </div>
    </>
  );
};

const Row = (props) => {
  let { title, labels, number, user, comments } = props.data;
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          <i className="fa fa-exclamation-circle circle"></i>
          {title}
          {labels.map((data, index) => {
            if (data.name === "needs triage") {
              return (
                <span className="badge badge-pill badge-danger">
                  {data.name}
                </span>
              );
            }
            return (
              <span className="badge badge-pill badge-warning">
                {data.name}
              </span>
            );
          })}
          {comments === 0 ? null : (
            <span className="comment">
              <i className="fa fa-comment-o" style={{ padding: "5px" }}></i>
              {comments}
            </span>
          )}
        </h5>
        <p class="card-text">
          #{number} opened by {user.login}
        </p>
      </div>
    </div>
  );
};

export default GithubIssuePage;
