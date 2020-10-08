import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss']
})
export class ContactPage {
  chatUsers: any[];
  avatarImg =
    'http://cdn.fstatic.com/public/articles/files/2015/01/861f5709-5d58-4369-9706-74296136d803.jpg';

  constructor() {
    this.chatUsers = [
      {
        name: 'Flavio',
        lastMessage: 'vou pensar no caso, e aviso caso seja possivel comparecer',
        time: '18:30',
        avatarImg: this.avatarImg
      },
      {
        name: 'Maicon',
        lastMessage: 'ok',
        time: '15:26',
        avatarImg: this.avatarImg
      },
      {
        name: 'Dany',
        lastMessage: 'combinado ;)',
        time: '12:14',
        avatarImg: this.avatarImg
      },
      {
        name: 'Glaucio',
        lastMessage: 'E se vc fizer uma tela que mostre os itens alinhados lado a lado',
        time: '18:30',
        avatarImg: this.avatarImg
      }
    ];
  }

  favorite(item) {
    console.log(item);
  }

  share(item) {
    console.log(item);
  }

  unread(item) {
    console.log(item);
  }

  newChat() {
    console.log('Open friends list');
  }

  openChat(user) {
    console.log(user);
  }
}
