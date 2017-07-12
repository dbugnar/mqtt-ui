import { Component, OnInit } from '@angular/core';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Pagina principala',  icon: 'ti-panel', class: '' },
    { path: 'topics', title: 'Subiecte',  icon: 'ti-view-list-alt', class: '' },
];

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {


  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

    public menuItems: any[];



  public isNotMobileMenu(){
        // if($(window).width() > 991){
        //     return false;
        // }
        return true;
    }

}
