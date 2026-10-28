import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DeepPartial, FormGroupRawValue, RightToSublicensing } from '@crms-model';
import { getDirtyFormValue } from '@crms-utils';

import { IActRightsForm } from './form-rights.model';
import { IAct } from '../../../../common/model/act/act';

export function createActRightsForm(act: DeepPartial<IAct>): FormGroup<IActRightsForm> {
  return new FormGroup<IActRightsForm>({
    rightToSublicensing: new FormControl(act.rightsObligation?.rightToSublicensing),
    rightToSublicensingThirdParties: new FormControl(
      act.rightsObligation?.rightToSublicensingThirdParties,
      [
        RightToSublicensing.LIMITED_RIGHTS,
        RightToSublicensing.OTHER,
      ].includes(act.rightsObligation?.rightToSublicensing)
        ? Validators.required
        : null,
    ),
  });
}

export function getActRightsFormValue(form: FormGroup<IActRightsForm>, onlyDirty = false): DeepPartial<IAct> {
  const value: FormGroupRawValue<IActRightsForm> = onlyDirty ? getDirtyFormValue(form) : form.getRawValue();

  const fieldMap: Record<keyof IActRightsForm, keyof IAct | ['rightsObligation', string]> = {
    rightToSublicensing: ['rightsObligation', 'rightToSublicensing'],
    rightToSublicensingThirdParties: ['rightsObligation', 'rightToSublicensingThirdParties'],
  };

  const result: DeepPartial<IAct> = {};
  const keys = Object.keys(value) as Array<keyof IActRightsForm>;

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
