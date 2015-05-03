import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";

export default Ember.Route.extend(ResetScrollMixin, {
  renderTemplate: function() {
    this.render('hn.show');
  },
  model: function() {
    return this.store.find('hn-item', {
      special: 'top'
    });
  }
});