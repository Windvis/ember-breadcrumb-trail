import Helper from '@ember/component/helper';
import { service } from '@ember/service';
import type { BreadcrumbData } from '../private-types.ts';
import type BreadcrumbsService from '../services/breadcrumbs.ts';

export interface BreadcrumbsHelperSignature {
  Return: BreadcrumbData[];
}

export default class BreadcrumbsHelper extends Helper<BreadcrumbsHelperSignature> {
  @service('breadcrumbs') declare breadcrumbsService: BreadcrumbsService;

  compute() {
    return this.breadcrumbsService.items;
  }
}
