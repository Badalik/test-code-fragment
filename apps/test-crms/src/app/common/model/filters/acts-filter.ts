import { FilterKey } from './filters.enum';

export interface IActsFilter {
  [FilterKey.NAME]: string | null;
  [FilterKey.OWNER_NAME]: string | null;
  [FilterKey.IAR_SHARE_PERCENT]: string | null;
  [FilterKey.MANAGING_OWNER_NAME]: string | null;
  [FilterKey.LICENSEE_ID]: string[] | null;
  [FilterKey.ENTRY_DATE]: string | null;
}
