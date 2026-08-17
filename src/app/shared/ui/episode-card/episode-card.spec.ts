import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeCard } from './episode-card';
import { EPISODIOS } from '../../../core/data/episodios';

describe('EpisodeCard', () => {
  let component: EpisodeCard;
  let fixture: ComponentFixture<EpisodeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(EpisodeCard);
    fixture.componentRef.setInput('episodio', EPISODIOS[0]);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
