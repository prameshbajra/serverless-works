import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { VideoCardComponent } from './video-card/video-card.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        trigger('slideInOut', [
            transition(':enter', [
                style({ transform: 'translateY(-50%)' }),
                animate('500ms ease-in', style({ transform: 'translateY(0%)' }))
            ]),
            transition(':leave', [
                animate('500ms ease-in', style({ transform: 'translateY(-50%)' }))
            ])
        ])
    ]
})

export class HomeComponent implements OnInit {

    @ViewChild(VideoCardComponent) videoCardComponent;
    @ViewChild('urlElement') urlElement: ElementRef;

    urlValue = "";
    isLoading: boolean = false;
    errorMessage: string = "";
    videoEntities: any = {};

    constructor(private httpService: HttpService) { }

    ngOnInit(): void {
        setTimeout(() => {
            this.urlElement.nativeElement.focus();
        }, 300);
    }

    isErrorPreset(): boolean {
        return this.errorMessage.length > 0;
    }

    checkForAlternativeYoutubeLinks(): void {
        // If the link is a sharable link of some kind ...
        try {
            if (this.urlValue.includes("youtu.be")) {
                const videoId = this.urlValue.slice(this.urlValue.lastIndexOf("/") + 1);
                this.urlValue = `https://www.youtube.com/watch?v=${videoId}`;
            }
        } catch (error) {
            console.error(error);
        }
    }

    onGoClick() {
        const youtubeRegex = new RegExp("^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+");
        if (youtubeRegex.test(this.urlValue)) {
            this.checkForAlternativeYoutubeLinks();
            this.isLoading = true;
            const requestBody = {
                "videoUrl": this.urlValue
            }
            this.httpService.getVideoEntities(requestBody).subscribe(result => {
                this.isLoading = false;
                this.videoEntities["videoName"] = result["video_name"];
                this.videoEntities["resolution"] = result["all_resolutions"];
                if (this.videoCardComponent) {
                    this.videoCardComponent.initiateVideoGroups();
                    this.videoCardComponent.populateDefaultValues();
                }
            }, (error) => {
                this.urlValue = "";
                    this.errorMessage = "OOPS! It seems like you cannot download that video. It is restricted from Youtube.";
                    this.isLoading = false;
            });
        } else {
            this.errorMessage = "Please enter a valid Youtube URL."
        }
        setTimeout(() => {
            this.errorMessage = "";
        }, 7000)
    }

    isDownloadPrepared(): boolean {
        try {
            if (this.videoEntities.resolution.length > 0) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }
}
