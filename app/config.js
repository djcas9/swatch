require.nodeRequire = window.requireNode;

requirejs.config({
  paths: {
    "vendor": "../vendor",
    "almond": "../vendor/bower/almond/almond",
    "jquery": "../vendor/bower/jquery/dist/jquery",
    "underscore": "../vendor/bower/lodash/dist/lodash.underscore",
    "moment": "../vendor/bower/momentjs/moment",
    "backbone": "../vendor/bower/backbone/backbone",
    marionette: '../vendor/bower/marionette/lib/core/amd/backbone.marionette',
    'backbone.wreqr': '../vendor/bower/backbone.wreqr/lib/backbone.wreqr',
    'backbone.babysitter': '../vendor/bower/backbone.babysitter/lib/backbone.babysitter',
    "backbone-plugins": "backbone-plugins",

    // https://github.com/afeld/backbone-nested
    "backbone-nested-model": "lib/deps/backbone-nested",
    'backbone-modelbinder': 'lib/deps/backbone-modelbinder',
    // Require.js plugins
    text: 'libs/require/text',
    hbs: "../vendor/bower/require-handlebars-plugin/hbs",
    uuid: "lib/deps/uuid",
    color: "lib/deps/color"
  },

  shim: {
    'underscore': {
      exports: "_"
    },
    "backbone": {
      "deps": ["underscore", "jquery"],
      "exports": "Backbone"
    },
    'backbone-modelbinder': ["backbone"],
    "uuid": {
      exports: "uuid"
    }
  },

  hbs: {
    helpers: true,
    i18n: false,
    templateExtension: 'hbs',
    partialsUrl: '',
    helperDirectory: 'template/helpers/',
    helperPathCallback: function(name) {
      return 'templates/helpers/' + name;
    }
  }
});
