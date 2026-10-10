import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UploadZoneComponent } from './components/upload-zone/upload-zone';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UploadZoneComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend-angular');
}
