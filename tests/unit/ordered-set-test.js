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

  test('has() returns whether an object is part of the set', function(assert) {
    let set = OrderedSet.create();

    set.add('foo');

    assert.strictEqual(set.has('foo'), true);
    assert.strictEqual(set.has('bar'), false);
  });

  test('has() supports non-string objects', function(assert) {
    let set = OrderedSet.create();

    let foo = { bar: 'baz' };
    let bar = { baz: 'foo' };

    set.add(foo);

    assert.strictEqual(set.has(foo), true);
    assert.strictEqual(set.has(bar), false);
  });

  test('forEach() iterates over all entries', function(assert) {
    let set = OrderedSet.create();

    set.add('foo');
    set.add('bar');
    set.add({ baz: 'qux' });

    let entries = [];
    set.forEach(entry => entries.push(entry));

    assert.deepEqual(entries, ['foo', 'bar', { baz: 'qux' }]);
  });

  test('forEach() is called with no context by default', function(assert) {
    assert.expect(2);

    let set = OrderedSet.create();

    set.add('foo');

    set.forEach(function(entry) {
      assert.strictEqual(entry, 'foo');
      assert.strictEqual(this, undefined);
    });
  });

  test('forEach() context can be set as second argument', function(assert) {
    assert.expect(2);

    let set = OrderedSet.create();

    set.add('foo');

    let context = { bar: 'baz' };

    set.forEach(function(entry) {
      assert.strictEqual(entry, 'foo');
      assert.strictEqual(this, context);
    }, context);
  });

  test('toArray() returns an array of all entries', function(assert) {
    let set = OrderedSet.create();

    set.add('foo');
    set.add('bar');
    set.add({ baz: 'qux' });

    let entries = set.toArray();

    assert.deepEqual(entries, ['foo', 'bar', { baz: 'qux' }]);
  });

  test('is compatible with Ember.isEmpty()', function(assert) {
    let set = OrderedSet.create();
    assert.strictEqual(isEmpty(set), true, 'Empty ordered set is empty');

    set.add('foo');
    assert.strictEqual(isEmpty(set), false, 'Ordered set is not empty');
  });
});
