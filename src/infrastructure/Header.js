import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import GitHubIcon from "@material-ui/icons/GitHub";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import RemoveRedEyeOutlinedIcon from "@material-ui/icons/RemoveRedEyeOutlined";
import UsbIcon from '@material-ui/icons/Usb';
import StarOutlinedIcon from "@material-ui/icons/StarOutlined";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "../infrastructure/style.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-between",
  },
  githubIcon: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    flexGrow: 10,
  },
  buttonDiv: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

function Header() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [watch, setWatch] = useState(0)
  const [star, setStar] = useState(0)
  const [fork, setFork] = useState(0)
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [value, setValue] = useState(0);

  const handleClick = () => {};

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "black" }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.githubIcon}>
            <GitHubIcon />
            <NotificationsActiveIcon />
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.root}>
        <Typography variant="h5" className={classes.title} color='primary'>
          facebook/create-react-app
        </Typography>
        <div className={classes.buttonDiv}>
          <ButtonGroup
            ref={anchorRef}
            aria-label="split button"
          >
            <Button onClick={() => setWatch(watch + 1)}>
              <RemoveRedEyeOutlinedIcon style={{marginRight: '5px'}}/>
              watch
            </Button>
            <Button
              size="small"
              aria-label="select merge strategy"
              aria-haspopup="menu"
            >
              {watch}
            </Button>
          </ButtonGroup>
          <ButtonGroup
            ref={anchorRef}
            aria-label="split button"
          >
            <Button onClick={() => setStar(star+1)}>
              <StarOutlinedIcon style={{marginRight: '5px'}}/>
              Unstar
            </Button>
            <Button
              size="small"
              aria-label="select merge strategy"
              aria-haspopup="menu"
            >
              {star}
            </Button>
          </ButtonGroup>
          <ButtonGroup
            ref={anchorRef}
            aria-label="split button"
          >
            <Button onClick={() => setFork(fork + 1)}>
              <UsbIcon style={{marginRight: '5px'}}/>
              Fork
            </Button>
            <Button
              size="small"
              aria-label="select merge strategy"
              aria-haspopup="menu"
            >
              {fork}
            </Button>
          </ButtonGroup>
        </div>
      </Toolbar>
      <Paper className={classes.root}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={value}
          onChange={handleChange}
        >
          <Tab label="Code" disabled/>
          <Tab label="Issue"/>
          <Tab label="Pull Request" disabled/>
          <Tab label="Discussion" disabled/>
          <Tab label="Action" disabled/>
          <Tab label="Project" disabled/>
        </Tabs>
      </Paper>
    </div>
  );
}

export default Header;
