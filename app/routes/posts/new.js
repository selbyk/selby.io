import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {
  setupController: function(controller, model) {
    // Set the post template to controller
    controller.set('post', model);
    this.send('setCurrentTitle', model.get('title'));
  },
  model: function(){
    // Make the post template
    return {
      title: '',
      content: '',
      private: true
    };
  }
});
