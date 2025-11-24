import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Formation} from '../../../model/Formation';
import {uuid} from '../../../shared/uuid';
import {MatError, MatFormField, MatHint} from '@angular/material/form-field';
import {FormationService} from '../formation.service';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-formation-creation',
  imports: [
    MatButton,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    MatOption,
    MatSelect
  ],
  templateUrl: './formation-creation.component.html',
  styleUrl: './formation-creation.component.css'
})
export class FormationCreationComponent {

  formationService = inject(FormationService);

  form = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.maxLength(100)]),
    location: new FormControl<string>('', [Validators.required]),
    date: new FormControl<Date>(new Date(), [Validators.required]),
    time: new FormControl<string>('18:00 - 21:00', [Validators.required]),
    price: new FormControl<number>(200, [Validators.required]),
    placeMax: new FormControl<number>(30, [Validators.required]),
    description: new FormControl<string>(''),
    tags: new FormControl<string>(''),
  })


  isTitleTooLong() {
    return this.form.get('title')?.hasError('maxlength');
  }

  addFormation() {
    const formation: Formation = {
      id: uuid(),
      title: this.form.get('title')?.value!,
      location: this.form.get('location')?.value!,
      date: this.form.get('date')?.value!,
      time: this.form.get('time')?.value!,
      price : this.form.get('price')?.value!,
      placeMax : this.form.get('placeMax')?.value!,
      description: this.form.get('description')?.value || '',
      tags: this.form.get('tags')?.value ? this.extractTags() : [],
      distance: Math.random() * 100
    }

    this.formationService.addFormation(formation);
    this.form.reset();
  }

  private extractTags() {
    let tagsAsString = this.form.get('tags')?.value!;
    return tagsAsString.split(',').map(t => t.trim());
  }
}
