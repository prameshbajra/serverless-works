import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpService } from 'src/app/http.service';

@Component({
    selector: 'app-video-card',
    templateUrl: './video-card.component.html',
    styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {

    @Input('videoEntities') videoEntities;
    @Input('videoUrl') videoUrl;
    
    videoSelectControl = new FormControl();
    isLoading: boolean = false;
    errorMessage: string = "";
    videoGroups: any[] = [];

    constructor(private httpService: HttpService) { }

    ngOnInit(): void {
        this.initiateVideoGroups();
        this.populateDefaultValues();
    }

    public isErrorPresent(): boolean {
        try {
            if (this.errorMessage.length > 0) return true;
            return false;
        } catch (error) {
            return false;
        }
    }

    public initiateVideoGroups(): void {
        this.videoGroups = [{ name: 'Video', options: [] }]
        this.videoEntities.resolution.map(res => {
            this.videoGroups[0]['options'].push({ value: res, viewValue: res })
        });
        // When audio feature is released...
        // this.videoGroups.push({
        //     name: 'Audio',
        //     options: [
        //         { value: 'mp3', viewValue: 'audio (mp3/m4a)' }
        //     ]
        // });
    }

    public populateDefaultValues(): void {
        this.videoSelectControl.setValue(this.videoGroups[0]['options'][0].value);
    }

    public downloadVideo(): void {
        this.isLoading = true;
        const selectedQuality = this.videoSelectControl.value;
        const requestBody = {
            "videoUrl": this.videoUrl,
            "downloadResolution": selectedQuality
        };
        this.httpService.downloadUrlLinkRequest(requestBody).subscribe((response) => {
            this.isLoading = false;
            window.open(response.videoDownloadUrl);
        }, (error) => {
                this.isLoading = false;
                this.errorMessage = "Sorry, this video is restricted from YouTube and cannot be downloaded.";
            console.error(error);
        });
    }
}

