$(function(){
  // 创建地图画布
  $.ajax({
    url: '../json/world.geo.json',
    dataType: 'json'
  }).done(function(data){
    geodemo(data, '#map', {x:2.5,y:3}, null);
  });
  $.ajax({
    url: '../json/0.json',
    dataType: 'json'
  }).done(function(data){
    map = geodemo(data, '#chinamap', {x:5.9, y:8.1}, null);
    map.shapes.click(function(){
      var id = this.data('id');
      $.ajax({
        url: '../json/' + id + '.json',
        dataType: 'json'
      }).done(function(data){
        geodemo(data, '#citymap', null, null);
      });
    });
  });
});

function geodemo(data, container, scale, offset){
  var map = new GeoMap({
      container: container,
      scale: scale,
      offset: offset,
      background: '#eee'
    }),
    tooltip = $('#tooltip');
  map.load(data);
  map.render();
  map.setPoint({x: 116.4551, y: 40.2539}).attr('r', 5);
  map.shapes.hover(function(e){
    var self = this;
    self.animate({
      fill: '#369'
    },100);
  },function(){
    this.animate({
      fill: '#fff'
    },100)
  }).mousemove(function(e){
      var self = this;
      tooltip.html(self.data('properties').name).css({
        "top":$(window).scrollTop() + e.clientY + 20,
        "left":$(window).scrollLeft() + e.clientX + 20
      }).show();
    }).mouseout(function(){
      tooltip.empty().hide();
    });
  return map;
}