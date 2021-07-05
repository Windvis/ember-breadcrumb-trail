import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | dynamic segments', function (hooks) {
  setupApplicationTest(hooks);

  test('redirecting to a parent route from a child of a route with dynamic segments works properly', async function (assert) {
    await visit('/foo/1234/baz');
    assert.dom('[data-test-breadcrumb]').exists({ count: 4 });

    await visit('/foo');
    assert.dom('[data-test-breadcrumb]').exists({ count: 2 });
  });
});
