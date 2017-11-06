import { module, test } from 'qunit';

import { isEmpty } from '@ember/utils';

import OrderedSet from '@ember/ordered-set';

module('OrderedSet', function() {
  test('create() creates an empty new instance', function(assert) {
    let set = OrderedSet.create();
    assert.ok(set);
    assert.ok(set instanceof OrderedSet);
    assert.equal(set.size, 0);

    let set2 = OrderedSet.create();
    assert.notEqual(set, set2);
  });

  test('add() returns the set', function(assert) {
    let map = OrderedSet.create();
    let obj = {};
    assert.strictEqual(map.add(obj), map);
    assert.strictEqual(map.add(obj), map, 'when it is already in the set');
  });

  test('isEmpty()', function(assert) {
    let orderedSet = new OrderedSet();
    assert.equal(true, isEmpty(orderedSet), 'Empty ordered set is empty');

    orderedSet.add('foo');
    assert.equal(false, isEmpty(orderedSet), 'Ordered set is not empty');
  });
});
