import Head from "next/head";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

interface Props {
  page?: string;
}

const PageHead: NextPage<Props> = ({ page }: Props) => {
  const pageTitle = page ? `${page} | ` : null;
  const appDescription = publicRuntimeConfig.APP_DESCRIPTION;
  const appName = publicRuntimeConfig.APP_NAME;
  const appUrl = publicRuntimeConfig.APP_URL;
  const googleAnalyticsId = publicRuntimeConfig.GOOGLE_ANALYTICS_ID;
  const twitter = publicRuntimeConfig.TWITTER;

  return (
    <>
      <meta name="theme-color" content="#4285f4" />
      <NextSeo
        title={`${pageTitle}${appName}`}
        description={appDescription}
        canonical={appUrl}
        openGraph={{
          url: appUrl,
          title: appName,
          description: appDescription,
          // images: [
          //   {
          //     url: "https://www.example.ie/og-image-01.jpg",
          //     width: 800,
          //     height: 600,
          //     alt: "Og Image Alt",
          //   },
          //   {
          //     url: "https://www.example.ie/og-image-02.jpg",
          //     width: 900,
          //     height: 800,
          //     alt: "Og Image Alt Second",
          //   },
          //   { url: "https://www.example.ie/og-image-03.jpg" },
          //   { url: "https://www.example.ie/og-image-04.jpg" },
          // ],
          site_name: appName,
        }}
        twitter={{
          handle: twitter,
          site: appUrl,
          cardType: "summary_large_image",
        }}
      />

      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
};

export default PageHead;
