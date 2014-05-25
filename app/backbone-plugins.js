define([
  "marionette",
  "backbone",
  "underscore",
  "moment",
  "backbone-modelbinder",
  "backbone-nested-model"
], function(Marionette, Backbone, _) {

  Backbone.ModelBinder.SetOptions({
    modelSetOptions: {
      validate: true
    },
    changeTriggers: {
      '': 'change'
    }
  });

  return Backbone;
});
