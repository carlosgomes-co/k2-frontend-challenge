import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { fade } from '@shared/animations/fade';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  animations: [fade]
})
export class RegisterComponent implements OnInit {

  /**
   * Current Page
   * 0 -> Loading
   * 1 -> Page Start
   * 2 -> About You
   * 3 -> Your Situation
   * 4 -> Your Income
   * 5 -> Result
   * 6 -> Your Request
   */
  public page = 0;

  /**npm
   * Get page value subscription
   */
  private page$: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.page$ = this.activatedRoute.data.subscribe(({ page }) => {
      this.page = page;
      console.log('page', page);
    });
  }


  public goTo(url: string): void {
    this.router.navigateByUrl(`${url}`);
  }
}
