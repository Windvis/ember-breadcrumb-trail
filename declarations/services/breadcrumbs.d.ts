import Service from '@ember/service';
import type { BreadcrumbData, BreadcrumbId } from '../private-types';
export default class BreadcrumbsService extends Service {
    breadcrumbData: Map<BreadcrumbId, BreadcrumbData>;
    pendingBreadcrumbData: Map<BreadcrumbId, BreadcrumbData> | null;
    didForceRerender: boolean;
    get items(): BreadcrumbData[];
    addBreadcrumb(breadcrumbData: BreadcrumbData): BreadcrumbId;
    updateBreadcrumb(uniqueId: BreadcrumbId, breadcrumbData: BreadcrumbData): void;
    removeBreadcrumb(uniqueId: BreadcrumbId): void;
    scheduleDataUpdate(): void;
    updateBreadcrumbData(): void;
    resetRerenderFlag(): void;
}
//# sourceMappingURL=breadcrumbs.d.ts.map