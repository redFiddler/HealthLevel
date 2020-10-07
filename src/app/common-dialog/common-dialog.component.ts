import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
// material..
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// models
import { APIResponse, ErrorModel } from '../common.model';
// services..
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-common-dialog',
	templateUrl: './common-dialog.component.html',
	styleUrls: ['./common-dialog.component.css']
})
export class CommonDialogComponent implements OnInit {

	gender: string = ''
	// creating header option here..
    // but there are coomon area where we add header to each API call (Inteceptor)
    httpHeaders: HttpHeaders = new HttpHeaders({
        Authorization: 'Bearer 855e570c407c4d0cc5b9332f44bbf55eb3d60e51c621febce3e46d6e33ef78ac'
	});
	
	constructor(public dialogRef: MatDialogRef<CommonDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private cookieService: CookieService, private toastr: ToastrService) {	

	}

	ngOnInit(): void {		
	}

	checkUser() {
		this.data['gender'] = this.gender;
		this.data.status = "Active";
		this.http.post<APIResponse>('https://gorest.co.in/public-api/users', this.data, { headers: this.httpHeaders }).subscribe(res => {
			if(res.code == 201){				
				// can create in common service wher we can maintain cookie name.. for future referance..
				this.cookieService.set('user_name', res.data.name);
				this.cookieService.set('user_email', res.data.email);
				this.dialogRef.close();
			} else {
				res.data.map(item => {
					this.toastr.error(item.field + ' ' + item.message)
				})				
			}
		})
	}

}
