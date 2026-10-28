import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, takeUntil, tap } from 'rxjs/operators';

import { SharedPermissionsModule } from '@core-permissions';
import { CrmsUiArrayToTextPipe, CrmsUiCollapseDirective } from '@crms-ui';
import { TestPageWrapperModule } from '@test-page-wrapper';
import {
  TestTableDisplayedColumnsPipe,
  TestTableSettingsByColPipe,
  TestTableSettingsPipe,
} from '@test-shared-helpers';
import { TestTableSettingsViewModule } from '@test-table-settings';
import { DestroyService } from '@test-ui/src/cdk';
import {
  defaultValueTableChangesService,
  defaultValueTableRequestService,
  TestUiButtonModule,
  TestUiIconModule,
  TestUiProgressSpinnerModule,
  ROW_HEIGHT,
  SnackBarService,
  TABLE_SELECTION_MODEL,
  VirtualRowDblClickEmitterDirective,
  VirtualTableModule,
  TableCellType,
  ITableRowEvent,
  TABLE_CHANGES_SERVICE,
} from '@test-ui/src/lib';

import { ActsFiltersComponent } from './acts-filters/acts-filters.component';
import { ActsTableDataSource } from './acts-table.data-source';
import { originalsNavNames } from '../constants';
import { actsSearchHeaderOptions } from '../../../common/fixtures/acts-filter-params.fixture';
import {
  ACTS_TABLE_ID,
  ActsColumnKey,
  actsDefaultColumns,
} from '../../../common/fixtures/acts-tables.def.fixture';
import { IActBase } from '../../../common/model/act/act';
import { LinksUrl, NavPath } from '../../../common/model/links-url-address';
import { IOwnerBase } from '../../../common/model/owner/owner';
import { RouteParam } from '../../../common/model/route.enum';
import { OriginalsFacadeService } from '../originals-facade.service';
import { TableChangesService } from '../../../core/services/table-settings/table-changes.service';
import { WithTabComponent } from '../../../core/tabs/with-tab.component';
import { ActService } from '../../../repository/graphql/acts/act.service';
import { BadgeComponent } from '../../../shared/components/badge/badge.component';
import { OwnerService } from '../../../repository/graphql/owners/owners.service';

@Component({
  selector: 'test-crms-original-acts-table',
  templateUrl: 'acts-table.component.html',
  styleUrls: ['acts-table.component.scss'],
  providers: [
    DestroyService,
    defaultValueTableChangesService(TableChangesService, false),
    defaultValueTableRequestService(ActsTableDataSource),
    { provide: ROW_HEIGHT, useValue: 56 },
  ],
  imports: [
    CommonModule,
    RouterModule,
    TestPageWrapperModule,
    TestTableSettingsViewModule,
    TestTableDisplayedColumnsPipe,
    TestTableSettingsPipe,
    TestTableSettingsByColPipe,
    TestUiIconModule,
    TestUiButtonModule,
    TestUiProgressSpinnerModule,
    SharedPermissionsModule,
    VirtualTableModule,
    VirtualRowDblClickEmitterDirective,
    ActsFiltersComponent,
    CrmsUiArrayToTextPipe,
    CrmsUiCollapseDirective,
    BadgeComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OriginalsActsTableComponent extends WithTabComponent implements OnInit, OnDestroy {
  readonly searchHeaderOptions = actsSearchHeaderOptions;
  readonly tableId = ACTS_TABLE_ID;
  readonly defaultColumns = actsDefaultColumns;
  readonly tableCellType = TableCellType;
  readonly tableColumnKey = ActsColumnKey;

  readonly hideFilters!: Signal<boolean>;
  readonly owners!: Signal<IOwnerBase[]>;
  readonly internalOwners!: Signal<IOwnerBase[]>;

  private readonly selectionModel: SelectionModel<IActBase> = inject(TABLE_SELECTION_MODEL);
  private readonly actService = inject(ActService);
  private readonly tableChangesService = inject(TABLE_CHANGES_SERVICE) as TableChangesService;
  private readonly snackBarService = inject(SnackBarService);
  private readonly originalsFacadeService = inject(OriginalsFacadeService);
  private readonly ownerService = inject(OwnerService);

  private readonly ownersResource = rxResource({
    stream: () => this.ownerService.getOwners(null, 0, 999).pipe(map(res => res.item)),
  });

  constructor() {
    super();

    this.hideFilters = this.originalsFacadeService.hideFilters;
    this.owners = computed(() => this.ownersResource.value() ?? []);
    this.internalOwners = computed(() => this.owners().filter((owner) => owner.isInternal));
  }

  ngOnInit() {
    this.initTab();
    this.initRouteListeners();
    this.initActionListeners();

    this.originalsFacadeService.setHasDeleteButton(true);
  }

  ngOnDestroy() {
    this.originalsFacadeService.setHasDeleteButton(false);

    this.removeTabIfShould();
  }

  rowDbClick(row: ITableRowEvent<IActBase>) {
    this.router.navigate([row.data.id], { relativeTo: this.route });
  }

  private initRouteListeners() {
    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.openTab(LinksUrl.ORIGINALS_PREFIX, originalsNavNames[LinksUrl.ORIGINALS_ACTS]);
      });
  }

  private initActionListeners() {
    this.originalsFacadeService.create$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.router.navigate([NavPath.ORIGINALS_ACTS, RouteParam.CREATE]);
      });

    this.originalsFacadeService.delete$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.deleteSelected();
      });
  }

  private deleteSelected() {
    return this.actService
      .deleteActs({ ids: this.selectionModel.selected.map((act) => act.id) }).pipe(
        tap(() => {
          this.selectionModel.clear();
          this.snackBarService.openWithText('Выбранные акты успешно удалены');
          this.tableChangesService.updateEmitter.next(true);
        }),
        catchError(() => {
          this.snackBarService.openWithText('Ошибка при удалении');
          return of();
        }),
      ).subscribe();
  }
}
