import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AssignmentOneComponent } from './assignment-one/assignment-one.component';
import { AssignmentTwoMaterialComponent } from './assignment-two-material/assignment-two-material.component';
import { PostDetailComponent } from './post-detail/post-detail.component'
import { CommonDialogComponent } from './common-dialog/common-dialog.component';

// plugins..
import { CookieService } from 'ngx-cookie-service';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";


// material modules..
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';



const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/assignment1' },
	{ path: 'assignment1', component: AssignmentOneComponent },
	{ path: 'assignment2', component: AssignmentTwoMaterialComponent },
	{ path: 'post-details/:post_id/:user_id', component: PostDetailComponent }
]

@NgModule({
	declarations: [
		AppComponent,
		AssignmentOneComponent,
		AssignmentTwoMaterialComponent,
		PostDetailComponent,
		CommonDialogComponent	
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		RouterModule.forRoot(routes),
		BrowserAnimationsModule,
		MatTableModule,
		MatPaginatorModule,
		MatDialogModule,
		MatButtonModule,
		MatInputModule,
		MatSelectModule,
		MatIconModule,

		ToastrModule.forRoot(),
		NgxSpinnerModule
	],
	providers: [CookieService],
	bootstrap: [AppComponent],
	entryComponents: [
		CommonDialogComponent
	]
})
export class AppModule { }
