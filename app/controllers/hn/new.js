import Ember from 'ember';

export default Ember.ArrayController.extend({
  // setup our query params
  queryParams: ["page", "pageSize"],

  // binding the property on the paged array
  // to the query params on the controller
  pageBinding: "page",
  perPageBinding: "model.meta.pageSize",
  totalPagesBinding: "model.meta.pageTotal",

  // set default values, can cause problems if left out
  // if value matches default, it won't display in the URL
  page: 1,
  perPage: 30
});