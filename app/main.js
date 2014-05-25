requirejs(["config"], function(require) {

  requirejs([
    "marionette",
    "app",
    "jquery",
    "router",
    "lib/layout/content"
  ], function(Marionette, Swatch, $, Router, ContentView) {

    Swatch.addInitializer(function(options) {
      Swatch.router = Swatch.r = new Router();
    });

    Swatch.on("initialize:after", function(options) {

      if (Backbone.history) {
        Backbone.history.start({
          pushState: false,
          root: "/",
          silent: false
        });
      }

    });

    Swatch.addRegions({
      mainRegion: "#main"
    });

    Swatch.mainRegion.show(new ContentView());

    Swatch.start();
    Swatch.vent.trigger("swatch/global/loaded");
  });
});
