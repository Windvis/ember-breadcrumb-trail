import { guidFor } from '@ember/object/internals';
import { scheduleOnce, next } from '@ember/runloop';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class BreadcrumbsService extends Service {
  @tracked breadcrumbData = new Map();
  pendingBreadcrumbData = null;
  didForceRerender = false;

  get items() {
    return [...this.breadcrumbData.values()];
  }

  addBreadcrumb(breadcrumbData) {
    this.scheduleDataUpdate();

    let uniqueId = generateUniqueId();
    this.pendingBreadcrumbData.set(uniqueId, breadcrumbData);
    return uniqueId;
  }

  updateBreadcrumb(uniqueId, breadcrumbData) {
    if (!this.didForceRerender) {
      this.scheduleDataUpdate();
      this.pendingBreadcrumbData.set(uniqueId, breadcrumbData);
    }
  }

  removeBreadcrumb(uniqueId) {
    this.scheduleDataUpdate();
    this.pendingBreadcrumbData.delete(uniqueId);
  }

  scheduleDataUpdate() {
    if (!this.pendingBreadcrumbData) {
      this.pendingBreadcrumbData = new Map(this.breadcrumbData);
    }

    scheduleOnce('afterRender', this, this.updateBreadcrumbData);
  }

  updateBreadcrumbData() {
    this.didForceRerender = true;

    this.breadcrumbData = this.pendingBreadcrumbData;
    this.pendingBreadcrumbData = null;

    next(this, this.resetRerenderFlag);
  }

  resetRerenderFlag() {
    this.didForceRerender = false;
  }
}

function generateUniqueId() {
  return guidFor({});
}
