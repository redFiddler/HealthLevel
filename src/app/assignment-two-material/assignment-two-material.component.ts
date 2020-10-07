import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'

// material table datasource..
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";

// models..
import { APIResponse, PostModel, UserModel } from '../common.model';

@Component({
	selector: 'app-assignment-two-material',
	templateUrl: './assignment-two-material.component.html',
	styleUrls: ['./assignment-two-material.component.css']
})
export class AssignmentTwoMaterialComponent implements OnInit {

	// table title..
	displayedColumns: string[] = ['title', 'body', 'user_name'];
	postData: any = [];
	postDataLength: number = 0;
	// userData:any = [];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

	constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

	ngOnInit(): void {
		this.getAllUsers();
	}

	// get all user..
	getAllUsers() {
		this.spinner.show();
		this.http.get<APIResponse>('https://gorest.co.in/public-api/users').subscribe(res => {
			this.getPostData(res.data);
		})
	}

	// get post data..	
	getPostData(userData) {
		this.http.get<APIResponse>('https://gorest.co.in/public-api/posts').subscribe(res => {
			res.data.map(item => {
				let userObj:UserModel[] = userData.filter(user => user.id == item.user_id);

				console.log('userObj ', userObj);
				// 	console.log('item ', item);
				if(userObj.length){
					item["user_name"] = userObj[0].name
				} else {
					item["user_name"] = 'NA'
				}
			})
			this.configMaterialTable(res.data);
			this.spinner.hide();
		})
	}

	// load material table..
	configMaterialTable(dataSource) {
		this.postData = new MatTableDataSource<PostModel>(dataSource);
		this.postData.paginator = this.paginator;
		this.postDataLength = this.postData.data.length;
	}
}
