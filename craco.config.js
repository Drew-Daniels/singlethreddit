module.exports = {
    webpack: {
      alias: {
        '@mui/styled-engine': '@mui/styled-engine-sc',
      },
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    },
  };
