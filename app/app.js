import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,

  ready: function () {
    var doc = Ember.$(document);

    var elts = doc.find('*');

    alert('ELs:', elts.length);
    elts.toArray().forEach(function (el) {
      alert('EL: #' + el.toString());
    });
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
