import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Evaluation } from '../class/evaluation';
import { CheckLogin } from '../class/check-login';
import { Organisation } from '../class/organisation';
import { SituationTravail } from '../class/situation-travail';
import { SearchMetier } from '../class/search-metier';
import { CurrentMetier } from '../class/current-metier';

@Injectable()
export class MetierService {
  requests = [];
  res = null;
  error = null;


  //constructor
  constructor(private http: Http) { }
  //API URI
  private baseURL = 'http://dev-api.preventionbtp.fr/api/'

  //header


  getLoginToken(login: string, pass: string) {
    let body = new FormData();
    body.append('_username', login);
    body.append('_password', pass);
    return this.http
      .post(this.baseURL + 'login_check', body)
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  getListSTByGroup(token: string, organizationId): Promise<SituationTravail[]> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseURL + 'classe_situation_travails?myRepository=' + organizationId + '&order[code]=asc', options)
      .toPromise()
      .then(response => response.json()["hydra:member"] as SituationTravail[])
      .catch(this.handleError);//handle exceptions
  }

  search(term: string, token): Observable<SearchMetier[]> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get(this.baseURL + 'metier_synonymes?search=' + term, options)
      .map(response => response.json()["hydra:member"] as SearchMetier[]);
  }

  getCurrentMetier(token, evaluationId): Promise<CurrentMetier[]> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseURL + 'evaluations/' + evaluationId + '/metiers', options)
      .toPromise()
      .then(response => response.json()["hydra:member"] as CurrentMetier[])
      .catch(this.handleError);//handle exceptions
  }

  addMetier(token, evaluationId, metierId) {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });
    let data = {}
    let body = JSON.stringify(data);
    return this.http.put(this.baseURL + 'evaluations/' + evaluationId + '/metiers/' + metierId, body, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);//handle exceptions
  }

  deleteMetier(token, evaluationId, metierId) {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.baseURL + 'evaluations/' + evaluationId + '/metiers/' + metierId, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);//handle exceptions
  }

  createCustomMetier(token: string, name, stArray,evaluationId) {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      "name": name,
      "situationsTravails":stArray
    }
    let body = JSON.stringify(data);
    return this.http.post(this.baseURL + 'evaluations/'+evaluationId+'/metiers', body, options)
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handleError);//handle exceptions
  }


  checkUser(token: string): Promise<CheckLogin> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseURL + 'check_user', options)
      .toPromise()
      .then(response => response.json().data as CheckLogin)
      .catch(this.handleError);//handle exceptions

  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
