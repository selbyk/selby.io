import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['application'],
  sortProperties: ['created_at'],
  sortAscending: false
});
