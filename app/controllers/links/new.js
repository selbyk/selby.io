import Ember from 'ember';

export default Ember.ObjectController.extend({
  setupController: function(controller, model) {
    controller.set('model', {});
  },
  actions: {
    submit: function(){
      alert(this.get("title")+' '+JSON.stringify(this.get("content"))+' '+JSON.stringify(this.get("model")));
      Ember.$.ajax('/api/v1/links', {
        type: 'POST',
        dataType: 'json',
        data: { 'link': this.get("model") },
        context: this,
        success: function(data) {
          this.transitionTo('links');
        },
        error: function() {
          alert('Failed to save post!');
        }
      });
    }
  }
});
