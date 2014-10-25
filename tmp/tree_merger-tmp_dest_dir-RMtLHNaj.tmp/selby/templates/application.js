import Ember from 'ember';
export default Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1;


  data.buffer.push("<nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\n  <div class=\"container-fluid\">\n    <div class='col-xs-12'>\n<pre class='logo'>\n          _ _                  (_)      <br>\n ___  ___| | |__  _   _         _  ___  <br>\n/ __|/ _ \\ | '_ \\| | | |       | |/ _ \\ <br>\n\\__ \\  __/ | |_) | |_| |       | | (_)  <br>\n|___/\\___|_|_.__/ \\__  |  (_)  |_|\\___/ <br>\n                  _/  /              <br>\n                 |___/              <br>\n</pre>\n    </div>\n  </div>\n</nav>\n\n");
  stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n<ul class=\"pages\">\n    <li class=\"chat page\">\n      <div class=\"chatArea\">\n        <ul class=\"messages\"></ul>\n      </div>\n      <input class=\"inputMessage\" placeholder=\"Type here...\"/>\n    </li>\n    <li class=\"login page\">\n      <div class=\"form\">\n        <h3 class=\"title\">What's your nickname?</h3>\n        <input class=\"usernameInput\" type=\"text\" maxlength=\"14\" />\n      </div>\n    </li>\n  </ul>\n\n<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-xs-2 col-sm-1 button linkedin\"><a href=\"http://www.linkedin.com/pub/selby-kendrick/50/289/650\" alt=\"LinkedIn\"></a></div>\n    <div class=\"col-xs-2 col-sm-1 button github\"><a href=\"https://github.com/selbyk\" alt=\"Github\"></a></div>\n    <div class=\"col-xs-2 col-sm-1 button lastfm\"><a href=\"http://www.last.fm/user/n344853835\" alt=\"Lastfm\"></a></div>\n    <div class=\"col-xs-2 col-sm-1 button email\"><a href=\"mailto:selby.kendrick@gmail.com\" alt=\"E-mail me\"></a></div>\n    <div class='col-xs-12 col-sm-7'>\n      <blockquote>\n        <p>...as simple as possible, but not simpler.</p>\n        <footer><cite title=\"Albert Einstein\">Albert Einstein</cite></footer>\n      </blockquote>\n    </div>\n  </div>\n<p class=\"center-text copyright\">&copy 2014 Selby Kendrick</p>\n</div>\n");
  return buffer;
  
});
