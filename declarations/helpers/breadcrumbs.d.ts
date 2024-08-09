import Helper from '@ember/component/helper';
import type { BreadcrumbData } from '../private-types.ts';
import type BreadcrumbsService from '../services/breadcrumbs.ts';
export interface BreadcrumbsHelperSignature {
    Return: BreadcrumbData[];
}
export default class BreadcrumbsHelper extends Helper<BreadcrumbsHelperSignature> {
    breadcrumbsService: BreadcrumbsService;
    compute(): BreadcrumbData[];
}
//# sourceMappingURL=breadcrumbs.d.ts.map