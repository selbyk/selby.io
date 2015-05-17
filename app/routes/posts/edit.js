import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {
  setupController: function (controller, model) {
    controller.set('post', model);
  },
    model: function(params) {
      return this.store.find('post', params.post_id);
    },
    actions: {
      savePost: function(post) {
        console.log(JSON.stringify(post));
        var _this = this;
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
