import { Component, OnInit, Injectable } from '@angular/core';
declare var $: any;
Injectable()
export class NotificationsService implements OnInit {

    ngOnInit() { }

    constructor() { }

    showNotification(from, align, messagecontent, messagetype) {
        const type = ['', 'info', 'success', 'warning', 'danger'];
        $.notify({
            icon: "notifications",
            message: messagecontent
        }, {
                type: type[messagetype],
                timer: 2500,
                placement: {
                    from: from,
                    align: align
                }
            });
    }
}