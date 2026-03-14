import Service from '@ember/service';
import { render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { breadcrumbs } from '#src/index.ts';

module('Integration | Helper | breadcrumbs', function (hooks) {
  setupRenderingTest(hooks);

  test('it returns the added breadcrumbs', async function (assert) {
    class MockBreadcrumbsService extends Service {
      @tracked items: { title: string }[] = [];
    }

    this.owner.register('service:breadcrumbs', MockBreadcrumbsService);

    await render(
      <template>
        <ol>
          {{#each (breadcrumbs) as |breadcrumb|}}
            <li data-test-breadcrumb-item>{{breadcrumb.title}}</li>
          {{/each}}
        </ol>
      </template>,
    );

    assert.dom('[data-test-breadcrumb-item]').doesNotExist();

    const breadcrumbsService = this.owner.lookup(
      'service:breadcrumbs',
    ) as MockBreadcrumbsService;
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
