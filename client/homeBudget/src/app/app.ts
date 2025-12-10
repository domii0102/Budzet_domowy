import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainView } from './main-view/main-view';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainView],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Budżet domowy');
}
