import DS from 'ember-data';

var inflector = Ember.Inflector.inflector;
inflector.irregular('item', 'item');
inflector.singular(/item/, 'item');

var Item = DS.Model.extend({
    title: DS.attr('string'),
    by: DS.attr('string'),
    score: DS.attr('number'),
    type: DS.attr('string'),
    url: DS.attr('string'),
    domain: function() {
        var url_parts = (new URL(this.get('url')).hostname).split('.');
        return '%@.%@'.fmt(url_parts[url_parts.length - 2], url_parts[url_parts.length - 1])
    }.property('url'),
    commentsUrl: function() {
        return '//news.ycombinator.com/item?id=%@'.fmt(this.id)
    }.property('id'),
    authorUrl: function() {
        return '//news.ycombinator.com/user?id=%@'.fmt(this.get('by'))
    }.property('by'),
    time: DS.attr('number'),
    publishedDate: function() {
        return moment.unix(this.get('time')).fromNow();
    }.property('time'),
    isUrl: function() { return this.get('type') == 'story' }.property('type'),
    isJob: function() { return this.get('type') == 'job' }.property('type')
});

Ember.Inflector.inflector.uncountable('item');

export default Item;
