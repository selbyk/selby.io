import Ember from 'ember';
import ResetScrollMixin from "selby/mixins/reset-scroll";

export default Ember.Route.extend(ResetScrollMixin, {
    model: function() {
        var route = this;
        return new Ember.RSVP.Promise(function(resolve, reject) {
            $.getJSON('https://hacker-news.firebaseio.com/v0/topstories.json', function(stories) {
                for (var i = 0; i < 30 + 1; i++) {
                    route.store.find('item', stories[i]);
                }
                resolve(route.store.all('item'));
            });
        });
    }
});
