import { FormControl, FormGroup } from '@angular/forms';

import { DeepPartial, FormGroupRawValue } from '@crms-model';
import { getDirtyFormValue } from '@crms-utils';

import { IActClarificationsForm } from './form-clarifications.model';
import { IAct } from '../../../../common/model/act/act';

export function createActClarificationsForm(act: DeepPartial<IAct>): FormGroup<IActClarificationsForm> {
  return new FormGroup<IActClarificationsForm>({
    clarificationProfitable: new FormControl(act.clarificationProfitable),
    clarificationExpenses: new FormControl(act.clarificationExpenses),
  });
}

export function getActClarificationsFormValue(
  form: FormGroup<IActClarificationsForm>,
  onlyDirty = false,
): DeepPartial<IAct> {
  const value: FormGroupRawValue<IActClarificationsForm> = onlyDirty ? getDirtyFormValue(form) : form.getRawValue();

  const fieldMap: Record<keyof IActClarificationsForm, keyof IAct> = {
    clarificationProfitable: 'clarificationProfitable',
    clarificationExpenses: 'clarificationExpenses',
  };

  const result: DeepPartial<IAct> = {};
  const keys = Object.keys(value) as Array<keyof IActClarificationsForm>;

  for (const key of keys) {
    const mapTarget = fieldMap[key];

    (result as any)[mapTarget] = value[key];
  }

  return result;
}
