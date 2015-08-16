module.exports = {
  development: {
    isProduction: false,
    port: 3000,
    apiPort: 3030,
    app: {
      name: 'Superwish Development'
    },
    mongo: {
      uri: 'mongodb://localhost/superwish-dev'
    }
  },
  production: {
    isProduction: true,
    port: process.env.PORT,
    apiPort: 3030,
    app: {
      name: 'Superwish Production'
    }
    ,
    mongo: {
      uri: process.env.MONGOLAB_URI ||
      process.env.MONGOHQ_URL ||
      process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
      'mongodb://localhost/superwish'
    }
  }
}[process.env.NODE_ENV || 'development'];
