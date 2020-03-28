import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoProComponent } from './crypto-pro.component';

describe('CryptoProComponent', () => {
  let component: CryptoProComponent;
  let fixture: ComponentFixture<CryptoProComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoProComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
