import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilizationService {

  baseUrl = 'https://utilization-service.apps.pcf.dti.co.id/utilization';

  constructor(private http: HttpClient) { }

  private listeners = new Subject<any>();
  private listenerId = new Subject<any>();

  listen(): Observable<any>{
    return this.listeners.asObservable();
  }

  filter(filterBy: string){
    this.listeners.next(filterBy);
  }

  getChannel(): Observable<any>{
    return this.http.get<any>(this.baseUrl + '/channel')
  }

  postChannel(postChannelReq){
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<any>(this.baseUrl + '/channel', postChannelReq, {headers:headers})
  }

  deleteChannel(channelId){
    return this.http.delete<any>(this.baseUrl + '/channel/' + channelId)
  }

  /////////////////////////////////////////////////
  getChannelService(channelId): Observable<any>{
    return this.http.get<any>(this.baseUrl + '/channelservice/' + channelId)
  }
}
