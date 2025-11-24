import {computed, Injectable, signal} from '@angular/core';
import {Formation} from '../../model/Formation';
import {UUID, uuid} from '../../shared/uuid';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private readonly catalog = signal<Formation[]>([
    {
      id: uuid(),
      title: 'Angular - premiers pas',
      description: 'Fais tes premiers pas avec Angular',
      location: 'EPHEC',
      date: new Date("2025-09-20T10:30:00"),
      time: '18:00 - 21:00',
      price : 150,
      placeMax : 25,
      tags: ['Angular', 'TypeScript'],
      distance: 10
    },
    {
      id: uuid(),
      title: 'Java - Springboot',
      description: 'Découvrez Springboot',
      location: 'Remote',
      date: new Date("2026-01-10T10:30:00"),
      time: '14:00 - 17:00',
      price : 250,
      placeMax : 45,
      tags: ['Java', 'Springboot'],
      distance: 35
    }
  ]);

  constructor() {
  }

  getCatalog = this.catalog.asReadonly()

  formationCount = computed(() => {
    return this.catalog().length;
  });

  getFormation(formationId: UUID): Formation {
    let formation = this.catalog().find(f => f.id === formationId);
    if (!formation) {
      throw new Error(`Formation with id ${formationId} not found`);
    }
    return formation;
  }

  addFormation(formation: Formation) {
    this.catalog.update(c => [...c, formation]);
  }

  removeFormation(formation: Formation) {
    this.catalog.update(c => c.filter(f => f.id !== formation.id));
  }
}
