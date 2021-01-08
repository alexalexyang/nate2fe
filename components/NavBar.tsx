import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import { menuItem, menuItems } from "../projects/main/config";

import { IPalette } from "../styles/theme";
import Link from "next/link";
import MenuIcon from "@material-ui/icons/Menu";
import { NextPage } from "next";
import PlayLottie from "../utils/play-lottie";
import React from "react";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
// import SvgHelper from "./SvgHelper";
import monster from "./Dashboard/logos/green-monster.json";
import { useUser } from "../context/user";

interface ITheme extends Theme {
  palette: IPalette;
}

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logo: {
      flexGrow: 0.5,
      [theme.breakpoints.down("xs")]: {
        flexGrow: 1,
      },
    },
    menuBox: {
      display: "flex",
      flexGrow: 1,
      [theme.breakpoints.down("xs")]: {
        flexGrow: 0,
      },
    },
    menuItems: {
      display: "flex",
      flex: 1,
      justifyContent: "space-around",
    },
    menuLink: {
      color: "inherit",
      textDecoration: "inherit",
    },
    gradient: {
      background: theme.palette.gradient.lightGradient,
    },
  })
);

const NavBar: NextPage = () => {
  const { user } = useUser();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const itemLink = (item: menuItem) => {
    return (
      <Link href={item.url}>
        <a className={classes.menuLink} href={item.url}>
          {item.title}
        </a>
      </Link>
    );
  };

  const renderMenuItems = (items: menuItem[]): any => {
    const host = window.location.host;
    return items.map((item, index) => {
      if (!host.includes("localhost") && item.title === "Login") {
        return;
      }
      if (item.title === "Login" && user && user.auth) return null;
      if (item.auth && user && !user.auth) return null;
      return isMobile ? (
        <MenuItem key={index}>{itemLink(item)}</MenuItem>
      ) : (
        <Typography key={index} variant="h6">
          {itemLink(item)}
        </Typography>
      );
    });
  };

  return (
    <div>
      <AppBar position="static" className={classes.gradient}>
        <Toolbar>
          <Typography variant="h6" className={classes.logo}>
            {PlayLottie(monster, 60, 60)}
          </Typography>
          <div className={classes.menuBox}>
            {isMobile ? (
              <>
                <IconButton
                  onClick={handleMenu}
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {renderMenuItems(menuItems)}
                </Menu>
              </>
            ) : (
              <div className={classes.menuItems}>
                {renderMenuItems(menuItems)}
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
