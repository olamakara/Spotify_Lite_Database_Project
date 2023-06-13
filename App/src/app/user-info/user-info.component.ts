import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user_id: string = "6463e6e93b305948b58fc23f";

  user: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.http.get(`http://localhost:3000/users/${this.user_id}`).subscribe(data => {
      this.user = data;
    });
  }

}
