import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, ResetScrollMixin, {
    actions: {
      sessionAuthenticationSucceeded: function(){
        //alert("omg");
        this.transitionTo('posts');
      },
      sessionAuthenticationFailed: function(error){
        alert(error.message);
      },
      loading: function() {
        //alert('crazy custom stuff');
      }
    }
});
