import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-video-card',
    templateUrl: './video-card.component.html',
    styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {

    videoSelectControl = new FormControl();
    @Input('videoEntities') videoEntities;

    videoGroups: any[] = [
        {
            name: 'Video',
            options: [
                { value: '144p', viewValue: '144p' },
                { value: '360p', viewValue: '360p' },
                { value: '480p', viewValue: '480p' },
                { value: '720p', viewValue: '720p' },
                { value: '1080p', viewValue: '1080p' }
            ]
        },
        {
            name: 'Audio',
            options: [
                { value: 'mp3', viewValue: 'audio (mp3/m4a)' }
            ]
        }
    ];

    constructor() { }

    ngOnInit(): void {
        console.log(this.videoEntities);
    }


}
