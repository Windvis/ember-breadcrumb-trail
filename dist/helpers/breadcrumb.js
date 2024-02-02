import Helper from '@ember/component/helper';
import { inject } from '@ember/service';
import { g, i } from 'decorator-transforms/runtime';

class BreadcrumbHelper extends Helper {
  static {
    g(this.prototype, "breadcrumbsService", [inject('breadcrumbs')]);
  }
  #breadcrumbsService = (i(this, "breadcrumbsService"), void 0);
  breadcrumbId = null;
  get breadcrumbWasAddedBefore() {
    return Boolean(this.breadcrumbId);
  }
  compute(breadcrumbTitleParts, optionalData) {
    let breadcrumbTitle = breadcrumbTitleParts.join('');
    let breadcrumbData = {
      data: optionalData,
      title: breadcrumbTitle
    };
    if (this.breadcrumbWasAddedBefore) {
      this.breadcrumbsService.updateBreadcrumb(this.breadcrumbId, breadcrumbData);
    } else {
      this.breadcrumbId = this.breadcrumbsService.addBreadcrumb(breadcrumbData);
    }
  }
  willDestroy() {
    super.willDestroy(...arguments);
    this.breadcrumbsService.removeBreadcrumb(this.breadcrumbId);
  }
}

export { BreadcrumbHelper as default };
//# sourceMappingURL=breadcrumb.js.map
