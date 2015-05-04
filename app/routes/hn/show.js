import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

export default Ember.Route.extend(ResetScrollMixin, RouteMixin, {
  queryParams: {
    page: {
      refreshModel: true
    }
  },
  // optional. default is 10
  perPage: 30,
  model: function(params) {
    // todo is your model name
    // returns a PagedRemoteArray
    params.special = 'show';
    return this.findPaged('hn-item', params);
  }
});