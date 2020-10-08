import { NgModule } from '@angular/core';
import { MenuListComponent } from './menu-list/menu-list';
import { AboutComponent } from './about/about';
@NgModule({
	declarations: [MenuListComponent,
    AboutComponent],
	imports: [],
	exports: [MenuListComponent,
    AboutComponent]
})
export class ComponentsModule {}
