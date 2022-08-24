export default {
    //search one process
    searchprocesses: '[aria-owns="listbox-0"] > .multiselect__tags',
    selectprocesses: '#process_name_filter',
    search: 'fas fa-search',
    savesearch: 'fas fa-folder-plus',
    //For create a new save search
    nameSaveSearch: '[name="title"]',
    Save: '#save-search-modal___BV_modal_footer_ > button.btn.btn-secondary',
    //Edit a save search
    viewsearch: '[class="fas fa-table fa-lg fa-fw"]',
    //Send Report
    sendreport: '[title="Send Report"]',
    sendto: '[name="sendTo"]',
    emailsubject: '#emailSubject',
    emailbody: '#emailBody',
    send: '[class="btn btn-secondary ml-2"]',
    //scheduled reports
    scheduled: '[title="Scheduled Reports"]',
    addscheduled: '[class="btn mb-3 btn-secondary"]',
    selectday: '[aria-label="Tuesday"]',
    selecttime: '[class="form-control"]',
    selecthour: '[aria-label="Decrement"]',
    closehour: '[aria-label="Close"]',
    sendto2: '[class="form-control"]',
    subject: '[class="form-control"]',
    body: '[class="form-control"]',
    saveschedule: '[class="btn ml-3 btn-secondary"]',
    //Configurations save search
    configure: "//text()[contains(.,'Configure')]/ancestor::a[1]",
    sharedwithgroups: '#nav-groups-tab',
    saveconfiguration: '#nav-group-permissions > div.d-flex.justify-content-end.mt-3 > button.btn.btn-secondary.ml-3',

}