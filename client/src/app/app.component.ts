import { Component } from '@angular/core';
import { WebSocketSubject } from 'rxjs/internal-compatibility';
import { environment } from 'src/environments/environment';

export class Message {
  constructor(
      public content: string,
  ) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nameList = [];
  title = 'client';

  private socket$: WebSocketSubject<Message>;

  constructor(){
    this.socket$ = new WebSocketSubject(`${environment.socket_url}789`);
    this.socket$.subscribe(
      (message) => this.nameList.push(message),
      (err) => console.error(err),
      () => console.warn('Completed!')
    );
  }

  onClick(name) {
    const message = new Message(name);
    this.socket$.next(message);
  }
}
