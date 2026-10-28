import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IListFilter, SearchOperator } from '@crms-model';
import { createListFilter } from '@crms-utils';
import { ITableRequestService, ITableResponseData, IVirtualTableSorting } from '@test-ui/src/lib';

import { IActBase } from '../../../common/model/act/act';
import { IActsFilter } from '../../../common/model/filters/acts-filter';
import { FilterKey } from '../../../common/model/filters/filters.enum';
import { ActService } from '../../../repository/graphql/acts/act.service';

@Injectable()
export class ActsTableDataSource implements ITableRequestService<IActBase> {
  private readonly actService = inject(ActService);

  query(
    page: number,
    pageSize: number,
    sorting: Partial<IVirtualTableSorting>,
    args: IActsFilter,
  ): Observable<ITableResponseData<IActBase>> {
    // Костыль что бы работал пагинатор, потому что он не принимает 0
    if (page) {
      --page;
    }

    return this.actService.getActs(this.buildFilterGroup(args), sorting, page, pageSize).pipe(
      map((res) => {
        return {
          limit: pageSize,
          offset: page * pageSize,
          total: res.totalCount,
          items: res.item,
        } as ITableResponseData<IActBase>;
      }),
    );
  }

  private buildFilterGroup(filter: IActsFilter): IListFilter<FilterKey> {
    return createListFilter<FilterKey>(
      filter,
      {
        [FilterKey.NAME]: SearchOperator.CONTAINS,
        [FilterKey.OWNER_NAME]: SearchOperator.CONTAINS,
        [FilterKey.IAR_SHARE_PERCENT]: SearchOperator.EQUALS,
        [FilterKey.MANAGING_OWNER_NAME]: SearchOperator.CONTAINS,
        [FilterKey.LICENSEE_ID]: SearchOperator.IN,
      },
      {},
      [FilterKey.ENTRY_DATE],
    );
  }
}
