import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    submit: function(){
      var _this = this;
      // Set the data to post route action
      console.log(JSON.stringify(_this.get("post")));
      this.send('savePost', _this.get("post"));
    }
  }
});
