import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { RouterTestingModule } from '@angular/router/testing';
import { TopBarComponent } from './core/topbar/topbar.component';
import { SideBarComponent } from './core/sidebar/sidebar.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        TopBarComponent,
        SideBarComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
