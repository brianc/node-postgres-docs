const config = {
  gatsby: {
    // uncomment this if not hosted at root
    //pathPrefix: '/node-postgres-docs/',
    siteUrl: 'https://learn.hasura.io',
    gaTrackingId: null,
  },
  header: {
    logo: '',
    title: 'node-postgres',
    githubUrl: 'https://github.com/brianc/node-postgres',
    helpUrl: '',
    tweetText: '',
    links: [{ text: '', link: '' }],
  },
  sidebar: {
    forcedNavOrder: ['/', '/announcements', '/features', '/guides', '/api'],
    links: [{ text: '', link: '' }],
  },
  siteMetadata: {
    title: 'node-postgres',
    description: 'Documentation for node-postgres, the postgres database client for node.js',
    ogImage: null,
    docsLocation: 'https://github.com/hasura/gatsby-gitbook-boilerplate/tree/master/content',
    favicon: 'https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg',
  },
}

module.exports = config
