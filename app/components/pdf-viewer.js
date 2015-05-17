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
        var scale = 1.5;
        var viewport = page.getViewport(scale);

        var canvas = document.getElementById(_this.get('elementId'));
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        page.render(renderContext);
      });
    });
  }.on('didInsertElement')
});
