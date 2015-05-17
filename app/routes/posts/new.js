import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {
  setupController: function(controller, model) {
    // Set the post template to controller
    controller.set('post', model);
  },
  model: function(){
    // Make the post template
    return {
      title: '',
      content: '',
      private: true
    };
  },
  actions: {
    savePost: function(postData) {
      var _this = this;
      // Create the post
      var post = this.store.createRecord('post', {
        title: postData.title,
        content: postData.content,
        private: postData.private
      });
      // Save the post
      post
        .save()
        .then(function() {
          alert('on snap');
          _this.transitionTo('posts');
        })
        .catch(function(err) {
          alert('Failed to save post!' + err.message || err);
        });
    }
  }
});
