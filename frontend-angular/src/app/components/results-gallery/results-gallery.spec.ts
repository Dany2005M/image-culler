import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsGallery } from './results-gallery';

describe('ResultsGallery', () => {
  let component: ResultsGallery;
  let fixture: ComponentFixture<ResultsGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsGallery],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsGallery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
