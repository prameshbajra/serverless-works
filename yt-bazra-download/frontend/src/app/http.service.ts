import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private BACKEND_URL = "https://kmi3qdcq3b.execute-api.ap-south-1.amazonaws.com/dev/";

    constructor(private http: HttpClient) { }

    public getVideoEntities(requestBody: any): Observable<any> {
        return this.http.post(`${this.BACKEND_URL}getVideoEntities`, requestBody);
    }

    public downloadUrlLinkRequest(requestBody: any): Observable<any> {
        return this.http.post(`${this.BACKEND_URL}downloadThisUrl`, requestBody);
    }
}
