import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule
    ]
})
export class MaterialModule { }
