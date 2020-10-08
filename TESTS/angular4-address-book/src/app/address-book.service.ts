import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/Rx";

@Injectable()
export class AddressBookService {
  constructor(private http: Http) {}

  getAddressBook() {
    return this.http
      .get("https://jmk-address-book.firebaseio.com/address.json")
      .map(res => res.json());
  }

  getSingleItem(id) {
    return this.http
      .get(`https://jmk-address-book.firebaseio.com/address/${id}.json`)
      .map(res => res.json());
  }

  postAddressBook(body) {
    return this.http
      .post("https://jmk-address-book.firebaseio.com/address.json", body)
      .map(res => console.log(res));
  }

  updateAddressBook(body, id) {
    return this.http
      .put(`https://jmk-address-book.firebaseio.com/address/${id}.json`, body)
      .map(res => console.log(res));
  }

  deleteAddressBook(id) {
    return this.http
      .delete(`https://jmk-address-book.firebaseio.com/address/${id}.json`)
      .map(res => console.log(res));
  }
}
