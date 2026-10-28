import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { TestFiltersModule, TestFiltersUiModule } from '@test-filters';
import { SettingsFacadeService } from '@test-table-settings';
import { TestTableSettingsByColPipe } from '@test-shared-helpers';

import { ACTS_TABLE_ID, ActsColumnKey } from '../../../../common/fixtures/acts-tables.def.fixture';
import { IActsFilter } from '../../../../common/model/filters/acts-filter';
import { FilterKey } from '../../../../common/model/filters/filters.enum';
import { IOwnerBase } from '../../../../common/model/owner/owner';
import { DictionariesFacadeService } from '../../../../root-store/dictionaries-store';
import { IDictionaryItem } from '../../../../root-store/dictionaries-store/dictionaries.interface';

@Component({
  selector: 'test-crms-acts-filters',
  templateUrl: 'acts-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    TestFiltersModule,
    TestFiltersUiModule,
    TestTableSettingsByColPipe,
  ],
})
export class ActsFiltersComponent implements OnInit {
  tableId = input.required<typeof ACTS_TABLE_ID>();
  internalOwners = input.required<IOwnerBase[]>();

  value = input<IActsFilter>({
    [FilterKey.NAME]: null,
    [FilterKey.OWNER_NAME]: null,
    [FilterKey.IAR_SHARE_PERCENT]: null,
    [FilterKey.MANAGING_OWNER_NAME]: null,
    [FilterKey.LICENSEE_ID]: null,
    [FilterKey.ENTRY_DATE]: null,
  });

  displayedFilters$!: Observable<FilterKey[]>;
  licensees$!: Observable<IDictionaryItem[] | null>;

  readonly FILTERS = FilterKey;
  readonly TABLE_COLUMN_KEY = ActsColumnKey;

  private readonly settingsFacadeService = inject(
    SettingsFacadeService,
  ) as SettingsFacadeService<typeof ACTS_TABLE_ID, FilterKey>;
  private readonly dictionariesFacadeService = inject(DictionariesFacadeService);

  ngOnInit() {
    this.displayedFilters$ = this.settingsFacadeService.selectFiltersByTable(this.tableId());
    this.licensees$ = this.dictionariesFacadeService.licensees$;
  }
}
