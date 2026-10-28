import { ChangeDetectionStrategy, Component } from '@angular/core';

import { DestroyService } from '@test-ui/src/cdk';

import {
  ActContractUnitsObligationsComponent,
} from '../../act-contract-units-obligations/act-contract-units-obligations.component';

@Component({
  selector: 'test-crms-act-form-obligations',
  templateUrl: 'form-obligations.component.html',
  styleUrls: ['form-obligations.component.scss'],
  providers: [DestroyService],
  imports: [
    ActContractUnitsObligationsComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActFormObligationsComponent {}
