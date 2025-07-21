import { guidFor } from '@ember/object/internals';
import { scheduleOnce, next } from '@ember/runloop';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { g, i } from 'decorator-transforms/runtime';

class BreadcrumbsService extends Service {
  static {
    g(this.prototype, "breadcrumbData", [tracked], function () {
      return new Map();
    });
  }
  #breadcrumbData = (i(this, "breadcrumbData"), void 0);
  pendingBreadcrumbData = null;
  didForceRerender = false;
  get items() {
    return [...this.breadcrumbData.values()];
  }
  addBreadcrumb(breadcrumbData) {
    this.scheduleDataUpdate();
    const uniqueId = generateUniqueId();
    this.pendingBreadcrumbData?.set(uniqueId, breadcrumbData);
    return uniqueId;
  }
  updateBreadcrumb(uniqueId, breadcrumbData) {
    if (!this.didForceRerender) {
      this.scheduleDataUpdate();
      this.pendingBreadcrumbData?.set(uniqueId, breadcrumbData);
    }
  }
  removeBreadcrumb(uniqueId) {
    this.scheduleDataUpdate();
    this.pendingBreadcrumbData?.delete(uniqueId);
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

export { BreadcrumbsService as default };
//# sourceMappingURL=breadcrumbs.js.map
