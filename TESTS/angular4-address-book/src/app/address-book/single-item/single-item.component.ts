import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { singleItem } from "../../singleItem.model";
import { AddressBookService } from "../../address-book.service";

@Component({
  selector: "app-single-item",
  templateUrl: "./single-item.component.html",
  styleUrls: ["./single-item.component.css"]
})
export class SingleItemComponent implements OnInit {
  @Input() singleItem: singleItem;
  @Output() showAddressBooks = new EventEmitter<any>();

  constructor(private addressBookService: AddressBookService) {}

  deleteAddressBook() {
    this.addressBookService
      .deleteAddressBook(this.singleItem.id)
      .subscribe(res => {
        this.showAddressBooks.emit();
      });
  }

  ngOnInit() {
    const singleItem2 = Object.assign({}, this.singleItem, {
      website: `http://${this.singleItem.website}`
    });

    this.singleItem = singleItem2;
  }
}
