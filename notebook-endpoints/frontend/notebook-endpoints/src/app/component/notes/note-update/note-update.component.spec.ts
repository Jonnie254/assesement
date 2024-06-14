import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteUpdateComponent } from './note-update.component';

describe('NoteUpdateComponent', () => {
  let component: NoteUpdateComponent;
  let fixture: ComponentFixture<NoteUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
