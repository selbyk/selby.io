import DS from 'ember-data';
import {
  ago
}
from 'ember-moment/computed';

var dir = DS.Model.extend({
  time: DS.attr('number'),
  uuid: DS.attr('string'),
  hostname: DS.attr('string'),
  path: DS.attr('string'),
  size: DS.attr('number'),
  children: DS.hasMany('dir'),
  parent: DS.belongsTo('dir', {
    inverse: 'children'
  }),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date'),
  otherSize: function() {
    var hiddenUsed = this.get('size');
    var children = this.get('children');
    children.forEach(function(child) {
      hiddenUsed = hiddenUsed - child.get('size');
    });
    return hiddenUsed;
  }.property('children', 'size'),
  dirLabel: function() {
    if (this.get('path') === '/') {
      return "root (" + this.get('sizeString') + ")";
    } else {
      return this.get('path').match(/([^\/]*)\/*$/)[1] + " (" + this.get('sizeString') + ")";
    }

  }.property('path', 'size'),
  sizeString: function() {
    var bytes = this.get('size');
    var precision = 1;
    var kilobyte = 1;
    var megabyte = kilobyte * 1024;
    var gigabyte = megabyte * 1024;
    var terabyte = gigabyte * 1024;

    if ((bytes >= 0) && (bytes < kilobyte)) {
      return bytes + ' B';

    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
      return (bytes / kilobyte).toFixed(precision) + ' KB';

    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
      return (bytes / megabyte).toFixed(precision) + ' MB';

    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
      return (bytes / gigabyte).toFixed(precision) + ' GB';

    } else if (bytes >= terabyte) {
      return (bytes / terabyte).toFixed(precision) + ' TB';

    } else {
      return bytes + ' B';
    }
  }.property('size'),
  otherSizeString: function() {
    var bytes = this.get('otherSize');
    var precision = 1;
    var kilobyte = 1;
    var megabyte = kilobyte * 1024;
    var gigabyte = megabyte * 1024;
    var terabyte = gigabyte * 1024;

    if ((bytes >= 0) && (bytes < kilobyte)) {
      return bytes + ' B';

    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
      return (bytes / kilobyte).toFixed(precision) + ' KB';

    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
      return (bytes / megabyte).toFixed(precision) + ' MB';

    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
      return (bytes / gigabyte).toFixed(precision) + ' GB';

    } else if (bytes >= terabyte) {
      return (bytes / terabyte).toFixed(precision) + ' TB';

    } else {
      return bytes + ' B';
    }
  }.property('children', 'size'),
  timeSince: ago('createdAt', true)
});

export default dir;