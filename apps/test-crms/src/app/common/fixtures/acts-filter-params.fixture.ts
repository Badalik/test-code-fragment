import { SearchByKeyOptionType } from '@test-shared-helpers';

import { FilterKey } from '../model/filters/filters.enum';

export const actsSearchHeaderOptions: SearchByKeyOptionType[] = [
  { key: FilterKey.NAME, caption: 'Наименование' },
];
