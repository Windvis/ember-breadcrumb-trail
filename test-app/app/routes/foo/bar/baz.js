import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class FooBarBazRoute extends Route {
  @service('breadcrumbs') breadcrumbsService;

  model() {
    return Math.random();
  }
}
