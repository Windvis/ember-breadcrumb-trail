import { guidFor } from '@ember/object/internals';
import { scheduleOnce, next } from '@ember/runloop';
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

type BreadcrumbId = string;
type BreadcrumbData = {
  title: string;
  data: Record<string, unknown>;
};

export default class BreadcrumbsService extends Service {
  @tracked breadcrumbData: Map<BreadcrumbId, BreadcrumbData> = new Map();
  pendingBreadcrumbData: Map<BreadcrumbId, BreadcrumbData> | null = null;
  didForceRerender: boolean = false;

  get items() {
    return [...this.breadcrumbData.values()];
  }

  addBreadcrumb(breadcrumbData: BreadcrumbData): string {
    this.scheduleDataUpdate();

    const uniqueId = generateUniqueId();
    this.pendingBreadcrumbData?.set(uniqueId, breadcrumbData);
    return uniqueId;
  }

  updateBreadcrumb(uniqueId: BreadcrumbId, breadcrumbData: BreadcrumbData) {
    if (!this.didForceRerender) {
      this.scheduleDataUpdate();
      this.pendingBreadcrumbData?.set(uniqueId, breadcrumbData);
    }
  }

  removeBreadcrumb(uniqueId: BreadcrumbId): void {
    this.scheduleDataUpdate();
    this.pendingBreadcrumbData?.delete(uniqueId);
  }

  scheduleDataUpdate(): void {
    if (!this.pendingBreadcrumbData) {
      this.pendingBreadcrumbData = new Map(this.breadcrumbData);
    }

    scheduleOnce('afterRender', this, this.updateBreadcrumbData);
  }

  updateBreadcrumbData(): void {
    this.didForceRerender = true;

    this.breadcrumbData = this.pendingBreadcrumbData!;
    this.pendingBreadcrumbData = null;

    next(this, this.resetRerenderFlag);
  }

  resetRerenderFlag(): void {
    this.didForceRerender = false;
  }
}

function generateUniqueId(): string {
  return guidFor({});
}
