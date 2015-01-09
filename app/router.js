import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.reopen({
  notifyGoogleAnalytics: function() {
    return ga('send', 'pageview', {
        'page': this.get('url'),
        'title': this.get('url')
      });
  }.on('didTransition')
});


Router.map(function() {
  this.route('index', {path: '/'});
  this.route('stats', {path: '/stats'});
  this.route('projects', {path: '/projects'});
  this.route('todo', {path: '/todo'});
  this.route('about', {path: '/about'});
  this.resource('about', function () {
    this.route('tools');
  });
});

export default Router;
