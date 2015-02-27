import Ember from 'ember';

var _data=null,
    _duration= 0,
    _selection,
    _margin = {top:0, right:0, bottom:30, left:0},
    __width = 300,
    __height = 300,
    _diameter,
    _fontSize=10;

var _mouseClick;

var  _currentArc= 0, _currentArc2= 0, _currentValue=0;

var _arc = d3.svg.arc()
    .startAngle(0 * (Math.PI/180)); //just radians

var _arc2 = d3.svg.arc()
    .startAngle(0 * (Math.PI/180))
    .endAngle(0); //just radians

var _width = 300, _height = 300, label;

function onMouseClick(d) {
  /*if (typeof _mouseClick == "function") {
    _mouseClick.call();
  }*/
  alert("YOU CLICKED IT!");
}

function measure() {
    _width= __width;//_diameter - _margin.right - _margin.left - _margin.top - _margin.bottom;
    _height=_width;
    _fontSize=_width*.2;
    _arc.outerRadius(_width/2);
    _arc.innerRadius(_width/2 * .85);
    _arc2.outerRadius(_width/2 * .85);
    _arc2.innerRadius(_width/2 * .85 - (_width/2 * .15));
}

function arcTween(a) {
    var i = d3.interpolate(_currentArc, a);

    return function(t) {
        _currentArc=i(t);
        return _arc.endAngle(i(t))();
    };
}

function arcTween2(a) {
  var i = d3.interpolate(_currentArc2, a);

  return function(t) {
      return _arc2.endAngle(i(t))();
  };
}

function labelTween(a) {
    var i = d3.interpolate(_currentValue, a);
    _currentValue = i(0);

    return function(t) {
        _currentValue = i(t);
        this.textContent = Math.round(i(t)) + "%";
    }
}

export default Ember.Component.extend({
  //tagName: 'svg',
  value: 0,
  minValue: 0,
  maxValue: 100,
  label: null,
  svgId: null,
  path: null,
  path2: null,
  getPath: function(){
    if(!this.this.get('path')){
      this.$('svg path.radial-arc').attr("id", 'arc-'+this.get('elementId'));
      this.path = d3.select('#arc-'+this.get('elementId')).data(this.get('value'));
    }
    return this.path;
  },
  labelTween: function(a) {
      return function(t) {
          this.textContent = Math.round(this.get('value')) + "%";
      }
  },
  update: function(){
    var _value = this.get('value');
    var _minValue = this.get('minValue');
    var _maxValue = this.get('maxValue');

    var ratio=(_value-_minValue)/(_maxValue-_minValue);
    var endAngle=Math.min(360*ratio,360);
    endAngle=endAngle * Math.PI/180;

    this.path.datum(endAngle);
    this.path.transition().duration(_duration)
        .attrTween("d", arcTween);

    if (ratio > 1) {
      this.path2.datum(Math.min(360*(ratio-1),360) * Math.PI/180);
      this.path2.transition().delay(_duration).duration(_duration)
            .attrTween("d", arcTween2);
    }

    label.datum(Math.round(ratio*100));
  }.observes('value'),
  setupSvg: function() {
    var _value = this.get('value');
    var _label = this.get('label');
    var _minValue = this.get('minValue');
    var _maxValue = this.get('maxValue');
    //this.drawLineChart('lineChart', this.get('data'));
    // Select the svg element, if it exists.
    //this.$().empty();
    //this.$('svg').attr("id", 'svg-'+this.get('elementId'));
    this.$('svg path.radial-arc').attr("id", 'arc-'+this.get('elementId'));
    this.$('svg path.radial-arc2').attr("id", 'arc2-'+this.get('elementId'));

    //console.log('WORK');
    var svg = d3.select('#'+'svg-'+this.get('elementId')).data([_value]);

    var enter = svg.attr("class","radial-svg").append("g");

    measure();

    svg.attr("width", __width)
        .attr("height", __height);

    _arc.endAngle(360 * (Math.PI/180))

    var background = enter.append("g").attr("class","radial-component")
        .attr("cursor","pointer")
        .on("click", onMouseClick);

    background.append("rect")
        .attr("class","radial-background")
        .attr("width", _width)
        .attr("height", _height);

    background.append("path")
        .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
        .attr("d", _arc);

    background.append("text")
        .attr("class", "radial-label")
        .attr("transform", "translate(" + _width/2 + "," + (_width + _fontSize) + ")")
        .text(_label);

   var g = svg.select("g")
      .attr("transform", "translate(" + _margin.left + "," + _margin.top + ")");

    _arc.endAngle(_currentArc);
    enter.append("g").attr("class", "radial-arcs");

    this.path = d3.select('#arc-'+this.get('elementId')).data(this.get('value'));

    this.path.enter().append("path")
        .attr("class","radial-arc")
        .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
        .attr("d", _arc);

    //Another path in case we exceed 100%
    this.path2 = svg.select('#arc2-'+this.get('elementId')).selectAll(".radial-arc2").data(this.get('value'));
    this.path2.enter().append("path")
        .attr("class","radial-arc2")
        .attr("transform", "translate(" + _width/2 + "," + _width/2 + ")")
        .attr("d", _arc2);


    enter.append("g").attr("class", "radial-labels");
    label = svg.select(".radial-labels").selectAll(".radial-label").data(this.get('value'));
    label.enter().append("text")
        .attr("class","radial-label")
        .attr("y",_width/2+_fontSize/3)
        .attr("x",_width/2)
        .attr("cursor","pointer")
        .attr("width",_width)
        // .attr("x",(3*_fontSize/2))
        .text(function (d) { return Math.round((_value-_minValue)/(_maxValue-_minValue)*100) + "%" })
        .style("font-size",_fontSize+"px")
        .on("click",onMouseClick);

    this.path.exit().transition().duration(500).attr("x",1000).remove();

    this.update();
  }.on('didInsertElement')
});
