import Route from '@ember/routing/route';

export default class FooBarBazRoute extends Route {
  model() {
    return {
      randomNumber: Math.random(),
      id: this.paramsFor('foo.bar').id,
    };
  }
}
