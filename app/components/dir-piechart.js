import Ember from 'ember';

export default Ember.Component.extend({
  pie: null,
  size: 500,
  classNames: ['piechart-component'],
  dir: Ember.Object.extend({
    time: "N/A",
    uuid: "N/A",
    hostname: "N/A",
    path: "N/A",
    size: "N/A",
    children: [],
    createdAt: "N/A",
    updatedAt: "N/A"
  }),
  transitionToDir: 'transitionToDir',
  resizeWatcher: function() {
    var _this = this;
    var interval = 500;
    var timer = setTimeout(setSize, interval);

    var setSize = function() {
      clearTimeout(timer);
      var parSize = _this.$().parent().width();
      var realSize = Math.min(_this.get('size'), parSize);
      if (_this.get('realSize') !== realSize) {
        _this.set('realSize', realSize);
        _this.$().width(realSize);
        _this.$().height(realSize);
      }
    };
    setSize();
    var resizeHandler = function() {
      clearTimeout(timer);
      timer = setTimeout(setSize, interval);
    };
    this.set('resizeHandler', resizeHandler);
    Ember.$(window).bind('resize', this.get('resizeHandler'));
  }.on('didInsertElement'),
  resize: function() {
    this.createGraph();
  }.observes('realSize'),
  createGraph: function(_this) {
    _this = _this || this;
    var pie;
    Ember.$.ajaxSetup({
      cache: true,
      async: false
    });
    Ember.$.getScript('https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js', function(data, textStatus) {
      return Ember.$.getScript('/d3pie.min.js', function(result, textStatus) {
        if (_this.get('pie') !== null) {
          _this.get('pie').destroy();
        }
        var dir = _this.get('dir');
        var data = dir.get('children').map(function(child) {
          return {
            "dirId": child.get('id'),
            "label": child.get('dirLabel'),
            "value": child.get('size'),
          };
        });
        data.push({
          "dirId": 0,
          "label": "Hidden",
          "value": dir.get('otherSize'),
        });
        var size = _this.get('realSize');
        Ember.$.ajaxSetup({
        cached: true,
        async: false
        });
        pie = new d3pie(_this.get('elementId'), {
          "header": {
            "title": {
              "text": dir.get('dirLabel'),
              "fontSize": 20,
              "font": "Source Sans Pro"
            },
            "subtitle": {
              "text": dir.get('sizeString'),
              "color": "#267122",
              "fontSize": 20,
              "font": "Source Sans Pro"
            },
            "location": "pie-center",
            "titleSubtitlePadding": 10
          },
          "footer": {
            "text": "Last Update:" + dir.get('timeSince'),
            "color": "#4c3434",
            "font": "open sans",
            "location": "bottom-left"
          },
          "size": {
            "canvasHeight": size,
            "canvasWidth": size,
            "pieInnerRadius": "60%",
            "pieOuterRadius": "65%"
          },
          "data": {
            "sortOrder": "label-desc",
            "content": data
          },
          "labels": {
            "outer": {
              "format": "label",
              "hideWhenLessThanPercentage": 2,
              "pieDistance": 10
            },
            "inner": {
              "format": "percentage",
              "hideWhenLessThanPercentage": 2
            },
            "mainLabel": {
              "fontSize": 10
            },
            "percentage": {
              "color": "#999999",
              "fontSize": 11,
              "decimalPlaces": 0
            },
            "value": {
              "color": "#cccc43",
              "fontSize": 11
            },
            "lines": {
              "enabled": true
            },
            "truncation": {
              "enabled": true
            }
          },
          "effects": {
            "load": {
              "speed": 250
            },
            "pullOutSegmentOnClick": {
              "effect": "none",
              "speed": 0,
              "size": 0
            }
          },
          "misc": {
            "canvasPadding": {
              "top": 0,
              "right": 0,
              "bottom": 0,
              "left": 0
            }

          },
          "callbacks": {
            onClickSegment: function(e) {
              //console.log(e.data);
              _this.sendAction('transitionToDir', e.data.dirId);
            }
          }
        });
        _this.set('pie', pie);
        return pie;
      });
    });
  },
  updateGraph: function() {
    var dir = this.get('dir');
    var data = dir.get('children').map(function(child) {
      return {
        "dirId": child.get('id'),
        "label": child.get('dirLabel'),
        "value": child.get('size')
      };
    });
    data.push({
      "dirId": 0,
      "label": "Hidden",
      "value": dir.get('otherSize')
    });
    var label = dir.get('dirLabel') === "root" ? dir.get('dirLabel') : "<~" + dir.get('dirLabel');
    this.get('pie').updateProp("header.title.text", label);
    this.get('pie').updateProp("header.subtitle.text", dir.get('sizeString'));
    this.get('pie').updateProp("data.content", data);
  }.observes('dir'),
  click: function(e) {
    var offset = this.$().offset();
    var center = this.get('realSize')/2;
    var x = e.pageX-offset.left, y = e.pageY-offset.top;
    var d = Math.sqrt(Math.pow(center-x,2)+Math.pow(center-y,2));
    if(center/d > Math.PI && this.get('dir.parent.id')) {
      this.sendAction('transitionToDir', this.get('dir.parent.id'));
    }
  },
  getColor: function() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
});
