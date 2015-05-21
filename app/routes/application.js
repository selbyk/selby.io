import Ember from 'ember';
import ResetScrollMixin from "selby.io/mixins/reset-scroll";
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, ResetScrollMixin, {
  actions: {
    didTransition: function() {
      Ember.run.schedule('afterRender', this, this.checkIfNews);
      Ember.run.schedule('afterRender', this, this.highlightCode);
      return true;
    },
    sessionAuthenticationSucceeded: function() {
      this.transitionTo('posts');
    },
    sessionAuthenticationFailed: function(error) {
      alert(error.message);
    },
    hnSearch: function(q) {
      if (q) {
        this.transitionTo('hn.search', q);
      } else {
        this.transitionTo('hn.index', q);
      }
    }
  },
  checkIfNews: function() {
    var path = this.controllerFor('application').get('currentPath') || null;
    if (path && path.search('hn') !== -1) {
      this.controllerFor('application').set('isNews', true);
    } else {
      this.controllerFor('application').set('isNews', false);
    }
  },
  highlightCode: function() {
    Ember.$.ajaxSetup({
      cache: true,
      async: true
    });
    Ember.$.getScript('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.6/highlight.min.js', function(data, textStatus) {
      Ember.$('pre code').each(function(index, block) {
        hljs.highlightBlock(block);
      });
      Ember.$('pre code').each(function(index, block) {
        var pre = Ember.$(this).parent();
        pre.addClass('hljs');
        pre.html('<span class="line-number"></span>' + pre.html() + '<span class="cl"></span>');
          var num = pre.html().split(/\n/).length;
          for (var j = 0; j < num; j++) {
            var line_num = pre.find('.line-number');
            line_num.append('<span>' + (j + 1) + '</span>');
          }
      });
    });
  }
});
