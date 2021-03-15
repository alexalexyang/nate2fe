import { AppBar, Toolbar } from "@material-ui/core";
import { menuItem, menuItems } from "../apps/main/config";

import Home from "../public/fa-heart-regular.svg";
import Link from "next/link";
import Login from "../public/fa-sign-in-alt-solid.svg";
import { NextPage } from "next";
import React from "react";
import SettingsAndProfile from "../public/fa-user-regular.svg";
import Star from "../public/fa-star-regular.svg";
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
    const pathname = window.location.pathname;

    return items.map((item) => {
      if (!host.includes("localhost") && item.title === "Login") {
        return;
      }

      if (item.title === "Home")
        return (
          <Link href={item.url}>
            <a className={classes.menuLink} href={item.url}>
              <Home
                fill={pathname === "/" ? "#6849d8" : "#aec1cf"}
                alt={item.title}
                height="35px"
              />
            </a>
          </Link>
        );

      if (item.title === "Login") {
        return user && user.auth ? null : (
          <Link href={item.url}>
            <a className={classes.menuLink} href={item.url}>
              <Login fill="#aec1cf" alt={item.title} height="35px" />
            </a>
          </Link>
        );
      }

      if (item.title === "Top Movies")
        return (
          <Link href={item.url}>
            <a className={classes.menuLink} href={item.url}>
              <Star
                fill={pathname.includes(item.url) ? "#D84949" : "#aec1cf"}
                alt={item.title}
                height="35px"
              />
            </a>
          </Link>
        );

      if (item.title === "About")
        return (
          <Link href={item.url}>
            <a className={classes.menuLink} href={item.url}>
              <SettingsAndProfile
                fill={pathname.includes(item.url) ? "#008080" : "#aec1cf"}
                alt={item.title}
                height="35px"
              />
            </a>
          </Link>
        );
      if (item.auth && user && !user.auth) return null;
      return itemLink(item);
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
