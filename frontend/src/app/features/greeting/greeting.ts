import { Component , signal} from '@angular/core';

@Component({
  imports: [],
  selector: 'app-greeting',
  styleUrl: './greeting.css',
  templateUrl: './greeting.html',
})
export class Greeting {
   name = signal('Natasha');
}
