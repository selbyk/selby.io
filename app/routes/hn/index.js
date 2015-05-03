import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";

export default Ember.Route.extend(ResetScrollMixin, {
  model: function() {
    return this.store.find('hn-item', {
      special: 'top'
    });
  }
});