define(function(require) {

  var Marionette = require("marionette");
  var Backbone = require("backbone");
  var Vent = require('vent');

  if (window.Swatch) return window.Swatch;

  window.Swatch = new Marionette.Application();

  window.Swatch.vent = Vent;

  window.requireJS = window.require;


  return window.Swatch;
});
