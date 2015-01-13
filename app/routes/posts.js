import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";

export default Ember.Route.extend(ResetScrollMixin, {
    /*beforeModel: function() {
      this._super();
      alert("before model");
      //this.render('search.index');
    },
    afterModel: function() {
      this._super();
      alert("after model");
      //this.render('search.index');
    },*/
    model: function() {
        //alert("model");
        //return this.store.find('post');
    }
});
