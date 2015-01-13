import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";

export default Ember.Route.extend(ResetScrollMixin, {
  model: function(params) {
    //alert(params.post_id);
    return this.store.find('post', params.post_id);
  },
  setupController: function (controller, post) {
    controller.set('model', post);
  },
});
