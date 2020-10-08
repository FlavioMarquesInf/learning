import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AddressBookComponent } from "./address-book/address-book.component";
import { EditAddressBookComponent } from "./edit-address-book/edit-address-book.component";
import { AppRoutingModule } from "./router.module";
import { HttpModule } from "@angular/http";
import { SingleItemComponent } from "./address-book/single-item/single-item.component";
import { AddressBookService } from "./address-book.service";
import { AddNewComponent } from "./address-book/add-new/add-new.component";
import { EditResolverService } from "./edit-resolver.service";

@NgModule({
  declarations: [
    AppComponent,
    AddressBookComponent,
    EditAddressBookComponent,
    SingleItemComponent,
    AddNewComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpModule, FormsModule],
  providers: [AddressBookService, EditResolverService],
  bootstrap: [AppComponent]
})
export class AppModule {}
