import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Loose-mode', function (hooks) {
  setupRenderingTest(hooks);

  test('both helpers resolve in loose-mode', async function (assert) {
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
});
