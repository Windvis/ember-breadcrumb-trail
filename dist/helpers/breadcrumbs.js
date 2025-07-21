import Helper from '@ember/component/helper';
import { service } from '@ember/service';
import { g, i } from 'decorator-transforms/runtime';

class BreadcrumbsHelper extends Helper {
  static {
    g(this.prototype, "breadcrumbsService", [service('breadcrumbs')]);
  }
  #breadcrumbsService = (i(this, "breadcrumbsService"), void 0);
  compute() {
    return this.breadcrumbsService.items;
  }
}

export { BreadcrumbsHelper as default };
//# sourceMappingURL=breadcrumbs.js.map
