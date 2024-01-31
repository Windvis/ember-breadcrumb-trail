declare module 'ember-breadcrumb-trail/helpers/breadcrumb' {
  import Helper from '@ember/component/helper';

  export default class Breadcrumb extends Helper<{
    Args: {
      Positional: [title: string];
      Named: Record<string, unknown>;
    };
    Return: void;
  }> {}
}

declare module 'ember-breadcrumb-trail/helpers/breadcrumbs' {
  import Helper from '@ember/component/helper';

  export default class Breadcrumbs extends Helper<{
    Return: { title: string; data: Record<string, unknown> }[];
  }> {}
}
