import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

// Example of a custom Data Type for our Notes model
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
}

/**
 * Statefull service which provides an Observable-based API with Observable Data
 *
 * Main Features:
 * 1. Statefull:
 * - This service is statefull and exposes a state variable which is the Observable called user$
 *
 * 2. Observable-based API:
 * - For any component which is using this service, the service ensures isolation
 *   from how the data is retrieved - in this case, Angular HTTP service.
 *
 * When to use:
 * - when we want service act as a permanent storage for our fetched data
 *
 *
 * Example usage:
 *
 * @Component({
 *   selector: 'home',
 *   template: `
 *     <div class='main'>
 *         <user-detail  [user]="user$ | async"></user-detail>
 *      </div>`
 + })
 * public class HomeComponent {
 *   user$: Observable<User>
 *   constructor(private userService: StatefullObservableDataService) {
 *     this.user$ = userService.user$;
 *   }
 * }
 *
 */
@Injectable()
export class StatefullObservableDataService {
  static API_URL = `/api/v1/user/`;

  // Subject implements Observer and the Observable interfaces.
  // This means we can emit values and also use it as an Observable.
  // In the following case our subject is a Behavior Subject, meaning it stores the
  // last value emitted and sends it immediately upon subscription.
  private subject: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  // Our Observable data which is exposed as a state variable.
  // This Observable is derived from a Subject, and a filter is
  // applied to prevent the null value from being propagated.
  public user$: Observable<User> = this.subject.asObservable().filter(user => !!user);

  constructor(private http: Http) {
    // The user data is retrieved from the backend using the HTTP service.
    // Once the data is available, we emit a new value of the subject.
    this.getUserInfo()
      .subscribe((user: User) => this.subject.next(user));
  }

  /**
   * Get user information from backend API service
   *
   * @return {Observable<User>}
   */
  private getUserInfo(): Observable<User> {
    return this.http
      .get(StatefullObservableDataService.API_URL)
      .map((res: Response) => res.json());
  }

}
