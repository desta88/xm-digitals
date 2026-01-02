import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDarkComponent } from './hero-dark.component';

describe('HeroComponent', () => {
  let component: HeroDarkComponent;
  let fixture: ComponentFixture<HeroDarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
