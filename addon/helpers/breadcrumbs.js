import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class BreadcrumbsHelper extends Helper {
  @service('ember-breadcrumb-trail@breadcrumbs') breadcrumbsService;

  compute() {
    return this.breadcrumbsService.items;
  }
}
