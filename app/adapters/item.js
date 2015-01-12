import DS from 'ember-data';
//import ENV from 'selby.io/config/environment';

export default DS.FirebaseAdapter.extend({
	firebase: new Firebase('https://hacker-news.firebaseio.com/v0')
});
