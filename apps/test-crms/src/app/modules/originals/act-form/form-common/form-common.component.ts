import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { DocumentStatusesMapType, FormGroupRawValue } from '@crms-model';
import {
  DateTimeRangeDateFormatDirective,
  DictionaryMultiSelectComponent,
  DictionarySelectComponent,
  DocumentStatusButtonsComponent,
} from '@crms-ui';
import { clearControl, createStringifyDictionaryWrapper } from '@crms-utils';
import { CalendarModeEnum, TestUiCalendarModule } from '@test-calendar';
import { DestroyService } from '@test-ui/src/cdk';
import {
  TestUiCheckboxModule,
  TestUiCopyToClipboardComponent,
  TestUiFormFieldModule,
  TestUiIconModule,
  TestUiOptionModule,
  TestUiSelectModule,
  TestUiSuffixDirective,
  TestUiTextInputModule,
} from '@test-ui/src/lib';

import { IActCommonForm } from './form-common.model';
import { ActContractUnitsComponent } from '../../act-contract-units/act-contract-units.component';
import { IOwnerBase } from '../../../../common/model/owner/owner';
import { DictionariesFacadeService } from '../../../../root-store/dictionaries-store';
import { IDictionaryIconItem } from '../../../../root-store/dictionaries-store/dictionaries.interface';

@Component({
  selector: 'test-crms-act-form-common',
  templateUrl: 'form-common.component.html',
  styleUrls: ['form-common.component.scss'],
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TestUiCopyToClipboardComponent,
    TestUiFormFieldModule,
    TestUiIconModule,
    TestUiSuffixDirective,
    TestUiTextInputModule,
    TestUiOptionModule,
    TestUiSelectModule,
    TestUiCalendarModule,
    TestUiCheckboxModule,
    DocumentStatusButtonsComponent,
    DictionaryMultiSelectComponent,
    ActContractUnitsComponent,
    DateTimeRangeDateFormatDirective,
    DictionarySelectComponent,
  ],
  providers: [DestroyService],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActFormCommonComponent implements OnInit {
  form = input.required<FormGroup<IActCommonForm>>();
  owners = input.required<IOwnerBase[]>();
  internalOwners = input.required<IOwnerBase[]>();
  actId = input<string>();

  readonly contractStatuses$!: Observable<IDictionaryIconItem[]>;

  statusesMap: DocumentStatusesMapType;

  readonly createStringifyDictionaryWrapper = createStringifyDictionaryWrapper;
  readonly calendarMode = CalendarModeEnum.ONE_DAY;

  private controls = computed(() => this.form().controls);

  private readonly destroyed$ = inject(DestroyService);
  private readonly dictionariesFacadeService = inject(DictionariesFacadeService);

  constructor() {
    this.contractStatuses$ = this.dictionariesFacadeService.contractStatuses$;
  }

  ngOnInit() {
    this.initFormListeners();
  }

  clear<K extends keyof IActCommonForm>(controlName: K, value: FormGroupRawValue<IActCommonForm>[K] = null) {
    clearControl(this.form().get(controlName), value);
  }

  private initFormListeners() {
    this.controls().contractStatus.valueChanges.pipe(
      startWith(this.controls().contractStatus.value),
      takeUntil(this.destroyed$),
    ).subscribe(() => this.buildStatusesMap());

    this.controls().isTbaEntryDate.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        if (value) {
          this.controls().entryDate.disable();
          clearControl(this.controls().entryDate);
        } else {
          this.controls().entryDate.enable();
        }
      });
  }

  private buildStatusesMap() {}
}
