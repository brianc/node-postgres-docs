const config = {
  gatsby: {
    // uncomment this if not hosted at root
    //pathPrefix: '/node-postgres-docs/',
    pathPrefix: '/',
    siteUrl: 'https://node-postgres.com',
    gaTrackingId: 'UA-100138145-1',
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
    docsLocation: 'https://github.com/brianc/node-postgres-docs/tree/master/content',
    favicon: '/favicon.ico',
  },
}

module.exports = config
