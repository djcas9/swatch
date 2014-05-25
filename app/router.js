define(function(require, exports, module) {
  var Marionette = require('marionette');
  var CW = require('lib/deps/colorwheel');
  var farb = require('lib/deps/farbtastic');
  var Color = require('color');
  var ColorModel = require('lib/manipulation/model');
  var ColorView = require('lib/manipulation/view');

  module.exports = Marionette.AppRouter.extend({

    routes: {
      "": "index"
    },

    index: function() {
      var self = this;

      var colorObject = new ColorModel();

      var more = $('input#more-color-options');

      $('#color-wheel').farbtastic(function(color) {
        more.val(color);
        Swatch.vent.trigger('color-wheel-change', color);
      });

      Swatch.farb = $.farbtastic("#color-wheel");
      Swatch.farb.setColor('#363842');

      more.on('change', function() {
        var color = more.val();
        Swatch.farb.setColor(color);
      });

      var update = function(color) {
        var c = window.Color(color);

        colorObject.set({
          hsl: c.hsl(),
          hsv: c.hsv(),
          cmyk: c.cmyk(),
          rgb: c.rgb(),
          hex: c.hexString()
        });

        var h = colorObject.get('hex');

        var rgb = colorObject.get('rgb');
        var rgbString = rgb.r + "," + rgb.g + "," + rgb.b;
        $('#wrapper').css('background-color', "rgba("+rgbString+","+colorObject.get('alpha')+")");
        more.val(h);
      }; 

      Swatch.vent.on('color-wheel-change', function(color) {
        update(color);
      });

      // $('.window-controls').on('click', function() {
        // var current = colorObject.get('luminosity');
        // colorObject = colorObject.darken(0.1);
      // });

      update("#363842");
      
      self.renderView({
        view: new ColorView({
          model: colorObject
        }),
        el: "#color-manipulation"
      });

      var setupMenus = require('menu');
      setupMenus();
    },

    loadView: function(item) {
      var self = this;

      if (item.hasOwnProperty('cid')) {

        if (self.view) {
          self.view.close();
        }

        self.view = item;
        return self.view;

      } else {
        if (self.region) self.region.close();
        self.region = item;

        return self.region;
      }
    },

    renderView: function(args) {
      var self = this;

      if (!args.hasOwnProperty('view'))
        throw "A view object is required.";

      if (!args.hasOwnProperty('el'))
        throw "EL is required.";

      var view = self.loadView(args.view);
      var region = self.loadView(new Marionette.Region({
        el: args.el
      }));

      region.show(view);
    },

  });
});

