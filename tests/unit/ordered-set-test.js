import { module, test } from 'qunit';

import { isEmpty } from '@ember/utils';

import OrderedSet from '@ember/ordered-set';

module('OrderedSet', function() {
  test('new OrderedSet() creates an empty new instance', function(assert) {
    let set = new OrderedSet();
    assert.ok(set);
    assert.ok(set instanceof OrderedSet);
    assert.equal(set.size, 0);

    let set2 = new OrderedSet();
    assert.notEqual(set, set2);
  });

  test('create() creates an empty new instance', function(assert) {
    let set = OrderedSet.create();
    assert.ok(set);
    assert.ok(set instanceof OrderedSet);
    assert.equal(set.size, 0);

    let set2 = OrderedSet.create();
    assert.notEqual(set, set2);
  });

  test('clear() removes any existing entries', function(assert) {
    let set = OrderedSet.create();

    set.add('foo');

    assert.equal(set.size, 1);
    assert.ok(set.has('foo'));

    set.clear();

    assert.equal(set.size, 0);
    assert.notOk(set.has('foo'));
  });

  test('add() adds an entry', function(assert) {
    let set = OrderedSet.create();

    assert.equal(set.size, 0);
    assert.notOk(set.has('foo'));

    set.add('foo');

    assert.equal(set.size, 1);
    assert.ok(set.has('foo'));
  });

  test('add() can handle non-string objects', function(assert) {
    let set = OrderedSet.create();

    let foo = { bar: 'baz' };

    assert.equal(set.size, 0);
    assert.notOk(set.has(foo));

    set.add(foo);

    assert.equal(set.size, 1);
    assert.ok(set.has(foo));
  });

  test('add() returns the set', function(assert) {
    let set = OrderedSet.create();
    let obj = {};
    assert.strictEqual(set.add(obj), set);
    assert.strictEqual(set.add(obj), set, 'when it is already in the set');
  });

  test('delete() deletes an entry', function(assert) {
    let set = OrderedSet.create();

    set.add('foo');
    set.add('bar');

    assert.equal(set.size, 2);
    assert.ok(set.has('foo'));

    set.delete('foo');

    assert.equal(set.size, 1);
    assert.notOk(set.has('foo'));
  });

  test('delete() can handle non-string objects', function(assert) {
    let set = OrderedSet.create();

    let foo = { bar: 'baz' };
    let bar = { baz: 'foo' };

    set.add(foo);
    set.add(bar);

    assert.equal(set.size, 2);
    assert.ok(set.has(foo));

    set.delete(foo);

    assert.equal(set.size, 1);
    assert.notOk(set.has(foo));
  });

  test('delete() returns whether object was part of the set', function(assert) {
    let set = OrderedSet.create();

    set.add('foo');

    assert.strictEqual(set.delete('foo'), true);
    assert.strictEqual(set.delete('bar'), false);
  });

  test('isEmpty() returns whether the set has any entries', function(assert) {
    let set = OrderedSet.create();
    assert.strictEqual(set.isEmpty(), true, 'Empty ordered set is empty');

    set.add('foo');
    assert.strictEqual(set.isEmpty(), false, 'Ordered set is not empty');
  });

  test('isEmpty()', function(assert) {
    let orderedSet = new OrderedSet();
    assert.equal(true, isEmpty(orderedSet), 'Empty ordered set is empty');

    orderedSet.add('foo');
    assert.equal(false, isEmpty(orderedSet), 'Ordered set is not empty');
  });
});
