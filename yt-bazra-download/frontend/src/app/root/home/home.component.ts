import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateY(-100%)' }),
                animate('500ms ease-in', style({ transform: 'translateY(0%)' }))
            ]),
            transition(':leave', [
                animate('500ms ease-in', style({ transform: 'translateY(-100%)' }))
            ])
        ])
    ]
})
export class HomeComponent implements OnInit {

    @ViewChild('urlElement') urlElement: ElementRef;

    urlValue = "";
    isLoading: boolean = false;
    errorMessage: string = "";

    constructor(private httpService: HttpService) { }

    ngOnInit(): void {
        setTimeout(() => {
            this.urlElement.nativeElement.focus();
        }, 300);
    }

    isErrorPreset(): boolean {
        return this.errorMessage.length > 0;
    }

    async onDownloadClick(event: any) {
        this.errorMessage = "";
        const youtubeRegex = new RegExp("^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+");
        if (youtubeRegex.test(this.urlValue)) {
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
        } else {
            this.errorMessage = "Please enter a valid Youtube URL."
        }
    }

}
