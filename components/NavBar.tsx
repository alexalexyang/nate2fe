import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { menuItem, menuItems } from "../projects/main/config";

import Link from "next/link";
import MenuIcon from "@material-ui/icons/Menu";
import { NextPage } from "next";
import PlayLottie from "../utils/play-lottie";
import React from "react";
import monster from "./Dashboard/logos/green-monster.json";
import { navBarHeight } from "../styles/style-constants";
import { navBarStyles } from "../styles/styles";
import { useTheme } from "@material-ui/core/styles";
import { useUser } from "../context/user";

const NavBar: NextPage = () => {
  const { user } = useUser();

  const classes = navBarStyles();
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
    <AppBar position="static" className={classes.gradient}>
      <Toolbar className={classes.spaceBetween}>
        <Link href="/">
          <a href="/" rel="Home">
            {PlayLottie(monster, navBarHeight, navBarHeight)}
          </a>
        </Link>
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
  );
};

export default NavBar;
