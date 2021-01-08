import Head from "next/head";
import { NextPage } from "next";
import React from "react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

interface Props {
  page?: string;
}

const PageHead: NextPage<Props> = ({ page }: Props) => {
  const pageTitle = page ? `${page} | ` : null;

  return (
    <Head>
      <title>
        {pageTitle}
        {publicRuntimeConfig.APP_NAME}
      </title>
    </Head>
  );
};

export default PageHead;
