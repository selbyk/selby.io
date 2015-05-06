import Ember from 'ember';

var DURATION = 1500;
var DELAY = 500;

export default Ember.Controller.extend({
  needs: 'application',
  actions: {
    transitionToDir: function(dirId) {
      var _this = this;
      this.store.fetchById('dir', dirId)
        .then(function(dir) {
          _this.set('dir', dir);
          _this.set('parent', dir.get('parent'));
        });
    }
  }
});