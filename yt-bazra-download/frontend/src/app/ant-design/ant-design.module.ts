import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NzGridModule,
        NzIconModule,
        NzLayoutModule
    ],
    exports: [
        NzGridModule,
        NzIconModule,
        NzLayoutModule
    ]
})
export class AntDesignModule { }
