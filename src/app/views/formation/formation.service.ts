import {computed, Injectable, signal} from '@angular/core';
import {Formation} from '../../model/Formation';
import {UUID} from '../../shared/uuid';

interface FormationDTO {
  id: UUID;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  price: string;
  placeMax: string;
  tags: string[];
  distance: string;
}


@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private readonly catalog = signal<Formation[]>([]);

  constructor() {
    this.fetchFormations();
  }

  private fetchFormations() {
    fetch('http://localhost:8080/formations')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse JSON body
      })
      .then((data: FormationDTO[]) => {
        this.catalog.set(data.map(f => {
          return {
            ...f,
            date: new Date(f.date),
            price: parseFloat(f.price),
            placeMax: parseInt(f.placeMax, 10),
            distance: Math.floor(Math.random() * 100)
          }
        }));
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
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
