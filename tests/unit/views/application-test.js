import { moduleFor, test } from 'ember-qunit';

moduleFor('view:application');

test('it exists', function(assert) {
  var view = this.subject();
  assert.ok(view);

  assert.deepEqual(view.get('classNames'), [
    'ember-view',
    'c2l-main'
  ], 'View has expected classes');
});
