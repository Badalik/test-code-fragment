import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit, Signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { filter, map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

import { SharedPermissionsModule } from '@core-permissions';
import { DeepPartial, IBreadcrumb, IInfoTag } from '@crms-model';
import { TestPageWrapperModule } from '@test-page-wrapper';
import { createBreadcrumb, markAsTouchedInvalidControls } from '@crms-utils';
import { DestroyService } from '@test-ui/src/cdk';
import {
  TestUiButtonModule,
  TestUiIconModule,
  TestUiProgressSpinnerModule,
  TestUiTabsModule,
  SnackBarService,
} from '@test-ui/src/lib';

import { IActForm } from './act-form-wrapper.model';
import { buildActFromForm, createActForm } from './act-form-wrapper.utils';
import { ActFormCommonComponent } from './form-common/form-common.component';
import { ActFormClarificationsComponent } from './form-clarifications/form-clarifications.component';
import { ActFormObligationsComponent } from './form-obligations/form-obligations.component';
import { ActFormRightsComponent } from './form-rights/form-rights.component';
import { ActFormRoyaltiesComponent } from './form-royalties/form-royalties.component';
import { IAct } from '../../../common/model/act/act';
import { NavPath } from '../../../common/model/links-url-address';
import { RouteParam } from '../../../common/model/route.enum';
import { WithTabComponent } from '../../../core/tabs/with-tab.component';
import { ActService } from '../../../repository/graphql/acts/act.service';
import { OwnerService } from '../../../repository/graphql/owners/owners.service';
import { DictionariesFacadeService } from '../../../root-store/dictionaries-store';
import { FormHeaderModule } from '../../../shared/components/form-header/form-header.module';
import { IOwnerBase } from '../../../common/model/owner/owner';

@Component({
  selector: 'test-crms-act-form-wrapper',
  templateUrl: 'act-form-wrapper.component.html',
  styleUrls: ['act-form-wrapper.component.scss'],
  imports: [
    AsyncPipe,
    TestPageWrapperModule,
    TestUiIconModule,
    TestUiProgressSpinnerModule,
    TestUiTabsModule,
    TestUiButtonModule,
    SharedPermissionsModule,
    FormHeaderModule,
    ActFormCommonComponent,
    ActFormClarificationsComponent,
    ActFormRightsComponent,
    ActFormObligationsComponent,
    ActFormRoyaltiesComponent,
  ],
  providers: [DestroyService],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActFormWrapperComponent extends WithTabComponent implements OnInit, OnDestroy {
  form: FormGroup<IActForm>;
  actId?: string;

  readonly breadcrumbs$ = new BehaviorSubject<IBreadcrumb[]>([]);
  readonly infoTags$ = new BehaviorSubject<IInfoTag[]>([]);

  readonly owners!: Signal<IOwnerBase[]>;
  readonly internalOwners!: Signal<IOwnerBase[]>;

  private readonly actService = inject(ActService);
  private readonly dictionariesFacadeService = inject(DictionariesFacadeService);
  private readonly snackBarService = inject(SnackBarService);
  private readonly changeDetector = inject(ChangeDetectorRef);
  private readonly ownerService = inject(OwnerService);

  private readonly ownersResource = rxResource({
    stream: () => this.ownerService.getOwners(null, 0, 999).pipe(map(res => res.item)),
  });

  constructor() {
    super();

    this.owners = computed(() => this.ownersResource.value() ?? []);
    this.internalOwners = computed(() => this.owners().filter((owner) => owner.isInternal));
  }

  override canDeactivate(): boolean {
    return super.canDeactivate() || this.form?.pristine;
  }

  ngOnInit() {
    this.initRouteListeners();
    this.initTab();
  }

  ngOnDestroy() {
    this.removeTabIfShould();
  }

  close() {
    this.shouldCloseTab = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  save() {
    if (this.form.valid) {
      const act = buildActFromForm(this.form, !!this.actId);

      const request$ = this.actId
        ? this.actService.updateAct(this.actId, act)
        : this.actService.createAct(act).pipe(
          tap((response) => {
            const url = this.router.createUrlTree(['../', response.id], { relativeTo: this.route }).toString();
            this.tabsService.replaceTabId(this.router.url, url);
            this.router.navigateByUrl(url);
          }),
        );

      request$
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: () => {
            this.snackBarService.openWithText('Акт успешно сохранен');
          },
          error: () => {
            this.snackBarService.openWithText('Не удалось сохранить акт');
          },
          complete: () => {
            this.form.markAsPristine();
            this.form.markAsUntouched();
            this.setTabEdited(false);
            this.changeDetector.markForCheck();
          },
        });
    } else {
      this.snackBarService.openWithText('Не удалось сохранить. Проверьте корректность заполненных полей' );
    }
  }

  private initRouteListeners() {
    this.route.params
      .pipe(
        tap((params) => {
          if (params[RouteParam.ACT_ID]) {
            this.actId = params[RouteParam.ACT_ID];
          }
        }),
        switchMap(() => this.actId ? this.actService.getAct(this.actId) : of({})),
        takeUntil(this.destroyed$),
      )
      .subscribe((act: DeepPartial<IAct>) => {
        this.createForm(act);
        this.createBreadcrumbs(act);

        if (this.actId) {
          this.createInfoTags();
        }

        this.openTab(this.router.url, act.name ?? this.route.snapshot.data.title, false);
        this.initFormListeners();

        this.changeDetector.markForCheck();
      });
  }

  private createForm(act: DeepPartial<IAct>) {
    this.form = createActForm(act);

    // Чтобы подсветить вкладки на которых надо задать значения
    markAsTouchedInvalidControls(this.form);
  }

  private createBreadcrumbs(act: DeepPartial<IAct>) {
    return this.breadcrumbs$.next([createBreadcrumb(
      act.name ?? this.route.snapshot.data.title,
      this.actId ? `${NavPath.ORIGINALS_ACTS}/${this.actId}` : null,
      'folder_open',
    )]);
  }

  private createInfoTags() {
    combineLatest([
      this.dictionariesFacadeService.contractStatuses$,
      this.form.controls.common.controls.contractStatus.valueChanges
        .pipe(startWith(this.form.controls.common.controls.contractStatus.value)),
    ])
      .pipe(
        filter(([statusDictionary]) => statusDictionary !== null),
        map(([statusDictionary, status]) => statusDictionary.find((item) => item.code === status)),
      )
      .subscribe((status) => {
        this.infoTags$.next([{
          title: 'Статус документа',
          value: status.name.toUpperCase(),
          color: status.color,
        }]);
      });
  }

  private initFormListeners() {
    this.form.statusChanges.pipe(
      filter(() => this.tab.edited !== this.form.dirty),
      takeUntil(this.destroyed$),
    ).subscribe(() => this.setTabEdited(this.form.dirty));
  }
}
