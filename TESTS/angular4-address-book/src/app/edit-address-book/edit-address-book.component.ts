import { Component, OnInit } from "@angular/core";
import { singleItem } from "../singleItem.model";
import { AddressBookService } from "../address-book.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-edit-address-book",
  templateUrl: "./edit-address-book.component.html",
  styleUrls: ["./edit-address-book.component.css"]
})
export class EditAddressBookComponent implements OnInit {
  singleItem: singleItem;

  constructor(
    private addressBookService: AddressBookService,
    private location: Location
  ) {}

  onBack() {
    this.location.back();
  }

  ngOnInit() {}
}
