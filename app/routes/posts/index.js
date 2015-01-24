import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';


export default Ember.Route.extend(ResetScrollMixin, {
    needs: ['application'],
    model: function() {
        //alert("model");
        return this.store.find('post');
    }
});
