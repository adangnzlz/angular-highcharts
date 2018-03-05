import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    @Output() toggle: EventEmitter<any>;

    constructor() {
        this.toggle = new EventEmitter();
    }
    ngOnInit() {
    }


    onToggle() {
        this.toggle.emit();
    }
}
