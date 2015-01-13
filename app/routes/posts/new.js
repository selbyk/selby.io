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
        return {};
    },
    createPost: function() {
      /*var name = this.get('controller').get('newName');

      Ember.$.ajax('http://localhost:9393/artists', {
        type: 'POST',
        dataType: 'json',
        data: { name: name },
        context: this,
        success: function(data) {
          var artist = App.Artist.createRecord(data);
          this.modelFor('artists').pushObject(artist);
          this.get('controller').set('newName', '');
          this.transitionTo('artists.songs', artist);
        },
        error: function() {
          alert('Failed to save artist');
        }
      });*/
      //alert('Create that post!');
    }
});
