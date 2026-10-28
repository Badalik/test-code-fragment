import { TextFieldModule } from '@angular/cdk/text-field';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormGroupRawValue } from '@crms-model';
import { BigTextFormFieldTriggerDirective } from '@crms-ui';
import { clearControl } from '@crms-utils';
import {
  TestUiCopyToClipboardComponent,
  TestUiFormFieldModule,
  TestUiIconModule,
  TestUiSuffixDirective,
  TestUiTextInputModule,
} from '@test-ui/src/lib';

import { IActClarificationsForm } from './form-clarifications.model';

@Component({
  selector: 'test-crms-act-form-clarifications',
  templateUrl: 'form-clarifications.component.html',
  styleUrls: ['form-clarifications.component.scss'],
  imports: [
    NgIf,
    ReactiveFormsModule,
    TestUiCopyToClipboardComponent,
    TestUiFormFieldModule,
    TestUiIconModule,
    TestUiSuffixDirective,
    TestUiTextInputModule,
    BigTextFormFieldTriggerDirective,
    TextFieldModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActFormClarificationsComponent {
  @Input() form!: FormGroup<IActClarificationsForm>;

  clear<K extends keyof IActClarificationsForm>(
    controlName: K,
    value: FormGroupRawValue<IActClarificationsForm>[K] = null,
  ) {
    clearControl(this.form.get(controlName), value);
  }
}
