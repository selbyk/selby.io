import Ember from 'ember';
import ResetScrollMixin from "selby/mixins/reset-scroll";

export default Ember.Route.extend(ResetScrollMixin, {
    model: function() {
        //alert("model");
        return this.store.find('post');
    }
});
