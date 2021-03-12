import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { menuItem, menuItems } from "../apps/main/config";

import Link from "next/link";
import { NextPage } from "next";
import React from "react";
import { navBarStyles } from "../styles/styles";
import { useUser } from "../context/user";

const NavBar: NextPage = () => {
  const { user } = useUser();

  const classes = navBarStyles();

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
      return (
        <Typography key={index} variant="h6">
          {itemLink(item)}
        </Typography>
      );
    });
  };

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.menuBox}>
        <div className={classes.menuItems}>{renderMenuItems(menuItems)}</div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
