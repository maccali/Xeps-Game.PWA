/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */

const withPWA = require('next-pwa')
const Dotenv = require('dotenv-webpack')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    importScripts: ['/worker.js']
  },
  webpack: config => {
    // Add the new plugin to the existing webpack plugins
    config.plugins.push(new Dotenv({ silent: true }))
    return config
  },
  env: {
    APP_URL: process.env.APP_URL,
    API_URL: process.env.API_URL
  }
})
