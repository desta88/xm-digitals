import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionWhyusComponent } from './section-whyus.component';

describe('SectionWhyusComponent', () => {
  let component: SectionWhyusComponent;
  let fixture: ComponentFixture<SectionWhyusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionWhyusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionWhyusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
