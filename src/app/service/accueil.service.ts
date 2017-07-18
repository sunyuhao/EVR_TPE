import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';

import { Evaluation } from '../class/evaluation';
import { CheckLogin } from '../class/check-login';
import { Organisation } from '../class/organisation'

@Injectable()
export class AccueilService {
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
  // getEvaluations for one organnization
  getEvaluations(token: string, organizationId: string): Promise<Evaluation[]> {

    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseURL + 'evaluations?organizationId=' + organizationId, options)
      .toPromise()
      .then(response => response.json()["hydra:member"] as Evaluation[])
      .catch(this.handleError);//handle exceptions

  }
  // getAllEvaluations for multi organnization
  getAllEvaluations(token: string): Promise<Evaluation[]> {

    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseURL + 'evaluations', options)
      .toPromise()
      .then(response => response.json()["hydra:member"] as Evaluation[])
      .catch(this.handleError);//handle exceptions

  }
  // getOneEvaluation by ID
  getOneEvaluation(token: string, evaluationId: string): Promise<Evaluation> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseURL + 'evaluations/' + evaluationId, options)
      .toPromise()
      .then(response => response.json() as Evaluation)
      .catch(this.handleError);//handle exceptions
  }

  getOrganisations(token: string): Promise<Organisation[]> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.baseURL + 'groups', options)
      .toPromise()
      .then(response => response.json()["hydra:member"] as Organisation[])
      .catch(this.handleError);//handle exceptions
  }

  createEvaluationByExist(token: string, name, organizationId, evaluationId): Promise<Evaluation> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      "name": name,
      "organizationId": organizationId,
      "evaluationSourceId": evaluationId
    }
    let body = JSON.stringify(data);
    return this.http.post(this.baseURL + 'evaluations/duplicate', body, options)
      .toPromise()
      .then(response => response.json() as Evaluation)
      .catch(this.handleError);//handle exceptions
  }

  createEvaluation(token: string, name, mode, organizationId): Promise<Evaluation> {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });
    let data = {
      "name": name,
      "mode": mode,
      "organizationId": organizationId
    }
    let body = JSON.stringify(data);
    return this.http.post(this.baseURL + 'evaluations', body, options)
      .toPromise()
      .then(response => response.json() as Evaluation)
      .catch(this.handleError);//handle exceptions
  }

  deleteEvaluation(token: string, evaluationId: number) {
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    headers.append('Content-Type', 'application/ld+json');
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.baseURL + 'evaluations/' + evaluationId, options)
      .toPromise()
      .then(response => response.json())
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
