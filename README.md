ember-breadcrumb-trail
==============================================================================
[![CI](https://github.com/Windvis/ember-breadcrumb-trail/workflows/CI/badge.svg)](https://github.com/Windvis/ember-breadcrumb-trail/actions?query=workflow%3ACI)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

`ember-breadcrumb-trail` is a minimalistic but very flexible breadcrumb management solution. It provides only 2 helpers but they give you complete control over the HTML structure, the components you use to render that structure and the needed data to make it all work. Bring your own _everything_!

This addon is heavily inspired by [ember-page-title](https://github.com/ember-cli/ember-page-title) and the already existing [breadcrumb addons](https://emberobserver.com/?query=crumb).


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above (lower versions might work, but aren't tested)
* Ember CLI v3.16 or above
* Node.js v12 or above
* Works with Embroider (safe and optimized) 
* Publishes Glint types


Installation
------------------------------------------------------------------------------

```
ember install ember-breadcrumb-trail
```


Usage
------------------------------------------------------------------------------

### `{{breadcrumb}}` helper
This helper allows you to add breadcrumbs and is the equivalent of the `page-title` helper but for breadcrumbs.

#### Positional argument(s)
Positional arguments are used as the title for the breadcrumb. Multiple positional arguments will be combined into a single title. 

```hbs
{{breadcrumb "Home"}}
{{! "Home" }}

{{breadcrumb "Hottest JS framework 🔥: " this.hottestFramework}}
{{! "Hottest JS framework 🔥: Ember" }}
```
> The title can be accessed with the `title` property of the breadcrumb object.

#### Named arguments
Any data that you need to render your breadcrumbs can be passed in as named arguments. This can be used to pass route information so that the breadcrumb can be linked to it.

> The named arguments will be available under the `data` property of the breadcrumb object.


### `{{breadcrumbs}}` helper
This helper simply returns the registered breadcrumbs and can be used wherever you want to display them. The breadcrumb data can easily be looped over with `{{#each}}` and combined with other helpers if extra data manipulation is needed.

#### Returns
Array of registered breadcrumbs (objects)

### Examples

#### a11y
This simple example implements an [a11y friendly breadcrumb structure](https://www.w3.org/TR/wai-aria-practices/#breadcrumb) using Ember's `<LinkTo>` component and the [`{{has-next}}`](https://github.com/DockYard/ember-composable-helpers#has-next) helper from ember-composable-helpers to determine if a breadcrumb is the last breadcrumb in the list.

```hbs
<nav aria-label="Breadcrumb">
  <ol>
    {{#each (breadcrumbs) as |breadcrumb|}}
      <li>
        <LinkTo
          @route={{breadcrumb.data.route}}
          aria-current={{if (not (has-next breadcrumb (breadcrumbs))) "page"}}
        >
          {{breadcrumb.title}}
        </LinkTo>
      </li>
    {{/each}}
  </ol>
</nav>

{{! index.hbs }}
{{breadcrumb "Home" route="index"}}

{{! about.hbs }}
{{breadcrumb "About" route="about"}}
```

#### [ember-link](https://github.com/buschtoens/ember-link)
A similar example where ember-link is used instead of `<LinkTo>`.

```hbs
<nav aria-label="Breadcrumb">
  <ol>
    {{#each (breadcrumbs) as |breadcrumb|}}
      <li>
        <a
          href={{breadcrumb.data.link.href}}
          aria-current={{if (not (has-next breadcrumb (breadcrumbs))) "page"}}
          {{on "click" breadcrumb.data.link.transitionTo}}
        >
          {{breadcrumb.title}}
        </a>
      </li>
    {{/each}}
  </ol>
</nav>

{{! blog.hbs }}
{{breadcrumb "Blog" link=(link "blog")}}

{{! blog/post.hbs }}
{{breadcrumb this.post.title link=(link "blog.post" this.post.id)}}
```

## TypeScript and Glint
### Loose-mode usage
If your project uses loose-mode templates, you can merge in the template registry interface provided by ember-breadcrumb-trail:

```ts
// <your-app>/types/glint.d.ts
import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import type EmberBreadcrumbTrailRegistry from 'ember-breadcrumb-trail/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberBreadcrumbTrailRegistry {
    /* your local loose-mode entries here */
  }
}
```

### Strict-mode usage
To use the helpers in strict-mode templates, you can use the shorter import path:

```gts
import { breadcrumb, breadcrumbs } from 'ember-breadcrumb-trail';
```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
