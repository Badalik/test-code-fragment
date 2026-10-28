import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DeepPartial, DocumentStatus, FormGroupRawValue } from '@crms-model';
import { getDirtyFormValue } from '@crms-utils';

import { IActCommonForm } from './form-common.model';
import { IAct } from '../../../../common/model/act/act';

export function createActCommonForm(act: DeepPartial<IAct>): FormGroup<IActCommonForm> {
  const licenseeIds = act.licensees?.length
    ? act.licensees.map((item) => item.id)
    : [];
  const ownerIds = act.owners?.length
    ? act.owners.map((item) => item.id)
    : [];

  const isTbaEntryDate = act.isTbaEntryDate ?? false;

  return new FormGroup<IActCommonForm>({
    name: new FormControl(act.name, Validators.required),
    anotherName: new FormControl(act.anotherName),
    number: new FormControl(act.number, Validators.required),
    contractStatus: new FormControl(
      { value: act.contractStatus ?? DocumentStatus.PRELIMINARY, disabled: !act.id },
      Validators.required,
    ),
    licenseeIds: new FormControl(licenseeIds, Validators.required),
    ownerIds: new FormControl(ownerIds, Validators.required),
    entryDate: new FormControl({ value: act.entryDate, disabled: isTbaEntryDate }),
    isTbaEntryDate: new FormControl(isTbaEntryDate),
    iarSharePercent: new FormControl(act.iarSharePercent),
    managingOwnerId: new FormControl(act.managingOwner?.id),
  });
}
export function getActCommonFormValue(form: FormGroup<IActCommonForm>, onlyDirty = false): DeepPartial<IAct> {
  const value: FormGroupRawValue<IActCommonForm> = onlyDirty ? getDirtyFormValue(form) : form.getRawValue();

  const fieldMap: Record<keyof IActCommonForm, keyof IAct | ['managingOwner', string]> = {
    name: 'name',
    anotherName: 'anotherName',
    number: 'number',
    contractStatus: 'contractStatus',
    licenseeIds: 'licenseeIds',
    ownerIds: 'ownerIds',
    entryDate: 'entryDate',
    isTbaEntryDate: 'isTbaEntryDate',
    iarSharePercent: 'iarSharePercent',
    managingOwnerId: 'managingOwnerId',
  };

  const result: DeepPartial<IAct> = {};
  const keys = Object.keys(value) as Array<keyof IActCommonForm>;

  for (const key of keys) {
    const mapTarget = fieldMap[key];

    if (Array.isArray(mapTarget)) {
      const [parent, child] = mapTarget;
      if (!result[parent]) {
        result[parent] = {};
      }
      (result[parent] as any)[child] = value[key];
    } else {
      (result as any)[mapTarget] = value[key];
    }
  }

  return result;
}
