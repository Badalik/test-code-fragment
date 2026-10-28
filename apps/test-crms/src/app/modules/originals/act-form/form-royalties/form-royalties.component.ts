import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DestroyService } from '@test-ui/src/cdk';

import {
  ActContractUnitsRoyaltiesComponent
} from '../../act-contract-units-royalties/act-contract-units-royalties.component';

@Component({
  selector: 'test-crms-act-form-royalties',
  templateUrl: 'form-royalties.component.html',
  styleUrls: ['form-royalties.component.scss'],
  providers: [DestroyService],
  imports: [
    ActContractUnitsRoyaltiesComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActFormRoyaltiesComponent {}
