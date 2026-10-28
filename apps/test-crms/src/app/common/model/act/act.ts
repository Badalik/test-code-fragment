import { BrandId, ContractType, ProviderId } from '../common.enum';

import { DocumentStatus, RightToSublicensing } from '@crms-model';

/** Связь с правообладателями */
export interface IContractActOwner {
  /** Уникальный идентификатор */
  id: string;
  /** Краткое название правообладателя */
  name: string;
}

export interface IContractVerificationSummary {
  /** Статус верификации юристом */
  lawyer: boolean;
  /** Статус верификации финансистом */
  financier: boolean;
}

/** Права и обязанности */
export interface IRightsObligation {
  /** Право сублицензирования */
  rightToSublicensing: RightToSublicensing;
  /** Третьи лица */
  rightToSublicensingThirdParties: string;
}

export interface IActBase {
  /** Уникальный идентификатор */
  id: string;
  /** Наименование документа */
  name: string;
  /** Номер документа */
  number: string;
  /** Идентификатор поставщика */
  providerId: ProviderId;
  /** Тип документа */
  contractType: ContractType;
  /** Статус документа */
  contractStatus: DocumentStatus;
  /** Лицензиаты (правообладатели) (get) */
  licensees: IContractActOwner[];
  /** Доля АВП (необязательно) */
  iarSharePercent: number;
  /** Дата ввода / дата начала действия */
  entryDate: string;
  /** Дата ввода неизвестна (TBA) */
  isTbaEntryDate: boolean;
  /** Связи с правообладателями */
  owners: IContractActOwner[];
  /** Краткий статус верификации */
  verification: IContractVerificationSummary;
  /** Управляющий Правообладатель */
  managingOwner: IContractActOwner;
  /** Дата и время создания записи */
  tmCreate: string;
}

/**
 * Owner представляет юридическое лицо, занимающееся издательской деятельностью, с подробной информацией о
 * регламентах и контактах
 * */
export interface IAct extends IActBase {
  /** Лицензиаты (правообладатели) (create и update) */
  licenseeIds: string[];
  /** Идентификаторы родительских производителей */
  ownerIds: string[];
  /** Идентификатор бренда */
  brandId: BrandId;
  /** Комментарий к документу */
  comment: string;
  /** Дополнительное наименование */
  anotherName: string;
  /** Уточнение доходной части */
  clarificationProfitable: string;
  /** Уточнение расходной части */
  clarificationExpenses: string;
  /** Правообладатель */
  managingOwnerId: string;
  /** Права и обязанности */
  rightsObligation: IRightsObligation;
  /** Дата изменения */
  tmModify: string;
}
