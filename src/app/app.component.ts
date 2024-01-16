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
import { MatRippleModule } from '@angular/material/core';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


const ICON = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="delete"><path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path></svg>`

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatTableModule, HttpClientModule, MatPaginatorModule, MatInputModule, MatFormFieldModule, MatRippleModule, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private _http: HttpClient, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.data = new MatTableDataSource()
    iconRegistry.addSvgIconLiteral('delete', sanitizer.bypassSecurityTrustHtml(ICON))
  }
  title = 'admin-ui';
  public displayedColumns: string[] = ['id', 'name', 'email', 'role'];
  private _actualData!: AdminData[];
  public data!: MatTableDataSource<AdminData>


  @ViewChild(MatPaginator) paginator!:  MatPaginator;


  ngOnInit() {
    this._http.get<AdminData[]>('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json').subscribe((res) => {
      this._actualData = res
      this.data.data = this._actualData;
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

  dispatchClick(row: AdminData) {
    this.data.data = this.data.data.filter(ele => ele.id != row.id)
  }
}
