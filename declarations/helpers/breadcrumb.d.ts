import Helper from '@ember/component/helper';
import type BreadcrumbsService from '../services/breadcrumbs.ts';
type TitleParts = [title: string];
type OptionalData = Record<string, unknown>;
export interface BreadcrumbHelperSignature {
    Args: {
        Positional: TitleParts;
        Named: OptionalData;
    };
    Return: void;
}
export default class BreadcrumbHelper extends Helper<BreadcrumbHelperSignature> {
    breadcrumbsService: BreadcrumbsService;
    breadcrumbId: string | null;
    get breadcrumbWasAddedBefore(): boolean;
    compute(breadcrumbTitleParts: TitleParts, optionalData: OptionalData): void;
    willDestroy(): void;
}
export {};
//# sourceMappingURL=breadcrumb.d.ts.map