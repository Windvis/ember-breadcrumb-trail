/// <reference types="ember-source/types/stable/@ember/-internals/owner" />
/// <reference types="ember-source/types/stable/@ember/-internals/glimmer/lib/helper" />
export default class BreadcrumbHelper extends Helper<any> {
    constructor(owner?: import("@ember/-internals/owner").default | undefined);
    breadcrumbsService: any;
    breadcrumbId: null;
    get breadcrumbWasAddedBefore(): boolean;
    compute(breadcrumbTitleParts: any, optionalData: any): void;
    willDestroy(...args: any[]): void;
}
import Helper from '@ember/component/helper';
//# sourceMappingURL=breadcrumb.d.ts.map