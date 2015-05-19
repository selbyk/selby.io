import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";

export default Ember.Route.extend(ResetScrollMixin, {
    setupController: function(controller, model){
      controller.set('model', model);
      this.send('setCurrentTitle', null);
    },
    model: function() {
        return this.store.find('post');
    }
});
