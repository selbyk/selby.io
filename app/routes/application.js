import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, ResetScrollMixin, {
  actions: {
    didTransition: function() {
      var path = this.controllerFor('application').get('currentPath') || null;
      if (path && path.search('hn') !== -1) {
        this.controllerFor('application').set('isNews', true);
      } else {
        this.controllerFor('application').set('isNews', false);
      }
      return true; // Bubble the didTransition event
    },
    sessionAuthenticationSucceeded: function() {
      //alert(this.get('currentPath'));
      this.transitionTo('posts');
    },
    sessionAuthenticationFailed: function(error) {
      alert(error.message);
    },
    hnSearch: function(q) {
      if (q) {
        this.transitionTo('hn.search', q);
      } else {
        this.transitionTo('hn.index', q);
      }
    }
  }
});
