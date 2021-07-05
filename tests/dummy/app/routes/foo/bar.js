import Route from '@ember/routing/route';

export default class FooBarRoute extends Route {
  model({ id }) {
    return { id };
  }
}
