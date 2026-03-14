import { breadcrumb } from '#src/index.ts';
import { pageTitle } from 'ember-page-title';

<template>
  {{pageTitle "Foo"}}
  {{breadcrumb "Foo" route="foo"}}
  {{outlet}}
</template>
