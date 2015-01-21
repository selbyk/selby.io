export default Ember.ObjectController.extend({
  actions: {
    submit: function(){
      var _this = this;

      var post = _this.get("model");
      
      function transitionToPost(post) {
        _this.transitionToRoute('posts.view', post);
      }

      function failure(reason) {
        alert(reason);
      }

      post.save().then(transitionToPost).catch(failure);

      //alert(this.get("title")+' '+JSON.stringify(this.get("content"))+' '+JSON.stringify(this.get("model")));
      /*Ember.$.ajax('/api/v1/posts/'+this.get("model.id"), {
        type: 'PUT',
        dataType: 'json',
        data: { 'post': this.get("model") },
        context: this,
        success: function(data) {
          this.transitionTo('posts');
        },
        error: function() {
          alert('Failed to save post!');
        }
      });*/
    }
  }
});
