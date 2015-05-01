import Ember from 'ember';

export default Ember.Route.extend({
  
  setupController: function (controller, context) {
    this._super(controller, context);

    C2LSettings.loadActive(function (active) {
      controller.set('isActive', active);
    });
  }
});
