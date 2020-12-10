import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @ViewChild('urlElement') urlElement: ElementRef;

    urlValue = "";
    isLoading: boolean = false;

    constructor(private httpService: HttpService) { }

    ngOnInit(): void {
        setTimeout(() => {
            this.urlElement.nativeElement.focus();
        }, 300);
    }

    async onDownloadClick(event: any) {
        if (this.urlValue.includes('youtube')) {
            this.isLoading = true;
            const requestBody = {
                "videoUrl": this.urlValue
            }
            this.httpService.downloadUrlLinkRequest(requestBody).subscribe(result => {
                const downloadUrl = result["videoDownloadUrl"];
                window.open(downloadUrl, "_blank");
                this.isLoading = false;
                this.urlValue = "";
            }, (error) => {
                this.urlValue = "";
                this.isLoading = false;
                console.error(error);
            });
        }
    }

}
