import Helper from '@ember/component/helper';
import { service } from '@ember/service';
import { g, i } from 'decorator-transforms/runtime';

class BreadcrumbHelper extends Helper {
  static {
    g(this.prototype, "breadcrumbsService", [service('breadcrumbs')]);
  }
  #breadcrumbsService = (i(this, "breadcrumbsService"), void 0);
  breadcrumbId = null;
  get breadcrumbWasAddedBefore() {
    return !!this.breadcrumbId;
  }
  compute(breadcrumbTitleParts, optionalData) {
    const breadcrumbTitle = breadcrumbTitleParts.join('');
    const breadcrumbData = {
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
    super.willDestroy();
    if (this.breadcrumbWasAddedBefore) {
      this.breadcrumbsService.removeBreadcrumb(this.breadcrumbId);
    }
  }
}

export { BreadcrumbHelper as default };
//# sourceMappingURL=breadcrumb.js.map
