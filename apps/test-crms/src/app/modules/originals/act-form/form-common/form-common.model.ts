import { FormControl } from '@angular/forms';

import { DocumentStatus } from '@crms-model';

export interface IActCommonForm {
  name: FormControl<string | null>;
  anotherName: FormControl<string | null>;
  number: FormControl<string | null>;
  contractStatus: FormControl<DocumentStatus>;
  licenseeIds: FormControl<string[]>;
  ownerIds: FormControl<string[]>;
  entryDate: FormControl<string | null>;
  isTbaEntryDate: FormControl<boolean>;
  iarSharePercent: FormControl<number | null>;
  managingOwnerId: FormControl<string | null>;
}
