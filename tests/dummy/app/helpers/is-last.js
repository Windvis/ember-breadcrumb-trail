import { helper } from '@ember/component/helper';

export default helper(function isLast([breadcrumb, breadcrumbs]) {
  return breadcrumbs[breadcrumbs.length - 1] === breadcrumb;
});
