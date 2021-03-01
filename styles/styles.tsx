import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import { IPalette } from "./theme";
import { navBarHeight } from "./style-constants";
import styled from "styled-components";

export const StyledWarning = styled.p`
  font-size: 1rem;
  color: #bd1919;
`;

interface ITheme extends Theme {
  palette: IPalette;
}

export const navBarStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      height: navBarHeight,
      flexGrow: 1,
      background: "rgb(236, 220, 77)",
    },
    spaceBetween: {
      justifyContent: "space-between",
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
