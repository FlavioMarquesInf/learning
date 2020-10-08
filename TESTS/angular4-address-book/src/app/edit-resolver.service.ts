import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { singleItem } from "./singleItem.model";
import { Observable } from "rxjs/Observable";
import { AddressBookService } from "./address-book.service";

@Injectable()
export class EditResolverService implements Resolve<singleItem> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<singleItem> | Promise<singleItem> | singleItem {
    return this.addressBookService.getSingleItem(route.params.id);
  }

  constructor(private addressBookService: AddressBookService) {}
}
