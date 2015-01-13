import DS from 'ember-data';

var post = DS.Model.extend({
  title: DS.attr('string'),
  content: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
});

export default post;