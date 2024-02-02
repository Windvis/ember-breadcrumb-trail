import Helper from '@ember/component/helper';
import { inject } from '@ember/service';
import { g, i } from 'decorator-transforms/runtime';

class BreadcrumbsHelper extends Helper {
  static {
    g(this.prototype, "breadcrumbsService", [inject('breadcrumbs')]);
  }
  #breadcrumbsService = (i(this, "breadcrumbsService"), void 0);
  compute() {
    return this.breadcrumbsService.items;
  }
}

export { BreadcrumbsHelper as default };
//# sourceMappingURL=breadcrumbs.js.map
