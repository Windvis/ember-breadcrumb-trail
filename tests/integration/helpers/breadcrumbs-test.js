import Service from '@ember/service';
import { render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { hbs } from 'ember-cli-htmlbars';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Helper | breadcrumbs', function (hooks) {
  setupRenderingTest(hooks);

  test('it returns the added breadcrumbs', async function (assert) {
    class MockBreadcrumbsService extends Service {
      @tracked items = [];
    }

    this.owner.register(
      'service:ember-breadcrumb-trail@breadcrumbs',
      MockBreadcrumbsService
    );

    await render(hbs`
      <ol>
        {{#each (breadcrumbs) as |breadcrumb|}}
          <li data-test-breadcrumb-item>{{breadcrumb.title}}</li>
        {{/each}}
      </ol>
    `);

    assert.dom('[data-test-breadcrumb-item]').doesNotExist();

    let breadcrumbsService = this.owner.lookup(
      'service:ember-breadcrumb-trail@breadcrumbs'
    );
    breadcrumbsService.items = [
      {
        title: 'foo',
      },
      {
        title: 'bar',
      },
    ];

    await settled();

    assert.dom('[data-test-breadcrumb-item]').exists({ count: 2 });
  });
});
