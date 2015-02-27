import Ember from 'ember';

var DURATION = 1500;
var DELAY    = 500;

export default Ember.Component.extend({
  value: 0,
  draw: function() {
    //this.drawLineChart('lineChart', this.get('data'));
  }.on('didInsertElement')
});
