import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AddressBookService } from "../../address-book.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-add-new",
  templateUrl: "./add-new.component.html",
  styleUrls: ["./add-new.component.css"]
})
export class AddNewComponent implements OnInit {
  @Input() singleItemPost = {
    id: "",
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "", lng: "" }
    },
    phone: "",
    website: "",
    company: { name: "", catchPhrase: "", bs: "" }
  };

  @Output() showAddressBook = new EventEmitter<any>();

  constructor(
    private addressBookService: AddressBookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  postAddressBook(formRef) {
    this.addressBookService
      .postAddressBook(JSON.stringify(this.singleItemPost))
      .subscribe(res => {
        this.showAddressBook.emit();
        formRef.reset();
      });
  }

  updateAddressBook() {
    this.addressBookService
      .updateAddressBook(
        JSON.stringify(this.singleItemPost),
        this.route.snapshot.params.id
      )
      .subscribe(res => {
        this.router.navigate([""]);
      });
  }

  onSubmit(formRef) {
    if (this.route.snapshot.url.toString().includes(`edit`)) {
      // console.log("put");
      this.updateAddressBook();
    } else {
      // console.log("post");
      this.postAddressBook(formRef);
    }
  }

  ngOnInit() {
    if (this.route.snapshot.url.toString().includes(`edit`)) {
      this.route.data.subscribe(
        data => (this.singleItemPost = JSON.parse(JSON.stringify(data.edit)))
      );
    }
  }
}
