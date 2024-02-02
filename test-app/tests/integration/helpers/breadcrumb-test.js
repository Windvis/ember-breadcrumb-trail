import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | breadcrumb', function (hooks) {
  setupRenderingTest(hooks);

  test('it adds a breadcrumb when rendered', async function (assert) {
    await render(hbs`
      <ol>
        {{#each (breadcrumbs) as |breadcrumb|}}
          <li data-test-breadcrumb-item>{{breadcrumb.title}}</li>
        {{/each}}
      </ol>

      {{breadcrumb "foo"}}
    `);

    assert.dom('[data-test-breadcrumb-item]').hasText('foo');
  });

  test('it combines all positional arguments into a single title', async function (assert) {
    await render(hbs`
      <ol>
        {{#each (breadcrumbs) as |breadcrumb|}}
          <li data-test-breadcrumb-item>{{breadcrumb.title}}</li>
        {{/each}}
      </ol>

      {{breadcrumb "foo" " bar " "baz"}}
    `);

    assert.dom('[data-test-breadcrumb-item]').hasText('foo bar baz');
  });

  test("it's possible to access the passed in named arguments through the `data` key", async function (assert) {
    await render(hbs`
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
    `);

    assert.dom('[data-test-title]').hasText('foo');
    assert.dom('[data-test-route]').hasText('index');
    assert.dom('[data-test-is-link]').hasText('false');
  });

  test("it's possible to add multiple breadcrumbs from the same template", async function (assert) {
    await render(hbs`
      <ol>
        {{#each (breadcrumbs) as |breadcrumb|}}
          <li data-test-breadcrumb-item>{{breadcrumb.title}}</li>
        {{/each}}
      </ol>

      {{breadcrumb "foo"}}
      {{breadcrumb "bar"}}
    `);

    let breadcrumbs = this.element.querySelectorAll(
      '[data-test-breadcrumb-item]',
    );
    assert.strictEqual(breadcrumbs.length, 2);
    assert.dom(breadcrumbs[0]).hasText('foo');
    assert.dom(breadcrumbs[1]).hasText('bar');
  });

  test('it updates the breadcrumb when data changes', async function (assert) {
    this.dynamicTitle = 'foo';
    this.isLink = false;

    await render(hbs`
      <ol>
        {{#each (breadcrumbs) as |breadcrumb|}}
          <li data-test-breadcrumb-item>
            <span data-test-title>{{breadcrumb.title}}</span>
            <span data-test-named-arg-data>{{breadcrumb.data.isLink}}</span>
          </li>
        {{/each}}
      </ol>

      {{breadcrumb this.dynamicTitle isLink=this.isLink}}
    `);

    let title = assert.dom('[data-test-title]').hasText('foo');
    let link = assert.dom('[data-test-named-arg-data]').hasText('false');

    this.set('dynamicTitle', 'bar');
    await settled();
    title.hasText('bar');

    this.set('isLink', true);
    await settled();
    link.hasText('true');
  });
});
