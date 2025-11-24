import {Component, computed, inject, signal} from '@angular/core';
import {FormationCardComponent} from '../formation-card/formation-card.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormationService} from '../formation.service';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {DistanceSliderComponent} from '../../components/distance-slider/distance-slider.component';

@Component({
  selector: 'app-formation-catalog',
  imports: [
    FormationCardComponent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatButton,
    DistanceSliderComponent
  ],
  templateUrl: './formation-catalog.component.html',
  styleUrl: './formation-catalog.component.css'
})
export class FormationCatalogComponent {

  formationService = inject(FormationService);

  textFilter = signal('')
  distanceFilter = signal(50);

  catalog = computed(() => {
    return this.formationService.getCatalog().filter(formation => {

      return formation.title.toLowerCase().includes(this.textFilter()) && formation.distance <= this.distanceFilter();
    });
  });

  resetFilter() {
    this.textFilter.set('');
    this.distanceFilter.set(50);
  }

}
