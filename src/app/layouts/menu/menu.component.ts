import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


    @Output() changeRoute: EventEmitter<any>;

    constructor() {
        this.changeRoute = new EventEmitter();
    }
    ngOnInit() {
    }


    onChangeRoute() {
        this.changeRoute.emit();
    }
}
