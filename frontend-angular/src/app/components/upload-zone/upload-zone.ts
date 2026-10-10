import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  CullerResponse } from '../../services/culler';
import { Culler } from '../../services/culler';
import { ResultsGallery } from '../results-gallery/results-gallery';

@Component({
  selector: 'app-upload-zone',
  standalone: true,
  imports: [CommonModule, ResultsGallery],
  templateUrl: './upload-zone.html',
  styleUrl: './upload-zone.scss'
})
export class UploadZoneComponent {
  private cullerService = inject(Culler);

  isDragging = signal(false);
  isProcessing = signal(false);
  results = signal<CullerResponse[]>([]);

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Prevents the browser from opening the image in a new tab
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);

    if (event.dataTransfer?.files) {
      this.processFiles(Array.from(event.dataTransfer.files));
    }
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.processFiles(Array.from(input.files));
    }
  }

  private processFiles(files: File[]) {
    if (files.length === 0) return;
    console.log('1. Starting upload. Flipping isProcessing to true.');
    this.isProcessing.set(true);

    this.cullerService.evaluateBatch(files).subscribe({
      next: (response) => {
        console.log('2. Success! Data caught by Angular:', response);
        this.results.set(response);
        this.isProcessing.set(false);
      },
      error: (error) => {
        console.error('Failed to process images:', error);
        this.isProcessing.set(false);
      }
    });
  }
}
