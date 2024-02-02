/// <reference types="ember-source/types/stable/@ember/service" />
export default class BreadcrumbsService extends Service {
    breadcrumbData: Map<any, any>;
    pendingBreadcrumbData: null;
    didForceRerender: boolean;
    get items(): any[];
    addBreadcrumb(breadcrumbData: any): string;
    updateBreadcrumb(uniqueId: any, breadcrumbData: any): void;
    removeBreadcrumb(uniqueId: any): void;
    scheduleDataUpdate(): void;
    updateBreadcrumbData(): void;
    resetRerenderFlag(): void;
}
import Service from '@ember/service';
//# sourceMappingURL=breadcrumbs.d.ts.map