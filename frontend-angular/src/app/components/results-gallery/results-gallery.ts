import { Component, Input } from '@angular/core';
import { CullerResponse } from '../../services/culler';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-results-gallery',
  imports: [DecimalPipe],
  templateUrl: './results-gallery.html',
  styleUrl: './results-gallery.scss',
})
export class ResultsGallery {
  @Input() evaluations: CullerResponse[] = [];
}
