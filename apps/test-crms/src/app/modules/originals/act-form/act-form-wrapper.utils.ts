import { FormGroup } from '@angular/forms';

import { mergeAll } from 'lodash/fp';

import { DeepPartial } from '@crms-model';
import { emptyValuesToNull, omitEmpties } from '@crms-utils';

import { IActForm } from './act-form-wrapper.model';
import {
  createActClarificationsForm,
  getActClarificationsFormValue,
} from './form-clarifications/form-clarifications.utils';
import { createActCommonForm, getActCommonFormValue } from './form-common/form-common.utils';
import { createActRightsForm, getActRightsFormValue } from './form-rights/form-rights.utils';
import { IAct } from '../../../common/model/act/act';

export function createActForm(act: DeepPartial<IAct>): FormGroup<IActForm> {
  return new FormGroup<IActForm>({
    common: createActCommonForm(act),
    rights: createActRightsForm(act),
    clarifications: createActClarificationsForm(act),
  });
}

export function buildActFromForm(form: FormGroup<IActForm>, isEdit: boolean): DeepPartial<IAct> {
  const formValue = emptyValuesToNull(
    mergeAll([
      getActCommonFormValue(form.controls.common, isEdit),
      getActRightsFormValue(form.controls.rights, isEdit),
      getActClarificationsFormValue(form.controls.clarifications, isEdit),
    ]),
  );

  if (!isEdit) {
    omitEmpties(formValue);
  }

  return formValue;
}
