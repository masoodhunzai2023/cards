import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  selectedCard: any;
  sidebarCards:any= [];
  sidebarVisible = false;
  showOptions = false;
  showForm = false;
  cardValueDescription:any;
  cardValue:any;
  icon:any;
  isPopupVisible = false;
  cardData: any[] = [];
   url:any = 'http://localhost:3000/configuration';
  menuItems = ['Normal Card', 'Graphical Card'];
 
  constructor( private http: HttpClient) {}
  ngOnInit(): void {
    this.retrieveCardData();
  }
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
  retrieveCardData(): void {
    this.http.get(this.url).subscribe(
      (response: any) => {
        this.cardData = response ? response : [];
        this.populateSidebarCards();
      },
      error => {
        console.error('Failed to retrieve card data:', error);
      }
    );
  }

  populateSidebarCards(): void {
    this.cardData.forEach((card:any)=>{
      this.sidebarCards.push(card)
    });
  }
  showDetails(item: any) {
    this.icon=item.icon;
    item.url.forEach((val:any)=>{
     this.cardValueDescription=val.valueDescription;
     this.cardValue=val.value;
     
    this.isPopupVisible = true;
    });
    
  }

  hideDetails() {

    this.isPopupVisible = false;
  }
}
