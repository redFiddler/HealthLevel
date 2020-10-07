import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'assignment';

	constructor(private router: Router){

	}

	isRouteActive(route) {
		let spliURL = this.router.url.split('/');
		return spliURL[1] == route
	}
}
