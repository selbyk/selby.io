import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ResetScrollMixin, {
    model: function(params) {
      //alert(params.post_id);
      return this.store.find('post', params.post_id);
    },
    setupController: function (controller, post) {
      controller.set('model', post);
    }
});
