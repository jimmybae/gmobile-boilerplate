const Backbone = require('backbone');
const _ = require('underscore');
var Panel = Backbone.View.extend({
   initialize: function(options){
      console.log('Panel initialized');
      this.foo = 'bar';
   }
});

var PanelAdvanced = Panel.extend({
    initialize: function(options){
      Panel.prototype.initialize.call(this, [options]);
      console.log('PanelAdvanced initialized');
      console.log(this.foo); // Log: bar
    }
});

// 필요하다면 우리는 PanelAdvaned를 상속할 수도 있다
var PanelAdvancedExtra = PanelAdvanced.extend({
    initialize: function(options){
      PanelAdvanced.prototype.initialize.call(this, [options]);
      console.log('PanelAdvancedExtra initialized');
    }
});

new Panel();
new PanelAdvanced();
new PanelAdvancedExtra();