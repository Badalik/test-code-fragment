import { FormControl } from '@angular/forms';

export interface IActClarificationsForm {
  clarificationProfitable: FormControl<string | null>;
  clarificationExpenses: FormControl<string | null>;
}
