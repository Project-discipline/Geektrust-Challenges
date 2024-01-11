import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AdminData } from './app.interface';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatTableModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private _http: HttpClient) {}
  title = 'admin-ui';
  public displayedColumns: string[] = ['id', 'name', 'email', 'role'];
  private _actualData!: AdminData[];
  public data!: AdminData[];

  ngOnInit() {
    this._http.get<AdminData[]>('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').subscribe((res) => {
      this._actualData = res
      this.data = res
    })
  }

  triggerSearch($event: any) {
    console.log('Search Triggered')
    if ($event.target.value){
      this.data = [...this._actualData.filter(row => row.id.includes($event.target.value)), ...this._actualData.filter(row => row.name.includes($event.target.value)), ...this._actualData.filter(row => row.email.includes($event.target.value)), ...this._actualData.filter(row => row.role.includes($event.target.value))]
    }
     else {
      this.data = this._actualData;
     }
  }
}
