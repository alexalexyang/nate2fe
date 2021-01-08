import { useEffect, useState } from "react";

import { AppProps } from "next/app";
import CssBaseline from "@material-ui/core/CssBaseline";
import Head from "next/head";
import Layout from "../components/Layout";
import { ThemeProvider } from "@material-ui/core/styles";
import { User } from "../context/user";
import getConfig from "next/config";
import theme from "../styles/theme";

const { publicRuntimeConfig } = getConfig();

export default function App({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState({
    auth: null,
    loading: true,
  });

  useEffect(() => {
    // Remove the server-side injected CSS.
    const getUser = async () => {
      const res = await fetch("/api/auth/me");
      const auth = res.ok ? await res.json() : null;
      setUser({ auth, loading: false });
    };
    getUser();

    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles &&
        jssStyles.parentElement &&
        jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{publicRuntimeConfig.APP_NAME}</title>
        <link rel="icon" href="/Monster.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <User.Provider value={{ user, setUser }}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </User.Provider>
    </>
  );
}
