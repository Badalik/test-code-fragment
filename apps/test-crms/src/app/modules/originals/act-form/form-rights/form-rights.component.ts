import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IDictionaryItem, RightToSublicensing } from '@crms-model';
import { clearControl, createStringifyDictionaryWrapper } from '@crms-utils';
import { DestroyService } from '@test-ui/src/cdk';
import {
  TestUiCopyToClipboardComponent,
  TestUiFormFieldModule,
  TestUiIconModule,
  TestUiOptionModule,
  TestUiSelectModule,
  TestUiSuffixDirective,
  TestUiTextInputModule
} from '@test-ui/src/lib';

import { IActRightsForm } from './form-rights.model';
import { ActContractUnitsRightsComponent } from '../../act-contract-units-rights/act-contract-units-rights.component';
import { IOwnerBase } from '../../../../common/model/owner/owner';
import { DictionariesFacadeService } from '../../../../root-store/dictionaries-store';

@Component({
  selector: 'test-crms-act-form-rights',
  templateUrl: 'form-rights.component.html',
  styleUrls: ['form-rights.component.scss'],
  providers: [DestroyService],
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TestUiFormFieldModule,
    TestUiIconModule,
    TestUiOptionModule,
    TestUiSelectModule,
    TestUiSuffixDirective,
    TestUiTextInputModule,
    TestUiCopyToClipboardComponent,
    ActContractUnitsRightsComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActFormRightsComponent implements OnInit {
  form = input.required<FormGroup<IActRightsForm>>();
  owners = input.required<IOwnerBase[]>();
  actId = input.required<string>();

  sublicenseRights$!: Observable<IDictionaryItem[]>;

  readonly createStringifyDictionaryWrapper = createStringifyDictionaryWrapper;
  readonly clearControl = clearControl;

  private readonly destroyed$ = inject(DestroyService);
  private readonly dictionariesFacadeService = inject(DictionariesFacadeService);

  private controls = computed(() => this.form().controls);

  constructor() {
    this.sublicenseRights$ = this.dictionariesFacadeService.sublicenseRights$;
  }

  ngOnInit() {
    this.initFormListeners();
  }

  private initFormListeners() {
    const thirdPartiesControl = this.controls().rightToSublicensingThirdParties;

    this.controls().rightToSublicensing.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        if ([RightToSublicensing.LIMITED_RIGHTS, RightToSublicensing.OTHER].includes(value)) {
          if (!thirdPartiesControl.hasValidator(Validators.required)) {
            thirdPartiesControl.addValidators([Validators.required]);
            thirdPartiesControl.updateValueAndValidity({ emitEvent: false });
          }
        } else if (thirdPartiesControl.hasValidator(Validators.required)) {
          thirdPartiesControl.removeValidators(Validators.required);
          thirdPartiesControl.updateValueAndValidity({ emitEvent: false });
        }
      });
  }
}
