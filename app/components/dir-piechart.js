import Ember from 'ember';

export default Ember.Component.extend({
  pie: null,
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
  getColor: function() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  },
  updateGraph: function() {
    this.get('pie').destroy();
    this.createGraph();
  }.observes('dir'),
  createGraph: function() {
    var _this = this;
    var dir = this.get('dir');
    var data = dir.get('children').map(function(child) {
      return {
        "dirId": child.get('id'),
        "label": child.get('dirLabel'),
        "value": child.get('size'),
        "color": _this.getColor()
      };
    });
    data.push({
      "dirId": 0,
      "label": "Not Shown",
      "value": dir.get('otherSize'),
      "color": _this.getColor()
    });

    var pie = new d3pie(this.get('elementId'), {
      "header": {
        "title": {
          "text": dir.get('dirLabel'),
          "fontSize": 20,
          "font": "courier"
        },
        "subtitle": {
          "text": dir.get('sizeString'),
          "color": "#267122",
          "font": "courier"
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
        "pieInnerRadius": "84%",
        "pieOuterRadius": "58%"
      },
      "data": {
        "sortOrder": "label-desc",
        "content": data
      },
      "labels": {
        "outer": {
          "format": "label-percentage1",
          "hideWhenLessThanPercentage": 2,
          "pieDistance": 10
        },
        "inner": {
          "format": "none"
        },
        "mainLabel": {
          "fontSize": 11
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
      "tooltips": {
        "enabled": true,
        "type": "placeholder",
        "string": "{label}: {percentage}%"
      },
      "effects": {
        "pullOutSegmentOnClick": {
          "effect": "linear",
          "speed": 400,
          "size": 8
        }
      },
      "misc": {
        "colors": {
          "segmentStroke": "#000000"
        }
      },
      "callbacks": {
        onClickSegment: function(e) {
          //console.log(e.data);
          _this.sendAction('transitionToDir', e.data.dirId);
        }
      }
    });
    this.set('pie', pie);
  }.on('didInsertElement')
});