import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Example of a custom Data Type for our Notes model
export interface Note {
  title: string;
  body: string;
  author: string;
}

/**
 * Stateless service which provides an Observable-based API
 *
 * Main Features:
 * 1. Statelessnes:
 * - It has no member variables for holding data.
 *
 * 2. Observable-based API:
 * - All methods return Observables of a custom data type (e.g. `Note` or `Note[]`).
 * - For any component which is using this service, the service ensures isolation
 *   from how the data is retrieved - in this case, Angular HTTP service.
 *
 * When to use:
 * - for example: CRUD interaction with a RESTful API backend.
 * - very simple usage (e.g. get some data from the backend API and pass it to the View Layer)
 * - no advanced features (e.g. caching responses from APIs inside service)
 *
 *
 * Example usage:
 *
 * @Component({
 *   selector: 'home',
 *   template: `
 *     <div class='main'>
 *         <note-detail *ngIf="isLoaded" [note]="note"></note-detail>
 *     </div>`
 * })
 * public class HomeComponent {
 *   public note: Note;
 *   public isLoaded: boolean = false;
 *
 *   constructor(private noteService: StatelessObservableService) {
 *     this.is
 *     this.noteService.findOne(1)
 *       .subscribe((note: Note) => {
 *         this.isLoaded = true;
 *         this.note = note;
 *       }, (error) => {
 *         this.isLoaded = false;
 *         console.log(`Could not load note  ${error}`);
 *       });
 *   }
 * }
 *
 */
@Injectable()
export class StatelessObservableService {
  static API_URL: string = '/api/v1/note/';

  constructor(private http: Http) { }

  /**
   * Get a listing of the resource.
   *
   * @returns {Observable<Note[]>}
   */
  public findAll(): Observable<Note[]> {
    return this.http
      .get(StatelessObservableService.API_URL)
      .map((res: Response) => res.json());
  }

  /**
   * Find one resource by `id`.
   *
   * @param  {string}           id
   * @return {Observable<Note>}
   */
  public findOne(id: string): Observable<Note> {
    return this.http
      .get(`{StatelessObservableService.API_URL}/id`)
      .map((res: Response) => res.json());
  }

}
