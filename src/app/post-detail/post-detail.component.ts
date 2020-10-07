import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// materiaL
import { MatDialog } from '@angular/material/dialog';
// models
import { APIResponse, PostModel, CommentModel } from '../common.model';
import { CommonDialogComponent } from '../common-dialog/common-dialog.component';
// services..
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

    userId: number;
    postId: number;
    postData: PostModel[] = [];
    commentsData: CommentModel[] = [];
    comments: string = '';
    httpHeaders: HttpHeaders = new HttpHeaders({
        Authorization: 'Bearer 855e570c407c4d0cc5b9332f44bbf55eb3d60e51c621febce3e46d6e33ef78ac'
    });

    constructor(private route: ActivatedRoute, private http: HttpClient, private dialog: MatDialog, private cookieService: CookieService, private toastr: ToastrService, private spinner: NgxSpinnerService) {
        // this.toastr.success('Hello world!', 'Toastr fun!');
    }

    ngOnInit(): void {
        // get param..
        this.route.params.subscribe(param => {
            this.userId = param.user_id ? param.user_id : 0;
            this.postId = param.post_id ? param.post_id : 0;

            // post..
            this.getPost()
            // comment..
            this.getComments()
        })
    }

    // get post..
    getPost() {
        // we can add in loader in interceptor
        this.spinner.show();
        this.http.get<APIResponse>('https://gorest.co.in/public-api/users/' + this.userId + '/posts').subscribe(res => {
            console.log('res', res);
            this.postData = res.data.filter(item => {
                return item.id == this.postId
            })
            this.spinner.hide();
        });
    }

    // get comments..
    getComments() {
        this.spinner.show();
        this.http.get<APIResponse>('https://gorest.co.in/public-api/posts/' + this.postId + '/comments').subscribe(res => {
            this.commentsData = res.data;
            this.spinner.hide();
        });
    }

    // open dialog..
    openDialog() {
        if (!this.cookieService.check('user_email')) {
            const dialogRef = this.dialog.open(CommonDialogComponent, {
                width: '400px',
                data: { name: '', email: '', gender: '', }
            });

            dialogRef.afterClosed().subscribe(data => {
                console.log('The dialog was closed', data);
                if (data) {
                    if (this.comments) {
                        this.spinner.show();
                        data['body'] = this.comments
                        this.http.post('https://gorest.co.in/public-api/posts/' + this.postId + '/comments', data, { headers: this.httpHeaders }).subscribe(res => {
                            this.getComments();
                            this.comments = '';
                            this.toastr.success('Comment added successfully')
                            this.spinner.hide();
                        });
                    }
                }
            });
        } else {
            this.spinner.show();
            let userPostObj = {
                email: this.cookieService.get('user_email'),
                name: this.cookieService.get('user_name'),
                body: this.comments
            }

            this.http.post('https://gorest.co.in/public-api/posts/' + this.postId + '/comments', userPostObj, { headers: this.httpHeaders }).subscribe(res => {
                this.getComments();
                this.comments = '';
                this.toastr.success('Comment added successfully');
                this.spinner.hide();
            });
        }
    }
}
