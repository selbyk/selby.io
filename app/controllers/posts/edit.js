import Ember from 'ember';

export default Ember.Controller.extend({
  saveMetronome: function() {
    var interval = 2500;
    Ember.run.later(this, function() {
      var post = this.get("post");
      //console.log("autoSave?");
      if(post && post.get('isDirty')){
        this.send('savePost', post, false);
        console.log("autoSave.");
      }
      this.saveMetronome();
    }, interval);
  }.on('init'),
  actions: {
    submit: function(){
      // Set the data to post route action
      //console.log(JSON.stringify(_this.get("post")));
      this.send('savePost', this.get("post"));
    }
  }
});
