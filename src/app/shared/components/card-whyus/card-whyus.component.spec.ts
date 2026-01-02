import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWhyusComponent } from './card-whyus.component';

describe('CardWhyusComponent', () => {
  let component: CardWhyusComponent;
  let fixture: ComponentFixture<CardWhyusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardWhyusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardWhyusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
