import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";

export default Ember.Route.extend(ResetScrollMixin, {
  actions: {
    savePost: function(post) {
      var _this = this;
      // Save the post
      post
        .save()
        .then(function() {
          alert('on snap');
          _this.transitionTo('posts');
        })
        .catch(function(err) {
          alert('Failed to save post!' + err.message || err);
        });
    }
  }
});
