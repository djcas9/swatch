define([
  "marionette",
  "backbone-plugins",
  "lib/manipulation/model",
  "hbs!templates/manipulation/index",
  "uuid"
], function(Marionette, Backbone, ColorModel, template, uuid) {

  return Marionette.ItemView.extend({
    _modelBinder: undefined,
    className: "color-manipulation-control",
    template: template,

    initialize: function() {
      var self = this;
      this._modelBinder = new Backbone.ModelBinder();

      this.listenTo(this.model, 'change', function() {
        this.render();
      }, this);

      Swatch.vent.on('copy', function(type) {
        switch(type) {
          case 'hex':
            Swatch.clipboard.set(self.model.get('hex'), 'text');
            break;
          case 'rgba':
            var r = self.model.get('rgb');
            var a = self.model.get('alpha');
            var data = "rgba(" + r.r + ", " + r.g + ", " + r.b + ", " + a + ")";
            Swatch.clipboard.set(data, 'text');
            break;
          case 'hsla':
            var r = self.model.get('hsl');
            var a = self.model.get('alpha');
            var data = "hsla(" + r.h + ", " + r.s + "%, " + r.l + "%, " + a + ")";
            Swatch.clipboard.set(data, 'text');
            break;
        }
      });
    },

    onClose: function() {
      this._modelBinder.unbind();
    },

    events: {
      "click button.luminosity-up": "luminosityUp",
      "click button.luminosity-down": "luminosityDown",
      "click button.alpha-up": "alphaUp",
      "click button.alpha-down": "alphaDown",
      "change input#alpha-control": "alphaControl",
      "click button.hex": "copyHEX",
      "click button.rgba": "copyRGBA",
      "click button.hsla": "copyHSLA"
    },

    copyHEX: function() {
      Swatch.vent.trigger('copy', 'hex');
    },

    copyRGBA: function() {
      Swatch.vent.trigger('copy', 'rgba');
    },

    copyHSLA: function() {
      Swatch.vent.trigger('copy', 'hsla');
    },

    alphaControl: function(e) {
      var value = $(e.currentTarget).val();
      this.model.alpha(value)
    },

    luminosityDown: function() {
      this.model.darken(0.1);
    },

    luminosityUp: function() {
      this.model.lighten(0.1);
    },

    alphaUp: function() {
      this.model.alpha(0.9);
    },

    alphaDown: function() {
      this.model.alpha(0.1);
    }

  });

});

