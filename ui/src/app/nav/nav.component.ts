import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LightzaneHttpService } from '../services/lightzane-http.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  isServerAvailable: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly service: LightzaneHttpService
  ) {}

  ngOnInit() {
    // check if server is available
    this.service.testServer().subscribe((res) => {
      if (res) this.isServerAvailable = true;
    });
  }

  // triggers upon click on specified element
  @ViewChild('drawer') drawer: any;
  // if in mobile (mode is detected as push)
  // will automatically close the drawer upon clicking
  closeDrawer() {
    if (this.drawer._mode == 'push') {
      this.drawer.close();
    }
  }
}
