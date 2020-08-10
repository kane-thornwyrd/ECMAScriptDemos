module.exports = {
  pathPrefix: '/ECMAScriptDemos',
  siteMetadata: {
    title: 'GODOT ECMAScript Demos',
    author: 'Geequlim',
    description:
      'A serie of exemples to showcase the usage of ECMAScript GODOT module',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#bbb',
        theme_color: '#333f67',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png',
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-typescript',
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: 'none',
              theme: 'cobalt',
              lineNumbers: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/presentations`,
      },
    },
  ],
}
