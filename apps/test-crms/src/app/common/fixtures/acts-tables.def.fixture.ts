import { ITableColumnView, ITableDefinition, TableColumnEnum, TemplateModeEnum } from '@core-model';

import { TableCellType } from '@test-ui/src/lib';

import { FilterKey } from '../model/filters/filters.enum';

export const ACTS_TABLE_ID = 'acts_table';

export enum ActsColumnKey {
  NAME = 'name',
  NUMBER = 'number',
  LICENSEE = 'licensee',
  MANUFACTURER = 'manufacturer',
  ENTRY_DATE = 'entryDate',
  IAR_SHARE_PERCENT = 'iarSharePercent',
  MANAGING_OWNER_NAME = 'managingOwnerName',
  VERIFICATION = 'verification',
}

export const actsDefaultColumns = [
  TableCellType.SELECTION,
  ActsColumnKey.NUMBER,
  ActsColumnKey.NAME,
  ActsColumnKey.LICENSEE,
  ActsColumnKey.MANUFACTURER,
  ActsColumnKey.ENTRY_DATE,
  ActsColumnKey.IAR_SHARE_PERCENT,
  ActsColumnKey.MANAGING_OWNER_NAME,
  TableCellType.SETTINGS,
];

const columns: ITableColumnView[] = [
  {
    code: TableCellType.SELECTION,
    name: 'Выбор',
    type: TableColumnEnum.TEXT,
    width: 'max-content',
    fixedOrder: -100,
    sortable: false,
    isDefaultTemplateShow: true,
    managedByTemplateMode: TemplateModeEnum.FIXED,
  },
  {
    code: ActsColumnKey.NUMBER,
    name: 'Акт №',
    type: TableColumnEnum.TEXT,
    width: '130px',
    minWidth: '130px',
    sortable: true,
  },
  {
    code: ActsColumnKey.NAME,
    name: 'Наименование',
    type: TableColumnEnum.TEXT,
    width: '100%',
    minWidth: '256px',
    sortable: true,
  },
  {
    code: ActsColumnKey.LICENSEE,
    name: 'Правообладатель',
    type: TableColumnEnum.TEXT,
    width: '100%',
    minWidth: '180px',
    sortable: true,
  },
  {
    code: ActsColumnKey.MANUFACTURER,
    name: 'Производитель',
    type: TableColumnEnum.TEXT,
    width: '100%',
    minWidth: '256px',
    sortable: true,
  },
  {
    code: ActsColumnKey.ENTRY_DATE,
    name: 'Дата ввода',
    type: TableColumnEnum.TEXT,
    width: '100%',
    minWidth: '180px',
    sortable: true,
  },
  {
    code: ActsColumnKey.IAR_SHARE_PERCENT,
    name: 'Доля участия, %',
    type: TableColumnEnum.TEXT,
    width: '100%',
    minWidth: '180px',
    sortable: true,
  },
  {
    code: ActsColumnKey.MANAGING_OWNER_NAME,
    name: 'Управление правами',
    type: TableColumnEnum.TEXT,
    width: '100%',
    minWidth: '180px',
    sortable: true,
  },
  /*{
    code: ActsColumnKey.VERIFICATION,
    name: 'Верификация',
    type: TableColumnEnum.TEXT,
    width: '100%',
    minWidth: '180px',
    sortable: true,
  },*/
  {
    code: TableCellType.SETTINGS,
    name: 'Настройки',
    type: TableColumnEnum.TEXT,
    width: '72px',
    minWidth: '72px',
    sortable: false,
    managedByTemplateMode: TemplateModeEnum.FIXED,
  },
];

const filters: FilterKey[] = [
  FilterKey.NAME,
  FilterKey.OWNER_NAME,
  FilterKey.IAR_SHARE_PERCENT,
  FilterKey.MANAGING_OWNER_NAME,
  FilterKey.LICENSEE_ID,
  FilterKey.ENTRY_DATE,
];

export const actsTableDefinition: ITableDefinition<FilterKey> = {
  columns,
  filters,
  version: 2,
};
