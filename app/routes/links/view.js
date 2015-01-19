import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";

export default Ember.Route.extend(ResetScrollMixin, {
  model: function(params) {
    //alert(params.post_id);
    return this.store.find('item', params.item_id);
  },
  setupController: function (controller, item) {
    controller.set('model', item);
  },
});
