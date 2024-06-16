import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupProductoComponent } from './popup-producto.component';

describe('PopupProductoComponent', () => {
  let component: PopupProductoComponent;
  let fixture: ComponentFixture<PopupProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
