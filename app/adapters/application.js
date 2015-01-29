import DS from 'ember-data';
//import ENV from 'selby.io/config/environment';

export default DS.RESTAdapter.extend({
  namespace: 'api/v1',
});
