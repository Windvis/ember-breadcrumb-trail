import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';
import type BreadcrumbsService from '../services/breadcrumbs.ts';

type BreadcrumbData = {
  title: string;
  data: Record<string, unknown>;
};

export interface BreadcrumbsHelperSignature {
  Return: BreadcrumbData[];
}

export default class BreadcrumbsHelper extends Helper<BreadcrumbsHelperSignature> {
  @service('breadcrumbs') declare breadcrumbsService: BreadcrumbsService;

  compute() {
    return this.breadcrumbsService.items;
  }
}
