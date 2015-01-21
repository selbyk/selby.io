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
  this.resource('posts', {path: '/blog'}, function () {
    this.route('new');
    this.route('edit', { path: '/:post_id/edit' });
    this.route('view', {path: '/:post_id'});
  });
  this.resource('links', {path: '/links'}, function () {
    this.route('new');
    this.route('view', {path: '/:link_id'});
  });
  this.route('stats', {path: '/stats'});
  this.route('todo', {path: '/todo'});
  this.route('about', {path: '/about'});
  this.resource('about', function () {
    this.route('projects');
    this.route('tools');
  });
});

export default Router;
