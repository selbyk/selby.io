import DS from 'ember-data';

var link = DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  description: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date')
});

export default link;
