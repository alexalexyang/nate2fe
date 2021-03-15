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
      width: "100%",
      background: "rgb(236, 220, 77)",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    menuBox: {
      height: "100%",
      width: "100%",
      display: "flex",
      padding: 0,
      minHeight: "0",
    },
    menuItems: {
      height: "100%",
      width: "100%",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
    menuLink: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);
