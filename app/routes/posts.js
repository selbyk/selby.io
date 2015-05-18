import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";

export default Ember.Route.extend(ResetScrollMixin, {
  actions: {
    savePost: function(post, doTransition) {
      //console.log(JSON.stringify(post));
      if(doTransition !== false)
        doTransition = true;
      var _this = this;
      // Save the post
      post
        .save()
        .then(function() {
          //alert('on snap');
          if(doTransition)
            _this.transitionTo('posts');
        })
        .catch(function(err) {
          alert('Failed to save post!' + err.message || err);
        });
    }
  }
});
