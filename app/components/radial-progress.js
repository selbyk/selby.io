import Ember from 'ember';

var _duration = 0,
  _margin = {
    top: 0,
    right: 0,
    bottom: 30,
    left: 0
  },
  __width = 300,
  __height = 300,
  _fontSize = 10;

var _mouseClick;

var _currentArc = 0,
  _currentArc2 = 0,
  _currentValue = 0;

var _arc; //just radians

var _arc2; //just radians

var _width = 300,
  _height = 300,
  label;

  function arcTween(a) {
    var i = d3.interpolate(_currentArc, a);

    return function(t) {
      _currentArc = i(t);
      return _arc.endAngle(i(t))();
    };
  }

  function arcTween2(a) {
    var i = d3.interpolate(_currentArc2, a);

    return function(t) {
      return _arc2.endAngle(i(t))();
    };
  }

function onMouseClick(d) {
  /*if (typeof _mouseClick == "function") {
    _mouseClick.call();
  }*/
  alert("YOU CLICKED IT!");
}

function measure() {
  _width = __width; //_diameter - _margin.right - _margin.left - _margin.top - _margin.bottom;
  _height = _width;
  _fontSize = _width * .2;
  _arc.outerRadius(_width / 2);
  _arc.innerRadius(_width / 2 * .85);
  _arc2.outerRadius(_width / 2 * .85);
  _arc2.innerRadius(_width / 2 * .85 - (_width / 2 * .15));
}



export default Ember.Component.extend({
  //tagName: 'svg',
  width: 500,
  height: 500,
  value: 0,
  minValue: 0,
  maxValue: 100,
  label: null,
  svgId: null,
  path: null,
  path2: null,
  resizeWatcher: function() {
    var _this = this;
    var interval = 500;
    this.setupSvg();
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
    //this.set('resizeHandler', resizeHandler);
    //Ember.$(window).bind('resize', this.get('resizeHandler'));
  }.on('didInsertElement'),
  getPath: function() {
    var _this = this;
    if (!this.get('path')) {
      this.$('svg path.radial-arc').attr("id", 'arc-' + this.get('elementId'));
      Ember.$.ajaxSetup({
        cache: true,
        async: false
      });
      Ember.$.getScript('https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js', function(data, textStatus) {
        _this.path = d3.select('#arc-' + _this.get('elementId')).data(_this.get('value'));
      });

    }
    return this.path;
  },
  labelTween: function(a) {
    var _this = this;
    return function(t) {
      _this.textContent = Math.round(_this.get('value')) + "%";
    };
  },
  update: function() {
    var _value = this.get('value');
    var _minValue = this.get('minValue');
    var _maxValue = this.get('maxValue');

    var ratio = (_value - _minValue) / (_maxValue - _minValue);
    var endAngle = Math.min(360 * ratio, 360);
    endAngle = endAngle * Math.PI / 180;

    this.path.datum(endAngle);
    this.path.transition().duration(_duration)
      .attrTween("d", arcTween);

    if (ratio > 1) {
      this.path2.datum(Math.min(360 * (ratio - 1), 360) * Math.PI / 180);
      this.path2.transition().delay(_duration).duration(_duration)
        .attrTween("d", arcTween2);
    }

    label.datum(Math.round(ratio * 100));
  }.observes('value'),
  setupSvg: function() {
    var _this = this;
    var _value = this.get('value');
    var _label = this.get('label');
    var _minValue = this.get('minValue');
    var _maxValue = this.get('maxValue');

    //this.drawLineChart('lineChart', this.get('data'));
    // Select the svg element, if it exists.
    //this.$().empty();
    //this.$('svg').attr("id", 'svg-'+this.get('elementId'));
    this.$('svg path.radial-arc').attr("id", 'arc-' + this.get('elementId'));
    this.$('svg path.radial-arc2').attr("id", 'arc2-' + this.get('elementId'));

    //console.log('WORK');
    Ember.$.ajaxSetup({
      cache: true,
      async: false
    });
    Ember.$.getScript('https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js', function(data, textStatus) {
      _arc = d3.svg.arc()
        .startAngle(0 * (Math.PI / 180)); //just radians

      _arc2 = d3.svg.arc()
        .startAngle(0 * (Math.PI / 180))
        .endAngle(0); //just radians

      var svg = d3.select('#' + 'svg-' + _this.get('elementId')).data([_value]);

      var enter = svg.attr("class", "radial-svg").append("g");

      //measure();
      _fontSize = _width * .2;
      _arc.outerRadius(_width / 2);
      _arc.innerRadius(_width / 2 * .85);
      _arc2.outerRadius(_width / 2 * .85);
      _arc2.innerRadius(_width / 2 * .85 - (_width / 2 * .15));

      svg.attr("width", _this.get('realSize'))
        .attr("height", _this.get('realSize'));

      _arc.endAngle(360 * (Math.PI / 180))

      var background = enter.append("g").attr("class", "radial-component")
        //.attr("cursor", "pointer")
        .on("click", onMouseClick);

      background.append("rect")
        .attr("class", "radial-background")
        .attr("width", _width)
        .attr("height", _height);

      background.append("path")
        .attr("transform", "translate(" + _width / 2 + "," + _width / 2 + ")")
        .attr("d", _arc);

      background.append("text")
        .attr("class", "radial-label")
        .attr("transform", "translate(" + _width / 2 + "," + (_width + _fontSize) + ")")
        .text(_label);

      var g = svg.select("g")
        .attr("transform", "translate(" + _margin.left + "," + _margin.top + ")");

      _arc.endAngle(_currentArc);
      enter.append("g").attr("class", "radial-arcs");

      _this.path = d3.select('#arc-' + _this.get('elementId')).data(_this.get('value'));

      _this.path.enter().append("path")
        .attr("class", "radial-arc")
        .attr("transform", "translate(" + _width / 2 + "," + _width / 2 + ")")
        .attr("d", _arc);

      //Another path in case we exceed 100%
      _this.path2 = svg.select('#arc2-' + _this.get('elementId')).selectAll(".radial-arc2").data(_this.get('value'));
      _this.path2.enter().append("path")
        .attr("class", "radial-arc2")
        .attr("transform", "translate(" + _width / 2 + "," + _width / 2 + ")")
        .attr("d", _arc2);


      enter.append("g").attr("class", "radial-labels");
      label = svg.select(".radial-labels").selectAll(".radial-label").data(_this.get('value'));
      label.enter().append("text")
        .attr("class", "radial-label")
        .attr("y", _width / 2 + _fontSize / 3)
        .attr("x", _width / 2)
        //.attr("cursor", "pointer")
        .attr("width", _width)
        // .attr("x",(3*_fontSize/2))
        .text(function(d) {
          return Math.round((_value - _minValue) / (_maxValue - _minValue) * 100) + "%"
        })
        .style("font-size", _fontSize + "px");
        //.on("click", onMouseClick);

      _this.path.exit().transition().duration(500).attr("x", 1000).remove();

      _this.update();
    });
  }
});
