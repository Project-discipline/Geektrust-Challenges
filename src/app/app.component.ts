import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AdminData } from './app.interface';
import {MatInputModule} from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatTableModule, HttpClientModule, MatPaginatorModule, MatInputModule, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private _http: HttpClient) {}
  title = 'admin-ui';
  public displayedColumns: string[] = ['id', 'name', 'email', 'role'];
  private _actualData!: AdminData[];
  public data!: MatTableDataSource<AdminData>


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit() {
    this._http.get<AdminData[]>('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').subscribe((res) => {
      this._actualData = res
      this.data = new MatTableDataSource(res)
    })

  }

  triggerSearch($event: any) {
    console.log('Search Triggered')
    if ($event.target.value){
      this.data.data = [...this._actualData.filter(row => row.id.includes($event.target.value)), ...this._actualData.filter(row => row.name.includes($event.target.value)), ...this._actualData.filter(row => row.email.includes($event.target.value)), ...this._actualData.filter(row => row.role.includes($event.target.value))]
    }
     else {
      this.data.data = this._actualData;
     }
  }

  ngAfterViewInit() {
    this.data.paginator = this.paginator
  }
}
