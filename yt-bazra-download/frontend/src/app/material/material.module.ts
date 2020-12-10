import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatTooltipModule     
    ]
})
export class MaterialModule { }
