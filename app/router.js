import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.reopen({
  notifyGoogleAnalytics: function() {
    return ga("send", "pageview", {
      "page": this.get("url"),
      "title": this.get("url")
    });
  }.on("didTransition")
});

Router.map(function() {
  this.resource("index", {
    path: "/"
  }, function() { // -> FooBarRoute
    // /this.route('baz');                  // -> FooBarBazRoute
  });

  this.route("map");

  this.route("login");



  this.resource("posts", {
    path: "/blog"
  }, function() {
    this.route("new");

    this.route("edit", {
      path: "/:post_id/edit"
    });

    this.route("view", {
      path: "/:post_id"
    });
  });

  this.resource("files", {
    path: "/files"
  }, function() {
    this.route("new");

    //this.route("edit", {
    //  path: "/:post_id/edit"
    //});

    //this.route("view", {
    //  path: "/:post_id"
    //});
  });

  this.resource("hn", {
    path: "/hn"
  }, function() {
    this.route("new", {
      path: "/new"
    });
    this.route("ask", {
      path: "/ask"
    });
    this.route("show", {
      path: "/show"
    });
    this.route("search", {
      path: "/search/:q"
    });
  });

  this.resource("links", {
    path: "/links"
  }, function() {
    this.route("new");

    this.route("view", {
      path: "/:link_id"
    });
  });

  this.route("stats", {
    path: "/stats"
  });

  this.route("todo", {
    path: "/todo"
  });

  this.route("about", {
    path: "/about"
  });

  this.resource("about", function() {
    this.route("projects");
    this.route("tools");
  });
});

export default Router;