import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import Chart, { ChartType } from 'chart.js/auto';
import * as MedicationsAction from '../../Medication/actions';
import { selectMedications } from '../../Medication/selectors';

@Component({
  selector: 'app-dashboard',
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  store = inject(Store);
  numActive = 0;
  numPaused = 0;
  chart: Chart | undefined;

  medications$ = this.store.select(selectMedications);

  chartData = [
    { name: 'Active', value: 0 },
    { name: 'Paused', value: 0 }
  ];

  ngOnInit(): void {
    this.store.dispatch(MedicationsAction.getAllMedications());

    this.medications$.subscribe((medications) => {
      this.numActive = medications.filter(
        (medication) => medication.disabled === false
      ).length;
      this.numPaused = medications.filter(
        (medication) => medication.disabled === true
      ).length;

      if (!this.chart) {
        this.chart = new Chart('medications', {
          type: 'pie' as ChartType,
          data: {
            labels: ['Active', 'Paused'],
            datasets: [
              {
                label: 'Medications',
                data: [this.numActive, this.numPaused],
                backgroundColor: ['#5F9EA0', '#DEB887']
              }
            ]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'Medications'
              }
            },
            responsive: true
          }
        });
      } else {
        this.chart.data.datasets[0].data = [this.numActive, this.numPaused];
        this.chart.update();
      }
    });
  }
}
