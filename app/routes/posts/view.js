import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";

export default Ember.Route.extend(ResetScrollMixin, {
  model: function(params) {
    return this.store.find('post', params.post_id);
  },
  setupController: function (controller, post) {
    controller.set('post', post);
    this.send('setCurrentTitle', post.get('title'));
  }
});
