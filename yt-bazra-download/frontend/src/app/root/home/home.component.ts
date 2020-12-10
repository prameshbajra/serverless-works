import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @ViewChild('urlElement') urlElement: ElementRef;

    urlValue = "";

    constructor() { }

    ngOnInit(): void {
        setTimeout(() => {
            this.urlElement.nativeElement.focus();
            navigator.clipboard.readText().then(text => {
                this.urlValue = text;
            }).catch(err => {
                console.error('Failed to read clipboard contents: ', err);
            });
        }, 300);
    }

    async onDownloadClick(event: any) {
        console.log(event);
        console.log(this.urlValue);
    }

}
