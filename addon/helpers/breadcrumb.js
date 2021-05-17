import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class BreadcrumbHelper extends Helper {
  @service('breadcrumbs') breadcrumbsService;

  breadcrumbId = null;

  get breadcrumbWasAddedBefore() {
    return Boolean(this.breadcrumbId);
  }

  compute(breadcrumbTitleParts, optionalData) {
    let breadcrumbTitle = breadcrumbTitleParts.join('');

    let breadcrumbData = {
      data: optionalData,
      title: breadcrumbTitle,
    };

    if (this.breadcrumbWasAddedBefore) {
      this.breadcrumbsService.updateBreadcrumb(
        this.breadcrumbId,
        breadcrumbData
      );
    } else {
      this.breadcrumbId = this.breadcrumbsService.addBreadcrumb(breadcrumbData);
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.breadcrumbsService.removeBreadcrumb(this.breadcrumbId);
  }
}
