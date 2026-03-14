import Helper from '@ember/component/helper';
import { service } from '@ember/service';
import type { BreadcrumbData } from '../private-types.ts';
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
  @service('breadcrumbs') declare breadcrumbsService: BreadcrumbsService;

  breadcrumbId: string | null = null;

  get breadcrumbWasAddedBefore() {
    return !!this.breadcrumbId;
  }

  compute(breadcrumbTitleParts: TitleParts, optionalData: OptionalData) {
    const breadcrumbTitle = breadcrumbTitleParts.join('');

    const breadcrumbData: BreadcrumbData = {
      data: optionalData,
      title: breadcrumbTitle,
    };

    if (this.breadcrumbWasAddedBefore) {
      this.breadcrumbsService.updateBreadcrumb(
        this.breadcrumbId!,
        breadcrumbData,
      );
    } else {
      this.breadcrumbId = this.breadcrumbsService.addBreadcrumb(breadcrumbData);
    }
  }

  willDestroy() {
    super.willDestroy();

    if (this.breadcrumbWasAddedBefore) {
      this.breadcrumbsService.removeBreadcrumb(this.breadcrumbId!);
    }
  }
}
