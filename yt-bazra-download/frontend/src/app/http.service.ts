import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private BACKEND_URL = "https://kmi3qdcq3b.execute-api.ap-south-1.amazonaws.com/dev/downloadThisUrl";

    constructor(private http: HttpClient) { }

    public downloadUrlLinkRequest(requestBody: any): Observable<any> {
        return this.http.post(this.BACKEND_URL, requestBody);
    }
}
