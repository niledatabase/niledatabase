/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (config) => {
    // nextjs does not play nice with knex, which @theniledev/server uses under the hood
    config.externals.push({
      knex: "commonjs knex",
    });
    return config;
  },
};
