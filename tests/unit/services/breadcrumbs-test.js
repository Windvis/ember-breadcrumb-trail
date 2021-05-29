import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';

module('Unit | Service | breadcrumbs', function (hooks) {
  setupTest(hooks);

  test("it doesn't contain any breadcrumbs by default", async function (assert) {
    let breadcrumbsService = this.owner.lookup(
      'service:ember-breadcrumb-trail@breadcrumbs'
    );

    assert.equal(breadcrumbsService.items.length, 0);
  });

  test("it's possible to add new breadcrumbs with the addBreadcrumb method", async function (assert) {
    let breadcrumbsService = this.owner.lookup(
      'service:ember-breadcrumb-trail@breadcrumbs'
    );

    breadcrumbsService.addBreadcrumb({
      title: 'foo',
    });

    await settled();
    assert.equal(breadcrumbsService.items[0].title, 'foo');

    breadcrumbsService.addBreadcrumb({
      title: 'bar',
    });

    await settled();
    assert.equal(breadcrumbsService.items.length, 2);
    assert.equal(breadcrumbsService.items[0].title, 'foo');
    assert.equal(breadcrumbsService.items[1].title, 'bar');
  });

  test('it returns a unique id when adding a breadcrumb', async function (assert) {
    let breadcrumbsService = this.owner.lookup(
      'service:ember-breadcrumb-trail@breadcrumbs'
    );

    let firstId = breadcrumbsService.addBreadcrumb({
      title: 'foo',
    });

    let secondId = breadcrumbsService.addBreadcrumb({
      title: 'bar',
    });

    await settled();
    assert.notEqual(firstId, secondId);
    assert.equal(typeof firstId, 'string');
    assert.equal(typeof secondId, 'string');
  });

  test("it's possible to update breadcrumbs with the updateBreadcrumb method", async function (assert) {
    let breadcrumbsService = this.owner.lookup(
      'service:ember-breadcrumb-trail@breadcrumbs'
    );

    let firstId = breadcrumbsService.addBreadcrumb({
      title: 'foo',
    });

    breadcrumbsService.addBreadcrumb({
      title: 'bar',
    });

    await settled();
    assert.equal(breadcrumbsService.items[0].title, 'foo');

    breadcrumbsService.updateBreadcrumb(firstId, {
      title: 'baz',
    });

    await settled();
    assert.equal(breadcrumbsService.items[0].title, 'baz');
    assert.equal(breadcrumbsService.items[1].title, 'bar');
  });

  test("it's possible to remove breadcrumbs with the removeBreadcrumb method", async function (assert) {
    let breadcrumbsService = this.owner.lookup(
      'service:ember-breadcrumb-trail@breadcrumbs'
    );

    let firstId = breadcrumbsService.addBreadcrumb({
      title: 'foo',
    });

    breadcrumbsService.addBreadcrumb({
      title: 'bar',
    });

    await settled();
    assert.equal(breadcrumbsService.items.length, 2);

    breadcrumbsService.removeBreadcrumb(firstId);

    await settled();
    assert.equal(breadcrumbsService.items.length, 1);
    assert.equal(breadcrumbsService.items[0].title, 'bar');
  });
});
