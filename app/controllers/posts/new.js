import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function(){
      // Set the data to post route action
      this.send('savePost', this.store.createRecord('post', this.get("post")));
    }
  }
});
