import { breadcrumb } from '#src/index.ts';
import type { TOC } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import type FooBarBazRoute from '../../../routes/foo/bar/baz';

<template>
  {{pageTitle "Baz"}}
  {{! @glint-expect-error: TODO, fix types }}
  {{breadcrumb "Baz: " @model route="foo.bar.baz"}}
  {{outlet}}
</template> satisfies TOC<{
  Args: {
    model: ReturnType<FooBarBazRoute['model']>;
  };
}>;
