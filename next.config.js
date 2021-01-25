module.exports = {
  serverRuntimeConfig: {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_REDIRECT_URI: process.env.AUTH0_REDIRECT_URI,
    AUTH0_LOGOUT_REDIRECT_URI: process.env.AUTH0_LOGOUT_REDIRECT_URI,
    AUTH0_SESSION_COOKIE_SECRET: process.env.AUTH0_SESSION_COOKIE_SECRET,
    TMDB_V3: process.env.TMDB_V3,
    MONGODB_PW: process.env.MONGODB_PW,
  },
  publicRuntimeConfig: {
    APP_NAME: process.env.APP_NAME,
    DUMMY: process.env.DUMMY,
  },
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.md$/,
        use: "raw-loader",
      }
    );

    return config;
  },
};
