import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';



@Component({
	selector: 'app-assignment-one',
	templateUrl: './assignment-one.component.html',
	styleUrls: ['./assignment-one.component.css']
})
export class AssignmentOneComponent implements OnInit {
	jsonValue: string = '';
	jsonFormatedValue: string = '';

	constructor(private toastr: ToastrService) { }

	ngOnInit(): void {
	}

	onInputChange(value) {
		console.log(value);
		if (value) {
			this.jsonFormatedValue = JSON.parse(value);
		} else {
			this.jsonFormatedValue = ''
		}
	}

	copyToClipBoard(elementRef) {
		elementRef.select();
		document.execCommand('copy');
		elementRef.setSelectionRange(0, 0);
		this.toastr.success('JSON copied successfully')
	}
}
