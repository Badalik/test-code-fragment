import { FormGroup } from '@angular/forms';

import { IActClarificationsForm } from './form-clarifications/form-clarifications.model';
import { IActCommonForm } from './form-common/form-common.model';
import { IActRightsForm } from './form-rights/form-rights.model';

export interface IActForm {
  common: FormGroup<IActCommonForm>;
  rights: FormGroup<IActRightsForm>;
  clarifications: FormGroup<IActClarificationsForm>;
}
