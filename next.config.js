const path = require('path')
const webpack = require("webpack")
// require('./')

const {parsed: myEnv} =require('dotenv').config({
  path: "./.env"
})
module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  ignoreDuringBuilds: true,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    },
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv))

    return config
  }
}
