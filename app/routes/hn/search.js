import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(ResetScrollMixin, RouteMixin, {
  queryParams: {
    page: {
      refreshModel: true
    },
    q: {
      refreshModel: true
    }
  },
  // optional. default is 10
  perPage: 30,
  query: null,
  setupController: function(controller, model) {
    controller.set('query', this.get('query'));
    controller.set('model', model);
  },
  model: function(params) {
    this.set('query', params.q);
    // todo is your model name
    // returns a PagedRemoteArray
    return this.findPaged('hn-item', params);
  }
});