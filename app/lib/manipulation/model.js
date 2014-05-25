define([
  "marionette",
  "backbone-plugins"
], function(Marionette, Backbone, template) {

  var ColorModel = Backbone.NestedModel.extend({
    defaults: {
      hex: "",
      hsl: {
        h: 0,
        s: 0,
        l: 0
      },
      hsv: {
        h: 0,
        s: 0,
        v: 0
      },
      cmyk: {
        c: 0,
        m: 0,
        y: 0,
        k: 0
      },
      rgb: {
        r: 0,
        g: 0,
        b: 0
      },
      luminosity: 0,
      alpha: 1
    },

    initialize: function() {
      var self = this;
    },

    alpha: function(number) {
      var c = window.Color(this.get('hex'));
      c.alpha(number);
      c.luminosity(this.get('luminosity'));
      this.update(c);
    },

    lighten: function(number) {
      var self = this;
      var c = window.Color(this.get('hex'));

      c.lighten(number);
      c.alpha(self.get('alpha'));

      return self.update(c);
    },

    darken: function(number) {
      var self = this;
      var c = window.Color(this.get('hex'));

      c.darken(number);
      c.alpha(self.get('alpha'));

      return self.update(c);
    },

    update: function(c) {
      this.set({
        hsl: c.hsl(),
        hsv: c.hsv(),
        cmyk: c.cmyk(),
        rgb: c.rgb(),
        luminosity: c.luminosity(),
        alpha: c.alpha(),
        hex: c.hexString()
      });

      Swatch.farb.setColor(c.hexString());

      var rgb = this.get('rgb');
      var rgbString = rgb.r + "," + rgb.g + "," + rgb.b;
      $('#wrapper').css('background-color', "rgba("+rgbString+","+this.get('alpha')+")");
      return this;
    }

  });

  return ColorModel;
});

