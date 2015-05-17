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
      this.send('savePost', post);
    }
  }
});
