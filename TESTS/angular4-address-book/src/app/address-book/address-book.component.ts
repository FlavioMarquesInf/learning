import { Component, OnInit } from "@angular/core";
import { AddressBookService } from "../address-book.service";

@Component({
  selector: "app-address-book",
  templateUrl: "./address-book.component.html",
  styleUrls: ["./address-book.component.css"]
})
export class AddressBookComponent implements OnInit {
  addressBook: any[] = [];
  filteredBook: any[] = [];

  search: string = "";

  constructor(private addressBookService: AddressBookService) {}

  showAddressBook() {
    this.addressBookService.getAddressBook().subscribe(res => {
      if (res !== null) {
        let getAddressBooks = [];
        for (let arr in res) {
          const newArr = Object.assign({}, res[arr], { id: arr });
          getAddressBooks.push(newArr);
        }
        this.addressBook = getAddressBooks;
      } else {
        this.addressBook = [];
      }
    });
  }

  onSearch(searchPhrase) {
    this.search = searchPhrase.value;
    const copy = this.addressBook.slice();
    const filtered = copy.filter(
      arr =>
        arr.name.includes(this.search) ||
        arr.email.includes(this.search) ||
        arr.phone.includes(this.search) ||
        arr.username.includes(this.search) ||
        arr.website.includes(this.search) ||
        arr.address.city.includes(this.search) ||
        arr.address.street.includes(this.search) ||
        arr.address.suite.includes(this.search) ||
        arr.address.zipcode.includes(this.search) ||
        arr.company.name.includes(this.search) ||
        arr.company.bs.includes(this.search) ||
        arr.company.catchPhrase.includes(this.search)
    );
    console.log(filtered);
    this.filteredBook = filtered;
  }

  // post() {
  //   this.addressBookService
  //     .postAddressBook(this.addressBook)
  //     .subscribe(res => console.log(res));
  // }

  ngOnInit() {
    this.showAddressBook();
  }
}
