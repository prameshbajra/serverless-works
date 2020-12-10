import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NzButtonModule,
        NzGridModule,
        NzIconModule,
        NzInputModule,
        NzLayoutModule
    ],
    exports: [
        NzButtonModule,
        NzGridModule,
        NzIconModule,
        NzInputModule,
        NzLayoutModule
    ]
})
export class AntDesignModule { }
