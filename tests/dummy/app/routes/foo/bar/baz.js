import Route from '@ember/routing/route';

export default class FooBarBazRoute extends Route {
  model() {
    return Math.random();
  }
}
