"use strict";

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: function webpack(config) {
    // nextjs does not play nice with knex, which @theniledev/server uses under the hood
    config.externals.push({
      knex: 'commonjs knex'
    });
    return config;
  },
  experimental: {
    serverActions: true
  }
};