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
  this.route('stack', {path: '/stack'});
  this.route('todo', {path: '/todo'});
});

export default Router;
