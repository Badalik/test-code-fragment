import { FormControl } from '@angular/forms';

import { RightToSublicensing } from '@crms-model';

export interface IActRightsForm {
  rightToSublicensing: FormControl<RightToSublicensing | null>;
  rightToSublicensingThirdParties: FormControl<string | null>;
}
