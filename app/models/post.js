import DS from 'ember-data';

var post = DS.Model.extend({
  title: DS.attr('string'),
  content: DS.attr('string'),
  private: DS.attr('boolean'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  short: function(){
    if(this.get('content')){
      return this.get('content').substring(0,250) + "...";
    }
  }.property('content')
});

export default post;
