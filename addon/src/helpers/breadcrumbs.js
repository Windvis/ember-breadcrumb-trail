import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class BreadcrumbsHelper extends Helper {
  @service('breadcrumbs') breadcrumbsService;

  compute() {
    return this.breadcrumbsService.items;
  }
}
