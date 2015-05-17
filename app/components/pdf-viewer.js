import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'canvas',
  transitionToDir: 'transitionToDir',
  createGraph: function() {
    var _this = this;
    PDFJS.getDocument(_this.get('url')).then(function(pdf) {
      // you can now use *pdf* here
      pdf.getPage(1).then(function(page) {
        // you can now use *page* here
        var desiredWidth = Ember.$('#'+_this.get('elementId')).parent().width();
var viewport = page.getViewport(1);
var scale = desiredWidth / viewport.width;
var scaledViewport = page.getViewport(scale);
        //var scale = 1.5;
        //var viewport = page.getViewport(scale);

        var canvas = document.getElementById(_this.get('elementId'));
        var context = canvas.getContext('2d');
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;

        var renderContext = {
          canvasContext: context,
          viewport: scaledViewport
        };
        page.render(renderContext);
      });
    });
  }.on('didInsertElement')
});
