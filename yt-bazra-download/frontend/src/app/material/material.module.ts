import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatButtonModule,
        MatInputModule,
    ],
    exports: [
        MatButtonModule,
        MatInputModule
    ]
})
export class MaterialModule { }
