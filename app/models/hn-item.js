import Ember from 'ember';
import DS from 'ember-data';

var hnItem = DS.Model.extend({
  title: DS.attr('string'),
  text: DS.attr('string'),
  dead: DS.attr('boolean'),
  //parent: DS.belongsTo('hnItem'),
  kids: DS.hasMany('hnItem'),
  //descendants: DS.hasMany('hnItem'),
  by: DS.attr('string'),
  score: DS.attr('number'),
  type: DS.attr('string'), //The type of item. One of "job", "story", "comment", "poll", or "pollopt".
  url: DS.attr('string'),
  time: DS.attr('number'),
  domain: Ember.computed("firstName", "lastName", {
    get: function() {
      if (this.get('url')) {
        try {
          var url_parts = (new URL(this.get('url')).hostname).split('.');
          return '%@.%@'.fmt(url_parts[url_parts.length - 2], url_parts[url_parts.length - 1]);
        } catch (e) {}
      }
    }
  }).property('url'),
  commentsUrl: Ember.computed("firstName", "lastName", {
    get: function() {
      return '//news.ycombinator.com/user?id=%@'.fmt(this.get('by'));
    }
  }).property('by'),
  publishedDate: Ember.computed("firstName", "lastName", {
    get: function() {
      return moment.unix(this.get('time')).fromNow();
    }
  }).property('time'),
  isUrl: Ember.computed("firstName", "lastName", {
    get: function() {
      return this.get('type') === 'story';
    }
  }).property('type'),
  isJob: Ember.computed("firstName", "lastName", {
    get: function() {
      return this.get('type') === 'job';
    }
  }).property('type')
});

export default hnItem;
