import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddressBookComponent } from "./address-book/address-book.component";
import { AddNewComponent } from "./address-book/add-new/add-new.component";
import { EditResolverService } from "./edit-resolver.service";
import { EditAddressBookComponent } from "./edit-address-book/edit-address-book.component";

const routes: Routes = [
  {
    path: "",
    component: AddressBookComponent
  },
  {
    path: "edit/:id",
    component: EditAddressBookComponent,
    resolve: { edit: EditResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
