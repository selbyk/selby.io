/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'selby.io',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      disqus: {
        shortname: 'selby'
      }
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    //contentSecurityPolicyHeader: 'Content-Security-Policy',
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' localhost:4200 localhost:35729 graph.facebook.com www.google-analytics.com connect.facebook.net load.sumome.com sumome-140a.kxcdn.com api.facebook.com urls.api.twitter.com",
      'font-src': "'self'",
      'img-src': "'self' 'unsafe-inline' data: s3-us-west-2.amazonaws.com www.google-analytics.com i.imgur.com sumome-140a.kxcdn.com sumome.com",
      'connect-src': "'self' localhost:4200 selby.io sumome.com load.sumome.com",
      'style-src': "'self' 'unsafe-inline' sumome-140a.kxcdn.com fonts.googleapis.com",
      'frame-src': "'self' static.ak.facebook.com s-static.ak.facebook.com",
      //'report-uri': "/api/csp"
    }
  };

  ENV['simple-auth'] = {
    authorizer: 'simple-auth-authorizer:oauth2-bearer',
    store: 'simple-auth-session-store:local-storage'
  };

  ENV['simple-auth-oauth2'] = {
    serverTokenEndpoint: '/api/token',
    serverTokenRevocationEndpoint: '/api/revoke'
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
