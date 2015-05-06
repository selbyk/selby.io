import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";

export default Ember.Route.extend(ResetScrollMixin, {
  setupController: function(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);

    controller.set('dir', model);
  },
  model: function() {
    return this.store.fetchById('dir', 1);
  }
});