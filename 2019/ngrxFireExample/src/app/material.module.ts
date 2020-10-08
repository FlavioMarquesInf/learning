import { NgModule } from '@angular/core';
import { MatButtonModule, MatSelectModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule
    ]
})
export class MaterialModule {}
