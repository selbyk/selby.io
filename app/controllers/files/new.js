import Ember from 'ember';

export default Ember.ObjectController.extend({
  setupController: function(controller, model) {
    controller.set('files', {});
    controller.set('progressPercent', 0);
  },
  actions: {
    updateProgress: function(progress){
      alert('here');
      this.set('progressPercent', ++progress);
    },
    amazonUpdate: function(progress){
      alert('WORK!');
    }
  }
});
