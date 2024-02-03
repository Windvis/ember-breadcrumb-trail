import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { tracked } from '@glimmer/tracking';
import { breadcrumb, breadcrumbs } from 'ember-breadcrumb-trail';

module('Integration | Helper | breadcrumb', function (hooks) {
  setupRenderingTest(hooks);

  test('it adds a breadcrumb when rendered', async function (assert) {
    await render(<template>
      <ol>
        {{#each (breadcrumbs) as |breadcrumb|}}
          <li data-test-breadcrumb-item>{{breadcrumb.title}}</li>
        {{/each}}
      </ol>

      {{breadcrumb "foo"}}
    </template>);

    assert.dom('[data-test-breadcrumb-item]').hasText('foo');
  });

  test('it combines all positional arguments into a single title', async function (assert) {
    await render(<template>
      <ol>
        {{#each (breadcrumbs) as |breadcrumb|}}
          <li data-test-breadcrumb-item>{{breadcrumb.title}}</li>
        {{/each}}
      </ol>

      {{breadcrumb "foo" " bar " "baz"}}
    </template>);

    assert.dom('[data-test-breadcrumb-item]').hasText('foo bar baz');
  });

  test("it's possible to access the passed in named arguments through the `data` key", async function (assert) {
    await render(<template>
      <ol>
        {{#each (breadcrumbs) as |breadcrumb|}}
          <li>
            <span data-test-title>{{breadcrumb.title}}</span>
            <span data-test-route>{{breadcrumb.data.route}}</span>
            <span data-test-is-link>{{breadcrumb.data.isLink}}</span>
          </li>
        {{/each}}
      </ol>

      {{breadcrumb "foo" route="index" isLink=false}}
    </template>);

    assert.dom('[data-test-title]').hasText('foo');
    assert.dom('[data-test-route]').hasText('index');
    assert.dom('[data-test-is-link]').hasText('false');
  });

  test("it's possible to add multiple breadcrumbs from the same template", async function (assert) {
    await render(<template>
      <ol>
        {{#each (breadcrumbs) as |breadcrumb|}}
          <li data-test-breadcrumb-item>{{breadcrumb.title}}</li>
        {{/each}}
      </ol>

      {{breadcrumb "foo"}}
      {{breadcrumb "bar"}}
    </template>);

    const breadcrumbElements = this.element.querySelectorAll(
      '[data-test-breadcrumb-item]',
    );
    assert.strictEqual(breadcrumbElements.length, 2);
    assert.dom(breadcrumbElements[0]).hasText('foo');
    assert.dom(breadcrumbElements[1]).hasText('bar');
  });

  test('it updates the breadcrumb when data changes', async function (assert) {
    class TestState {
      @tracked dynamicTitle: string = 'foo';
      @tracked isLink: boolean = false;
    }

    const state = new TestState();

    await render(<template>
      <ol>
        {{#each (breadcrumbs) as |breadcrumb|}}
          <li data-test-breadcrumb-item>
            <span data-test-title>{{breadcrumb.title}}</span>
            <span data-test-named-arg-data>{{breadcrumb.data.isLink}}</span>
          </li>
        {{/each}}
      </ol>

      {{breadcrumb state.dynamicTitle isLink=state.isLink}}
    </template>);

    const title = assert.dom('[data-test-title]').hasText('foo');
    const link = assert.dom('[data-test-named-arg-data]').hasText('false');

    state.dynamicTitle = 'bar';
    await settled();
    title.hasText('bar');

    state.isLink = true;
    await settled();
    link.hasText('true');
  });
});
