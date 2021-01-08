import { NextPage } from "next";
import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

type Props = {
  fontSize: number;
  children: React.ReactNode;
};

const SvgHelper: NextPage<Props> = ({ children, fontSize }: Props) => {
  return <SvgIcon style={{ fontSize }}>{children}</SvgIcon>;
};

export default SvgHelper;
