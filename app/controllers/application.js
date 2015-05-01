import Ember from 'ember';

export default Ember.Controller.extend({
  isActive: false,

  isActiveChanged: Ember.observer('isActive', function () {
    var active = this.get('isActive');
    C2LSettings.setActive(active, function () {
      console.log('C2L extension is now ' + (active ? 'enabled' : 'disabled'));
    });
  })
});
