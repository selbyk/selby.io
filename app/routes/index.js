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
        var route = this;
        //alert("model");
        return new Ember.RSVP.Promise(function(resolve, reject) {
            $.getJSON('https://hacker-news.firebaseio.com/v0/topstories.json', function(stories) {
                for (var i = 0; i < 30 + 1; i++) {
                    route.store.find('item', stories[i]);
                }
                resolve(route.store.all('item'));
            });
        });
        this._super(thing + ", sir!");
    }
});
