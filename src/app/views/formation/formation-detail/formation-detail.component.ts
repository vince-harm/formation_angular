import {Component, inject, Signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormationService} from '../formation.service';
import {Formation} from '../../../model/Formation';
import {DatePipe} from '@angular/common';
import {FormationTagsComponent} from '../formation-tags/formation-tags.component';

@Component({
  selector: 'app-formation-detail',
  imports: [
    DatePipe,
    FormationTagsComponent
  ],
  templateUrl: './formation-detail.component.html',
  styleUrl: './formation-detail.component.css'
})
export class FormationDetailComponent {
  route = inject(ActivatedRoute)
  formationService = inject(FormationService);
  formationId = this.route.snapshot.paramMap.get('id')!;
  formation: Formation = this.formationService.getFormation(this.formationId);

}
