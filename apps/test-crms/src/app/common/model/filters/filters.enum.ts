/** Поля, по которым можно осуществлять фильтр поиск */
export enum FilterKey {
  /** Короткое название */
  NAME = 'NAME',
  /** Номер ИНН */
  TIN = 'TIN',
  /** ОГРН/ОГРНИП */
  PSRM = 'PSRM',
  /** Полное название */
  FULL_NAME = 'FULL_NAME',
  /** Холдинг */
  HOLDING = 'HOLDING',
  /** Правовая форма */
  LEGAL_FORM_ID = 'LEGAL_FORM_ID',
  /** Есть ЭДО */
  IS_EDO = 'IS_EDO',
  /** КПП */
  RRC = 'RRC',
  /** Валюта */
  CURRENCY_ID = 'CURRENCY_ID',
  /** Контент провайдер */
  CONTENT_PROVIDER_TAGS = 'CONTENT_PROVIDER_TAGS',
  /** Резидент */
  IS_RESIDENT = 'IS_RESIDENT',
  /** Есть контракты */
  HAS_CONTRACT = 'HAS_CONTRACT',
  /** Активная система налогообложения */
  TAX_SYSTEM_CODE = 'TAX_SYSTEM_CODE',
  /**  */
  SUPPLIER_NUMBER = 'SUPPLIER_NUMBER',
  /** Является ли политически значимым лицом (PEP) */
  IS_PEP = 'IS_PEP',
  /** Описание связи с Актером/проектом */
  RELATION_ACTORS_NAME = 'RELATION_ACTORS_NAME',
  /** Идентификатор контрагента */
  OWNER_LABEL_IDENT = 'OWNER_LABEL_IDENT',
  /** Сторонний идентификатор */
  EXTERNAL_ID = 'EXTERNAL_ID',
  /** Является покупателем */
  IS_BUYER = 'IS_BUYER',
  /** Является производителем */
  IS_MANUFACTURER = 'IS_MANUFACTURER',
  /** Идентификатор лицензиата */
  LICENSEE_ID = 'LICENSEE_ID',
  /** Имя лицензиата */
  LICENSEE_NAME = 'LICENSEE_NAME',
  /** Доля участия */
  IAR_SHARE_PERCENT = 'IAR_SHARE_PERCENT',
  /** Дата ввода / дата начала действия */
  ENTRY_DATE = 'ENTRY_DATE',
  /** Идентификатор правообладателя */
  OWNER_ID = 'OWNER_ID',
  /** Имя правообладателя/производителя */
  OWNER_NAME = 'OWNER_NAME',
  /** Управление правами */
  MANAGING_OWNER_NAME = 'MANAGING_OWNER_NAME',
  /** Тип единиц контента */
  TEST_TITLE_TYPE = 'TEST_TITLE_TYPE',
  /** Год */
  YEAR = 'YEAR',
  /** Полное название с родителями */
  TREE_NAME = 'TREE_NAME',
  /** Номер договора в системе OEBS в расходной базе */
  OEBS_NUMBER = 'OEBS_NUMBER',
  /** Номер договора в системе OEBS в доходной базе */
  OEBS_NUMBER_PROFITABLE = 'OEBS_NUMBER_PROFITABLE',
  /** Ответственный */
  RESPONSIBLE_NAME = 'RESPONSIBLE_NAME',
  /** Дата договора */
  CONTRACT_DATE = 'CONTRACT_DATE',
  /** Дата окончания */
  END_DATE = 'END_DATE',
  /** Номер */
  NUMBER = 'NUMBER',
  /** Способ использования */
  WAY_TO_USE = 'WAY_TO_USE',
  /** Линейный договор */
  IS_LINEAR = 'IS_LINEAR',
  /** Контент-провайдерский договор */
  IS_CONTENT_PROVIDER = 'IS_CONTENT_PROVIDER',
  /** Тип договора */
  TYPE_CODE = 'TYPE_CODE',
}
