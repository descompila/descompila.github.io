import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Patrocinadores } from './patrocinadores';

describe('Patrocinadores', () => {
  let component: Patrocinadores;
  let fixture: ComponentFixture<Patrocinadores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Patrocinadores],
    }).compileComponents();

    fixture = TestBed.createComponent(Patrocinadores);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
