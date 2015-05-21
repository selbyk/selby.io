import Ember from 'ember';

export default Ember.View.extend({
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
  }.on('didInsertElement')
});
