import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// importe os componentes standalone
import { Header } from './core/header/header';
import { Menu } from './core/menu/menu';
import { Footer } from './core/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Menu,
    Footer
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('cadastro-pessoa-frontend');
}
