import { Requests } from "./requests";
import {Header} from "./header";
import { NavigationHelper } from "../helpers/navigationHelper";
import { Login} from "./login";
import { Tasks } from "./tasks";
import { Screens } from "./screens";
import selectors from "../selectors/process";
import { Process } from "./process";
import { SaveSearchs } from "./saveSearch";
import { Admin } from "./admin";


let navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const login = new Login();
const tasks = new Tasks();
const screen = new Screens();
const process = new Process();
const admin = new Admin();
const saveSearch = new SaveSearchs();

export class Execution {
    async actionsAndAssertionsOfTCP42282Part1(requestId){
        const number = 3;
        cy.get('div[aria-label="Date"]').click();
        cy.xpath('//tbody/tr[3]/td[7]').click();
        cy.get('input[data-cy="screen-field-input"]').type(number);
        cy.get('textarea[data-cy="screen-field-textarea"]').type("Nirvana");
        cy.xpath('(//button[@aria-label="New Submit"])[2]').click();
        login.navigateToUrl();
        login.login();
        navHelper.navigateToTasksPage();
        cy.xpath('//tbody/tr/td/a[text()="AA"]').first().click();
        cy.xpath('//li[@class="list-group-item"]/a').invoke("text").then((text) => {
            var requestName = text.trim();
            requestName = requestName.substring(
                0,
                requestName.length
            );
            cy.xpath('(//button[@aria-label="New Submit"])[2]').click();                        
            navHelper.navigateToTasksPage();
            cy.xpath('//td/a').contains(requestName).click();
            cy.xpath('(//td/a)[2]').should('contain.text', "BB").click();
            cy.xpath('(//button[@aria-label="New Submit"])[2]').click();

            navHelper.navigateToTasksPage();
            cy.xpath('//td/a').contains(requestName).click();
            cy.xpath('(//td/a)[2]').should('contain.text', "BB").click();
            cy.xpath('(//button[@aria-label="New Submit"])[2]').click();

            navHelper.navigateToTasksPage();
            cy.xpath('//td/a').contains(requestName).click();
            cy.xpath('(//td/a)[2]').should('contain.text', "BB").click();
            cy.xpath('(//button[@aria-label="New Submit"])[2]').click();

            navHelper.navigateToTasksPage();
            cy.xpath('//td/a').contains(requestName).click();
            cy.xpath('(//td/a)[2]').should('contain.text', "BB").click();
            cy.xpath('(//button[@aria-label="New Submit"])[2]').click();
            cy.wait(5000);
            cy.xpath('(//td[@aria-colindex="1"])[1]').should('contain.text', "date");
            cy.xpath('(//td[@aria-colindex="1"])[3]').should('contain.text', "input");
            cy.xpath('(//td[@aria-colindex="1"])[9]').should('contain.text', "textarea");
            cy.xpath('(//td[@aria-colindex="2"])[3]').should('contain.text', number);
            cy.xpath('(//td[@aria-colindex="2"])[9]').should('contain.text', "Nirvana");

            });        
    }
    
    async actionsAndAssertionsOfTCP42282Part2(requestId){
        const number = 5;
        cy.get('div[aria-label="Date"]').click();
        cy.xpath('//tbody/tr[3]/td[7]').click();
        cy.get('input[data-cy="screen-field-input"]').type(number);
        cy.get('textarea[data-cy="screen-field-textarea"]').type("Nirvana");
        cy.xpath('(//button[@aria-label="New Submit"])[2]').click();
        login.navigateToUrl();
        login.login();
        navHelper.navigateToTasksPage();
        cy.xpath('//tbody/tr/td/a[text()="AA"]').first().click();
        cy.xpath('//li[@class="list-group-item"]/a').invoke("text").then((text) => {
            var requestName = text.trim();
            requestName = requestName.substring(
                0,
                requestName.length
            );
            cy.xpath('(//button[@aria-label="New Submit"])[2]').click();                        
            navHelper.navigateToTasksPage();
            cy.xpath('//td/a').contains(requestName).click();
            cy.xpath('(//td/a)[2]').should('contain.text', "BB").click();
            cy.xpath('(//button[@aria-label="New Submit"])[2]').click();
            cy.wait(5000);
            cy.xpath('(//td[@aria-colindex="1"])[1]').should('contain.text', "date");
            cy.xpath('(//td[@aria-colindex="1"])[3]').should('contain.text', "input");
            cy.xpath('(//td[@aria-colindex="1"])[9]').should('contain.text', "textarea");
            cy.xpath('(//td[@aria-colindex="2"])[3]').should('contain.text', number);
            cy.xpath('(//td[@aria-colindex="2"])[9]').should('contain.text', "Nirvana");
            });       
    }

    async actionsAndAssertionsOfTCP42331A(requestId){
        request.openNewRequest(
            "TCP4-2331 Verify Script API"
        );

       request.waitUntilTextcontainText('selector','h4', "Completed");
       cy.xpath('(//td[@aria-colindex="1"])[3]').should('contain.text', "response.file");
       cy.xpath('(//td[@aria-colindex="2"])[3]').should('contain.text', "http://www.filosofia.uchile.cl/.imaging/default/dam/imagenes/Filosofia/imagenes-pregrado/Licenciatura-en-Filosofia.png/jcr:content.png");
       cy.xpath('(//td[@aria-colindex="1"])[4]').should('contain.text', "response.text");
       cy.xpath('(//td[@aria-colindex="2"])[4]').should('contain.text', "ASSAM is ASSAM KERELA is KERELA ORRISA is ORRISA");
       cy.xpath('(//td[@aria-colindex="1"])[5]').should('contain.text', "response.text_imploded");
       cy.xpath('(//td[@aria-colindex="2"])[5]').should('contain.text', "Israel Japan Germany");
       cy.xpath('(//div[@class="flex-grow-1"])[3]').should('contain.text',"Admin User has completed the task Script Task");
       cy.xpath('(//div[@class="flex-grow-1"])[4]').should('contain.text',"Admin User has completed the task DataConnector");
       cy.xpath('(//div[@class="flex-grow-1"])[5]').should('contain.text',"Admin User has completed the task Send Email");
       cy.xpath('(//div[@class="flex-grow-1"])[6]').should('contain.text',"Admin User has completed the task PDF Generator");
    }

    async actionsAndAssertionsOfTCP42296(requestId){
        var processName = "TCP4-2296 Verify Multiple File Upload";
        var filePath = "processes/TCP4-2296 Verify Multiple File Upload.json";

        //Step 1: Checking and Creating the vocabulary
        navHelper.navigateToProcessPage();
        cy.get(selectors.vocabulariesOption).click();
            cy.get('div[class="input-group w-100"] > input[aria-label="Search"]').type("TCP4-2296 Verify Multiple File Upload");
            cy.get('button[aria-label="Search"] > i[class="fas fa-search"]').click();
            cy.wait(5000);
            cy.xpath(selectors.vocabulariesList, {timeout: 10000})
                    .find('td')
                    .then(($loadedTable) => {
                        if($loadedTable.length === 1){
                            cy.get('button[aria-label="Create Vocabulary"]').click();
                            cy.get('input[name="title"]').type("TCP4-2296 Verify Multiple File Upload");
                            cy.get('textarea[name="description"]').type("TCP4-2296 Verify Multiple File Upload");
                            cy.get('button[type="button"]').eq(8).should('contain.text',"Save").click();
                            cy.get('input[class="form-control input-sm"]').should('be.visible');
                            cy.get('div[class="col-sm my-auto"] > i[class="fas fa-plus ml-3"]').click();
                            cy.get('div[class="input-group"] > input[aria-label="Name"]').eq(1).clear().type("fileUpload");
                            cy.get('select[aria-label="Type"]').eq(1).select('Array').should('have.value', 'array');
                            cy.get('input[type="number"]').type(30);
                            cy.get('button[type="button"]').eq(7).should('contain.text',"Save").click();   
                        }
                        else return;
                    });
        navHelper.navigateToProcessPage();
        //Step 2: Import Process
        cy.wait(5000);
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get(selectors.searchInputBox)
            .eq(0)
            .type(processName)
            .should("have.value", processName);
        cy.get(
            selectors.loadingSpinnerProcess
        ).should("be.visible");
        cy.get(
            selectors.loadingSpinnerProcess
        ).should("not.be.visible");
        cy.xpath(selectors.processTable, { timeout: 10000 })
            .find('td')
            .then(($loadedTable) => {
                if($loadedTable.length === 1){
                    process.importProcess(filePath);
                    cy.get('div[class="multiselect__select"]').eq(0).click();
                    cy.get('input[id="search-user-text"]').type("Admin Us");
                    cy.get(
                        'li[aria-label="Admin User. "] > span[class="multiselect__option multiselect__option--highlight"] > span'
                    )
                        .eq(0)
                        .should('contain.text',"Admin User")
                        .click({force:true});
                    cy.get('button[type="button"]').eq(5).should('contain.text',"Save").click();
                    cy.wait(10000);
                    
                    navHelper.navigateToProcessPage();
                    cy.get(editBtn).should('be.visible');
                    cy.get('input[aria-label="Search"]')
                        .eq(0)
                        .type(processName)
                        .should("have.value", processName);
                cy.get('tbody[class="vuetable-body"] > tr[item-index="0"] > td').should("contain.text", "TCP4-2296 Verify Multiple File Upload");
                }
                else return;
            });          
        // Step 3: Checking and adding the vocabulary
        navHelper.navigateToProcessPage();
        cy.wait(5000);
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get(selectors.searchInputBox)
            .eq(0)
            .type(processName)
            .should("have.value", processName);
        cy.get(
            selectors.loadingSpinnerProcess
        ).should("be.visible");
        cy.get(
            selectors.loadingSpinnerProcess
        ).should("not.be.visible");
        cy.xpath(selectors.processTable, { timeout: 10000 })
            
            .then(($loadedTable) => {
                if($loadedTable.length === 1){
                    cy.get('button[title="Edit"] > i[class="fas fa-pen-square fa-lg fa-fw"]', { timeout: 10000 }).eq(0).click(); 
                }else{
                    cy.get('div[aria-label="pagination"]').eq(1).get('div[class="pagination-nav-item item"]').eq(1).click();
                }
            });   
        cy.get('rect[joint-selector="body"]').eq(2).click({force:true});
        cy.get('span[class="ml-1 mr-auto"]').eq(7).should('have.text',"Vocabularies").click();
        cy.get('div[name="vocabularies"] > div > div[class="form-group px-0"]').then(($vocabulary) => {
            if($vocabulary.children().hasClass('text-center font-italic text-muted')){
                cy.get('button[aria-label="Add"] > i[class="fa fa-plus"]').click();
                cy.get('div[class="multiselect__select"]').eq(1).click();
                cy.get('li[aria-label="TCP4-2296 Verify Multiple File Upload. "] > span').should('have.text',"TCP4-2296 Verify Multiple File Upload").click();
                cy.get('button[aria-label="Add"] > i[class="fa fa-plus"]').click();
                cy.get('div[class="card-footer p-2 text-right"] > button[type="button"]').eq(0).contains("Save").click();
                cy.get(
                    'button[title="Save"] > svg[data-icon="save"]').click();
                cy.get('button[class="btn btn-secondary"]').eq(0)
                    .contains("Save").click();
        }
        else return;  
    });
        navHelper.navigateToRequestsPage();
        request.openNewRequest(
            "TCP4-2296 Verify Multiple File Upload"
        );
        cy.get(
            'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
        ).click();
        cy.wait(5000);
        cy.get('tbody[class="vuetable-body"] > tr[item-index="0"] > td').eq(1).get('a[target="_self"]').eq(6).should('contain.text',"AA").click();
        cy.wait(5000);
        const file1 = 'drone.jpg';
        cy.get('input[data-cy="file-upload-button"]').attachFile(file1);
        const file2 = 'sample.pdf';
        cy.get('input[data-cy="file-upload-button"]').attachFile(file2);
        const file3 = 'sample_document.doc';
        cy.get('input[data-cy="file-upload-button"]').attachFile(file3);
        cy.wait(5000);
        cy.get('div[class="card"] > ul > li > a')
        .invoke("text")
        .then((text) => {
            var requestIDtext = text.trim();
            requestIDtext = requestIDtext.substring(
                0,
                requestIDtext.length
            );
            cy.wait(5000);
        cy.get('button[aria-label="New Submit"]').click();
        navHelper.navigateToTasksPage();
        cy.get('tbody[class="vuetable-body"]')
            .get("tr")
            .get('td[class="vuetable-slot"] > a[target="_self"]')
            .contains(requestIDtext)
            .click();
        cy.wait(5000);
        cy.get('tbody[class="vuetable-body"] > tr[item-index="0"] > td')
                .eq(1)
                .get('a[target="_self"]')
                .eq(6)
                .should("contain.text", "BB")
                .click();
        cy.wait(5000);
        cy.get('div[title="drone.jpg"]').should('be.visible');
        cy.get('div[title="sample.pdf"]').should('be.visible');
        cy.get('div[title="sample_document.doc"]').should('be.visible');
        cy.get('button[aria-label="New Submit"]').eq(1).click({force: true});
        cy.wait(5000);
        cy.get('div[class="flex-grow-1"]').eq(2).should('contain.text',"Admin User has completed the task AA");
        cy.get('div[class="flex-grow-1"]').eq(3).should('contain.text',"Admin User has completed the task BB");
        });
    }
    
    async actionsAndAssertionsOfTCP42337(requestId){
        request.openNewRequest(
            "TCP4-2337 Verify Google"
        );
        cy.wait(10000);
        cy.get(
            'div[class="card"] > div[class="card-body"] > div[class="row"] > div[class="col-10"] > span')
        .should(
            "contain.text",
            "TCP4-2337 Verify Google Places"
        );
        cy.wait(10000);
        cy.get('a[class="btn btn-primary btn-sm"]').click();
        cy.get(
            'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
        ).click();
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Form Task")
            .click();
        cy.get(
            'div[data-cy="screen-field-google"] > div > input[class="form-control pac-target-input"]'
        )
            .eq(0)
            .click();
        cy.get(
            'div[data-cy="screen-field-google"] > div > input[class="form-control pac-target-input"]'
        )
            .eq(0)
            .type("Duomo Di Milano");
        cy.get(".pac-item", { timeout: 10000 })
            .should("be.visible")
            .eq(0)
            .click();
        cy.wait(5000);
        cy.get(
            'div[data-cy="screen-field-googleplaces"] > div > input[class="form-control pac-target-input"]'
        ).click();
        cy.get('div[data-cy="screen-field-googleplaces"] > div > input[class="form-control pac-target-input"]').eq(0).click();
        cy.get(
            'div[data-cy="screen-field-googleplaces"] > div > input[class="form-control pac-target-input"]'
        )
            .eq(0)
            .type("Palazzo Ducale Venezia");
        cy.get('.pac-item', { timeout: 10000 }).should('be.visible').eq(0).click();
        cy.wait(5000);
        cy.get('li[class="list-group-item"] > h5').contains("Assigned To").dblclick();
        cy.get('div[class="card"] > ul > li > a')
            .invoke("text")
            .then((text) => {
            var requestIDtext = text.trim();
            requestIDtext = requestIDtext.substring(
                0,
                requestIDtext.length
            );
            cy.wait(5000);
            cy.get('button[aria-label="New Submit"]').contains("New Submit").click();
            navHelper.navigateToTasksPage();
            cy.get('tbody[class="vuetable-body"]')
                .get("tr")
                .get('td[class="vuetable-slot"] > a[target="_self"]')
                .contains(requestIDtext)
                .click();
        }); 
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"] > a'
        )
            .eq(1)
            .contains("Manual Task")
            .click();
        cy.get('div[class="form-group form-image"] > img').should('have.length',2); 
        cy.get('button[class="btn btn-primary"]')
            .contains("Complete Task")
            .click();
        cy.reload();
        cy.wait(5000);
        cy.get('div[class="flex-grow-1"]').eq(2).contains("Admin User has completed the task Form Task");
        cy.wait(5000);
        cy.get('div[class="flex-grow-1"]').eq(3).contains("Admin User has completed the task Manual Task");
    }

    async actionsAndAssertionsOfTCP42330(requestId){
        request.openNewRequest(
            "TCP4-2330 Verify Vocabulary Object and Array Script Time Out"
        );
        cy.wait(10000);
        cy.get(
            'div[class="card"] > div[class="card-body"] > div[class="row"] > div[class="col-10"] > span')
        .should(
            "contain.text",
            "TCP4-2330 Verify Vocabulary Object and Array Script Time Out"
        );
        cy.wait(10000);
        cy.get('a[class="btn btn-primary btn-sm"]').click();
        cy.get(
            'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
        ).click();
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Form Task")
            .click();
        cy.get('div[class="multiselect__select"]').click();
        cy.get(
            'ul[role="listbox"] > li[aria-label="La Leçon de ténèbres. "] > span[class="multiselect__option multiselect__option--highlight"] > span'
        )
            .contains("La Leçon de ténèbres")
            .click();
        const file1 = 'drone.jpg';
        cy.get('input[data-cy="file-upload-button"]').attachFile(file1); 
        const file2 = 'sample.pdf';
        cy.get('input[data-cy="file-upload-button"]').attachFile(file2); 
        cy.get('div[class="card"] > ul > li > a')
        .invoke("text")
        .then((text) => {
            var requestIDtext = text.trim();
            requestIDtext = requestIDtext.substring(
                0,
                requestIDtext.length
            );
            cy.wait(5000);
            cy.get('button[aria-label="New Submit"]').click();
            cy.wait(10000);
            navHelper.navigateToTasksPage();
            cy.get('span[class="multiselect__tag"] > i[aria-label="Remove Element"]').click();
            cy.wait(10000);
            cy.get('button[title="Search"] > i').click();
            cy.get('tbody[class="vuetable-body"]')
                .get("tr")
                .get('td[class="vuetable-slot"] > a[target="_self"]')
                .contains(requestIDtext)
                .click();
        });
        cy.get('div[class="flex-grow-1"]').eq(2).contains("Admin User has completed the task Form Task");
        cy.get('div[class="flex-grow-1"]').eq(3).contains("Admin User has completed the task Verify Vocabulary Object and Array Script Time Out");    
    }

    async actionsAndAssertionsOfTCP42391A(requestId) {
        cy.reload();
        cy.get('div[class="multiselect__select"]').should('be.visible');
        cy.get('div[class="multiselect__select"]').first().click();
        cy.get('ul[id="listbox-0"] > li[aria-label="YES. "]').click();
        cy.get('button[data-cy="loop-loop_1-add"]').click();
        cy.get('button[data-cy="loop-loop_1-add"]').click();
        cy.get('input[data-cy="screen-field-form_input_2"]').eq(0).type("test1");
        cy.get('input[data-cy="screen-field-form_input_2"]').eq(1).type("test2");
        cy.get('input[data-cy="screen-field-form_input_2"]').eq(2).type("test3");
        cy.get('button[aria-label="New Submit"]').click();
        cy.wait(5000);
        login.navigateToUrl();
        login.login();
        navHelper.navigateToAllRequests();
        cy.get('tr > td[class="vuetable-slot"] > span').contains('TCP4-2391 Loop required web entry').parent().parent().children().children().eq(0).click();
        cy.get('tr[item-index="0"] > td[class="vuetable-slot"]').contains('Form Task').click();
        cy.get('span[class="multiselect__single"]').contains('YES');
        cy.get('div[name="loop_1"]').find('input[aria-label="Line Input Loop"]').eq(0).should('have.value', 'test1');
        cy.get('div[name="loop_1"]').find('input[aria-label="Line Input Loop"]').eq(1).should('have.value', 'test2');
        cy.get('div[name="loop_1"]').find('input[aria-label="Line Input Loop"]').eq(2).should('have.value', 'test3');
        cy.get('button[aria-label="New Submit"]').click();  
        cy.reload(); 
        cy.get('div[class="flex-grow-1"]').contains('An Anonymous User started this request from a web entry');
        cy.get('div[class="flex-grow-1"]').contains('has completed the task Form Task');
    }
    
    async actionsAndAssertionsOfTCP42313(requestId) {
        request.openNewRequest(
            "TCP4-2313 Verify Conversational with Gateways"
        );
        cy.wait(10000);
        cy.get(
            'div[class="card"] > div[class="card-body"] > div[class="row"] > div[class="col-10"] > span')
        .should(
            "contain.text",
            "TCP4-2313 Verify Conversational with Gateways"
        );
        cy.wait(10000);
        cy.get('a[class="btn btn-primary btn-sm"]').click();
        cy.get(
            'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
        ).click();
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Task 1")
            .click();
        cy.get('div[class="form-group user-input-field"]').find('input[name="input"]').type("Athens");
        cy.get('button[aria-label="Submit"]').click();
        cy.get('div[class="card"] > ul > li > a')
        .invoke("text")
        .then((text) => {
            var requestIDtext = text.trim();
            requestIDtext = requestIDtext.substring(
                0,
                requestIDtext.length
            );
            cy.wait(5000);
            cy.get('div[class="d-block"] >').eq(0)
                    .contains("La Leçon de ténèbres").click();
            cy.wait(10000);
            navHelper.navigateToTasksPage();
            cy.get('tbody[class="vuetable-body"]')
                .get("tr")
                .get('td[class="vuetable-slot"] > a[target="_self"]')
                .contains(requestIDtext)
                .click();
        });
        cy.get(
            'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
        ).click();
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Task 3")
            .click(); 
            cy.get('div[class="form-group user-input-field"]').find('input[name="input"]').type("Athens");
            cy.get('button[aria-label="Submit"]').click();
            cy.get('div[class="card"] > ul > li > a')
            .invoke("text")
            .then((text) => {
                var requestIDtext = text.trim();
                requestIDtext = requestIDtext.substring(
                    0,
                    requestIDtext.length
                );
                cy.wait(5000);
                cy.get('div[class="d-block"] >').eq(0)
                        .contains("La Leçon de ténèbres").click();
                cy.wait(10000);
                navHelper.navigateToTasksPage();
                cy.get('tbody[class="vuetable-body"]')
                    .get("tr")
                    .get('td[class="vuetable-slot"] > a[target="_self"]')
                    .contains(requestIDtext)
                    .click();
            }); 
            cy.get(
                'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
            ).click();
            cy.wait(5000);
            cy.get(
                'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
            )
                .eq(1)
                .contains("Task 4")
                .click();
                cy.get('div[class="form-group user-input-field"]').find('input[name="input"]').type("Athens");
            cy.get('button[aria-label="Submit"]').click();
            cy.get('div[class="card"] > ul > li > a')
            .invoke("text")
            .then((text) => {
                var requestIDtext = text.trim();
                requestIDtext = requestIDtext.substring(
                    0,
                    requestIDtext.length
                );
                cy.wait(5000);
                cy.get('div[class="d-block"] >').eq(0)
                        .contains("La Leçon de ténèbres").click();
                cy.wait(10000);
                navHelper.navigateToTasksPage();
                cy.get('tbody[class="vuetable-body"]')
                    .get("tr")
                    .get('td[class="vuetable-slot"] > a[target="_self"]')
                    .contains(requestIDtext)
                    .click();
            });
            cy.get(
                'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
            ).click();
            cy.wait(5000);
            cy.get(
                'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
            )
                .eq(1)
                .contains("Task 5")
                .click();
                cy.get('div[class="form-group user-input-field"]').find('input[name="input"]').type("Athens");
            cy.get('button[aria-label="Submit"]').click();
            cy.get('div[class="d-block"] >').eq(0)
            .contains("La Leçon de ténèbres").click();
            cy.wait(10000); 
            cy.get('div[class="flex-grow-1"]').contains("Admin User has completed the task Task 1");
            cy.get('div[class="flex-grow-1"]').contains("Admin User has completed the task Task 3");
            cy.get('div[class="flex-grow-1"]').contains("Admin User has completed the task Task 4");
            cy.get('div[class="flex-grow-1"]').contains("Admin User has completed the task Task 5");
   
        request.openNewRequest(
            "TCP4-2313 Verify Conversational with Gateways"
        );
        cy.wait(10000);
        cy.get(
            'div[class="card"] > div[class="card-body"] > div[class="row"] > div[class="col-10"] > span')
        .should(
            "contain.text",
            "TCP4-2313 Verify Conversational with Gateways"
        );
        cy.wait(10000);
        cy.get('a[class="btn btn-primary btn-sm"]').click();
        cy.get(
            'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
        ).click();
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Task 1")
            .click();
        cy.get('div[class="form-group user-input-field"]').find('input[name="input"]').type("Roma");
        cy.get('button[aria-label="Submit"]').click();
        cy.get('div[class="card"] > ul > li > a')
        .invoke("text")
        .then((text) => {
            var requestIDtext = text.trim();
            requestIDtext = requestIDtext.substring(
                0,
                requestIDtext.length
            );
            cy.wait(5000);
            cy.get('div[class="d-block"] >').eq(0)
                    .contains("La Leçon de ténèbres").click();
            cy.wait(10000);
                navHelper.navigateToTasksPage();
                cy.get('tbody[class="vuetable-body"]')
                    .get("tr")
                    .get('td[class="vuetable-slot"] > a[target="_self"]')
                    .contains(requestIDtext)
                    .click();
            });
            cy.wait(5000);
            cy.get(
                'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
            ).click();
            cy.wait(5000);
            cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Task 2")
            .click();

            cy.get('div[class="form-group user-input-field"]').find('input[name="input"]').type("Athens");
            cy.get('button[aria-label="Submit"]').click();
            cy.get('div[class="d-block"] >').eq(0)
            .contains("La Leçon de ténèbres").click();
            cy.wait(10000); 
            cy.get('div[class="flex-grow-1"]').contains("Admin User has completed the task Task 1");
            cy.get('div[class="flex-grow-1"]').contains("Admin User has completed the task Task 2");
    }

    async actionsAndAssertionsOfTCP42315(requestId) {
        request.openNewRequest(
            "Check validations in conversational form TCP4-2315"
        );
        cy.get(
            'div[class="card-body"] > div[class="row"] > div[class="col-10"]'
        ).should(
            "contain.text",
            "Check validations in conversational form TCP4-2315"
        );
        cy.xpath(
            '//*[@id="requests-modal___BV_modal_body_"]/div[3]/div[2]/div/div[4]'
        ).click();
        cy.xpath(
            '//*[@id="requests-modal___BV_modal_body_"]/div[2]/div/div/div/div/div/div[2]/a'
        )
            .eq(0)
            .click();
        cy.get(
            'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
        ).click();
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Form Task")
            .click();
        cy.get('input[name="form_input_1"]').type("yes");
        cy.get('button[aria-label="Submit"]').click();
        cy.get('input[name="form_input_2"]').type("Israel");
        cy.get('button[aria-label="Submit"]').click();
        cy.get('input[name="form_input_3"]').type("2022-02-02");
        cy.get('button[aria-label="Submit"]').click();
        cy.get('div[class="card"] > ul > li > a')
            .invoke("text")
            .then((text) => {
                var requestIDtext = text.trim();
                requestIDtext = requestIDtext.substring(
                    0,
                    requestIDtext.length
                );
                cy.get('div[class="d-block"]')
                    .eq(0)
                    .get(
                        'button[class="btn mb-2 select-list-options w-100 btn-outline-primary btn-sm rounded-pill"]'
                    )
                    .eq(0)
                    .click();
                cy.wait(5000);
                navHelper.navigateToTasksPage();
                cy.get('tbody[class="vuetable-body"]')
                    .get("tr")
                    .get('td[class="vuetable-slot"] > a[target="_self"]')
                    .eq(1)
                    .contains(requestIDtext)
                    .click();
            });
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"] > a[target="_self"]'
        ).contains("Form Task 1");
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="1"] > td[class="vuetable-slot"] > a[target="_self"]'
        ).contains("Form Task 2");
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"] > a[target="_self"]'
        )
            .eq(1)
            .contains("Form Task 1")
            .click();
        cy.get('input[name="form_input_1"]').type("yes");
        cy.get('button[aria-label="Submit"]').click();
        cy.get('input[name="form_input_2"]').type("Israel");
        cy.get('button[aria-label="Submit"]').click();
        cy.get('input[name="form_input_3"]').type("2022-02-02");
        cy.get('button[aria-label="Submit"]').click();
        cy.get('div[class="card"] > ul > li > a')
            .invoke("text")
            .then((text) => {
                var requestIDtext = text.trim();
                requestIDtext = requestIDtext.substring(
                    0,
                    requestIDtext.length
                );
                cy.get('div[class="d-block"]')
                    .eq(0)
                    .get(
                        'button[class="btn mb-2 select-list-options w-100 btn-outline-primary btn-sm rounded-pill"]'
                    )
                    .eq(0)
                    .click();
                cy.wait(5000);
                navHelper.navigateToTasksPage();
                cy.get('tbody[class="vuetable-body"]')
                    .get("tr")
                    .get('td[class="vuetable-slot"] > a[target="_self"]')
                    .eq(1)
                    .contains(requestIDtext)
                    .click();
                cy.get(
                    'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"] > a[target="_self"]'
                )
                    .eq(1)
                    .contains("Form Task 2")
                    .click();
                cy.get('input[name="form_input_1"]').type("yes");
                cy.get('button[aria-label="Submit"]').click();
                cy.get('input[name="form_input_2"]').type("Israel");
                cy.get('button[aria-label="Submit"]').click();
                cy.get('input[name="form_input_3"]').type("2022-02-02");
            });
        cy.get('button[aria-label="Submit"]').click();
    }
  
    async actionsAndAssertionsOfTCP42338(requestId){
        request.openNewRequest(
            "TCP4-2338 Check pdf generator and send email sequentially with google places control"
        );
        cy.wait(10000);
        cy.get('div[class="col-10"] > span').contains(
            "TCP4-2338 Check pdf generator and send email sequentially with google places control"
        );
        cy.get(
            'div[class="col-2 text-right"] > a[class="btn btn-primary btn-sm"]'
        )
            .contains("Start")
            .click();
            cy.get(
                'ul[class="list-group list-group-flush w-100"] > li[class="list-group-item"]'
            ).should("be.visible");
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Form Task")
            .click();
        cy.get('input[name="form_input_1"]').type("Bolivia");
        cy.get('input[name="form_input_2"]').type("2020-01-01");
        cy.xpath(
            '//*[@id="tab-form"]/div/div/div/div/div/div/div[2]/div/div[1]/div[1]/div/div/input'
        ).type("Turín, Italia");
        cy.get('div[class="signature pl-0"] > canvas').dblclick();
        cy.wait(3000);
        cy.xpath(
            '//*[@id="tab-form"]/div/div/div/div/div/div/div[2]/div/div[1]/div[2]/div/div/input'
        ).type("Roma, Italia");
        cy.get('input[name="form_input_2"]').click();
        cy.get(
            'div[class="card"] > ul[class="list-group list-group-flush w-100"] > li[class="list-group-item"] > a'
        )
            .invoke("text")
            .then((text) => {
                var requestIDtext = text.trim();
                requestIDtext = requestIDtext.substring(
                    0,
                    requestIDtext.length
                );
            cy.get('button[aria-label="New Submit"]').click();
            cy.wait(5000); 
            navHelper.navigateToTasksPage();
            cy.get('span[class="multiselect__tag"] > span')
                .contains("In Progress")
                .get('i[aria-label="Remove Element"]')
                .click();
            cy.wait(5000);
            cy.get('div[class="multiselect__select"]').eq(2).click();
            cy.xpath('//*[@id="option-2-2"]/span/span').click();
            cy.xpath(
                '//*[@id="search-bar"]/div/div/div/div[2]/button[2]'
            ).click();
            cy.wait(5000);
            cy.get('tbody[class="vuetable-body"]')
                .get('tr[item-index="0"]')
                .get('td[class="vuetable-slot"]')
                .should("be.visible", requestIDtext)
                .contains(requestIDtext)
                .click();
            cy.wait(5000);
            cy.reload();
        }); 
        cy.get('div[class="flex-grow-1"]')
            .contains("Admin User has completed the task PDF Generator 1")
            .should("be.visible");
        cy.get('div[class="flex-grow-1"]')
            .contains("Admin User has completed the task Send Email 1")
            .should("be.visible");
        cy.get('div[class="flex-grow-1"]')
            .contains("Admin User has completed the task PDF Generator 2")
            .should("be.visible");
        cy.get('div[class="flex-grow-1"]')
            .contains("Admin User has completed the task Send Email 2")
            .should("be.visible");
        cy.get('ul[class="nav nav-tabs"] > li[class="nav-item"]')
            .eq(3)
            .contains("File Manager")
            .click();
        cy.get('tr[role="row"]')
            .eq(0)
            .get('td[aria-colindex="2"] > span')
            .contains("PDF-1");
        cy.get('tr[role="row"]')
            .eq(1)
            .get('td[aria-colindex="2"] > span')
            .contains("PDF-2");
        cy.get('button[class="btn btn-link"]').eq(0).click();
    } 
  
    async actionsAndAssertionsOfNoLoopsTCP42340(requestId){
        request.openNewRequest("TCP4-2340 Verify loop");
        cy.wait(10000);
        cy.get('div[class="col-10"] > span').contains("TCP4-2340 Verify loop");
        cy.get(
            'div[class="col-2 text-right"] > a[class="btn btn-primary btn-sm"]'
        )
            .contains("Start")
            .click();
        cy.get(
                'ul[class="list-group list-group-flush w-100"] > li[class="list-group-item"]'
            ).should("be.visible");
        cy.wait(5000);
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Form Task 1")
            .click();
        cy.get('input[type="checkbox"]').check();
        cy.get('input[name="form_input_1"]').type("Germany");
        cy.get('textarea[name="form_text_area_1"]').type(
            "Japan is an Asian country."
        );
        cy.get('input[aria-label="New Date Picker"]').click();
        cy.xpath(
            "/html/body/div[1]/div[2]/div[2]/div/div/div/div[1]/div/div/div[1]/div[1]/div/div/div/div/div/div/div[4]/div/div/ul/li[1]/div/div[1]/table/tbody/tr[3]/td[7]"
        ).click();
        cy.get(
            'div[class="card"] > ul[class="list-group list-group-flush w-100"] > li[class="list-group-item"] > a'
        )
            .invoke("text")
            .then((text) => {
                var requestIDtext = text.trim();
                requestIDtext = requestIDtext.substring(
                    0,
                    requestIDtext.length
                );
            cy.get('button[aria-label="New Submit"]').click();
            cy.wait(5000);
                navHelper.navigateToTasksPage();
                cy.get('tbody[class="vuetable-body"]')
                    .get('tr[item-index="0"]')
                    .get('td[class="vuetable-slot"]')
                    .should("be.visible", requestIDtext)
                .contains(requestIDtext)
                .click();
            cy.wait(5000);
                cy.get(
                    'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
                )
                    .eq(1)
                    .contains("Form Task Loop")
                    .click();
            cy.get('button[aria-label="New Submit"]').click();
            cy.wait(5000);
            navHelper.navigateToTasksPage();           
            cy.get('tbody[class="vuetable-body"]')
                .get('tr[item-index="0"]')
                    .get('td[class="vuetable-slot"]')
                    .should("be.visible", requestIDtext)
                .contains(requestIDtext)
                .click();
            cy.wait(5000);
                cy.get(
                    'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
                )
                    .eq(1)
                    .contains("Form Task 2")
                    .click();
                cy.get('button[aria-label="New Submit"]').click();
        }); 
    }
    async actionsAndAssertionsOfLoopsTCP42340(requestId){    
        cy.wait(5000);
        request.openNewRequest("TCP4-2340 Verify loop");
        cy.wait(10000);
        //cy.get('div[aria-label="pagination"] div[class="pagination-nav-item icon item"] > i[class="fas fa-angle-right"]').eq(1).click({ multiple: true });      
        cy.get('div[class="col-10"] > span').should('have.length', 1);
        cy.get('div[class="col-10"] > span').contains("TCP4-2340 Verify loop");
        cy.get(
            'div[class="col-2 text-right"] > a[class="btn btn-primary btn-sm"]'
        )
            .contains("Start")
            .click();
        cy.wait(5000);
        cy.get(
            'ul[class="list-group list-group-flush w-100"] > li[class="list-group-item"]'
        ).should("be.visible");
        cy.get(
            'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
        )
            .eq(1)
            .contains("Form Task 1")
            .click();
        cy.get('input[name="form_input_1"]').type("Germany");
        cy.get('textarea[name="form_text_area_1"]').type("Japan is an Asian country.");
        cy.get('input[aria-label="New Date Picker"]').click();
        cy.xpath(
            "/html/body/div[1]/div[2]/div[2]/div/div/div/div[1]/div/div/div[1]/div[1]/div/div/div/div/div/div/div[4]/div/div/ul/li[1]/div/div[1]/table/tbody/tr[3]/td[7]"
        ).click();
        cy.get(
            'div[class="card"] > ul[class="list-group list-group-flush w-100"] > li[class="list-group-item"] > a'
        )
            .invoke("text")
            .then((text) => {
                var requestIDtext = text.trim();
                requestIDtext = requestIDtext.substring(
                    0,
                    requestIDtext.length
                );
            cy.get('button[aria-label="New Submit"]').click();
            cy.wait(5000);
            navHelper.navigateToTasksPage();           
            cy.get('tbody[class="vuetable-body"]')
                .get('tr[item-index="0"]')
                    .get('td[class="vuetable-slot"]')
                    .should("be.visible", requestIDtext)
                .contains(requestIDtext)
                .click();
            cy.wait(5000);
                cy.get(
                    'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
                )
                    .eq(1)
                    .contains("Form Task Loop")
                    .click();
            cy.get('button[aria-label="New Submit"]').click();
            cy.wait(5000);
                navHelper.navigateToTasksPage();
                cy.get('tbody[class="vuetable-body"]')
                .get('tr[item-index="0"]')
                    .get('td[class="vuetable-slot"]')
                    .should("be.visible", requestIDtext)
                .contains(requestIDtext)
                .click();
            cy.wait(5000);
                cy.get(
                    'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
                )
                    .eq(1)
                    .contains("Form Task Loop")
                    .click();
            cy.get('button[aria-label="New Submit"]').click();
            cy.wait(5000);
            navHelper.navigateToTasksPage();           
            cy.get('tbody[class="vuetable-body"]')
                .get('tr[item-index="0"]')
                .get('td[class="vuetable-slot"]').should('be.visible', requestIDtext)
                .contains(requestIDtext)
                .click();
            cy.wait(5000);
                cy.get(
                    'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
                )
                    .eq(1)
                    .contains("Form Task Loop")
                    .click();
            cy.get('button[aria-label="New Submit"]').click();
            cy.wait(5000);
                navHelper.navigateToTasksPage();
                cy.get('tbody[class="vuetable-body"]')
                .get('tr[item-index="0"]')
                .get('td[class="vuetable-slot"]').should('be.visible', requestIDtext)
                .contains(requestIDtext)
                .click();
            cy.wait(5000);
                cy.get(
                    'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
                )
                    .eq(1)
                    .contains("Form Task Loop")
                    .click();
            cy.get('button[aria-label="New Submit"]').click();
            cy.wait(5000);
                navHelper.navigateToTasksPage();
                cy.get('tbody[class="vuetable-body"]')
                .get('tr[item-index="0"]')
                    .get('td[class="vuetable-slot"]')
                    .should("be.visible", requestIDtext)
                .contains(requestIDtext)
                .click();
            cy.wait(5000);
                cy.get(
                    'tbody[class="vuetable-body"] > tr[item-index="0"] > td[class="vuetable-slot"]'
                )
                    .eq(1)
                    .contains("Form Task 2")
                    .click();
                cy.get('button[aria-label="New Submit"]').click();
            });
    }

    async actionsAndAssertionsOfTCP44206(requestId){
        cy.get('button[aria-label="GET CODE"]').click();
        cy.get('button[aria-label="Request CODE"]').click();
        const screenCode = cy.get('input[name="suppliedOtp"]');
        cy.get('button[aria-label="Validate Code"]').click();
        //input
        cy.get('input[name="lineInputText"]').type('Fenomenología del Espiritu');
        cy.get('input[name="lineInputInteger"]').type('888');
        cy.get('input[name="lineInputCurrency"]').type('$1200');
        cy.get('input[name="lineInputPercentage"]').type('80%');
        cy.get('input[name="lineInputDecimal"]').type('0.08');
        cy.get('input[name="lineInputDateTime"]').type('2020-02-02 12:00');
        cy.get('input[name="lineInputDate"]').type('2020-02-02 ');
        cy.get('input[name="lineInputPassword"]').type('Hegel');
        //textarea
        cy.get('textarea[name="textArea"]').type('Crítica de la Razón Pura');
        //select list
        cy.get('div[class="multiselect__select"]').first().click();
        cy.get('ul[id="listbox-0"] > li[aria-label="Select 2. "]').click();
    
        cy.get('div[data-cy="screen-field-selectList2"] > div[class="multiselect__select"]').first().click();
        cy.get('ul[class="multiselect__content"] > li[aria-label="option 2. "]').click();
        cy.get('div[data-cy="screen-field-selectList2"] > div[class="multiselect__select"]').first().click();
        cy.get('ul[class="multiselect__content"] > li[aria-label="option 3. "]').click();
    
        //date Picker
        cy.get('div[data-cy="screen-field-datePicker"] > input[class="form-control"]').click();
        cy.xpath('//*[@id="tab-form"]/div/div/div/div/div/div/div[21]/div/div/ul/li[1]/div/div[1]/table/tbody/tr[4]/td[7]').click();
        cy.get('input[aria-label="Date Picker (Date Time)"]').click();
        cy.xpath('//*[@id="tab-form"]/div/div/div/div/div/div/div[22]/div/div/ul/li[1]/div/div[1]/table/tbody/tr[3]/td[7]').click();
        //UploadFile
        const file = 'drone.jpg';
        cy.get('input[data-cy="file-upload-button"]').attachFile(file);
        cy.get('div[class="uploader-file-status"] > span').should('contain.text','success');
        cy.get('button[aria-label="Submit"]').click();
        
        //Final Assertions
        cy.reload();
        cy.get('input[name="lineInputText"]').should('have.value', 'Fenomenología del Espiritu');
        cy.get('input[name="lineInputInteger"]').should('have.value', '888');
        cy.get('input[name="lineInputCurrency"]').should('have.value', '1,200.00 BOB' );
        cy.get('input[name="lineInputPercentage"]').should('have.value','80.00 %');
        cy.get('input[name="lineInputDecimal"]').should('have.value', '0.08');
        cy.get('input[aria-label="Input Date Time"]').should('have.value', '2020-02-02 12:00');
        cy.get('input[aria-label="Input Date"]').should('have.value', '2020-02-02');
        cy.get('input[aria-label="Input Password"]').should('have.value', 'Hegel');
        cy.get('textarea[aria-label="Textarea"]').should('have.value', 'Crítica de la Razón Pura');
        cy.get('span[class="multiselect__single"]').should('contain.text','Select 2');
        cy.get('div[class="multiselect__select"]').get('div[class="multiselect__tags-wrap"]').find('span[class="multiselect__tag"]').find('span').eq(0).should('contain.text','option 2');
        cy.get('div[class="multiselect__select"]').get('div[class="multiselect__tags-wrap"]').find('span[class="multiselect__tag"]').find('span').eq(1).should('contain.text','option 3');
        //cy.get('div[aria-label="Date Picker (Date) minDate:8/12/2020"]').should('have.value');
        //cy.get('div[aria-label="Date Picker (Date Time)"]').should('have.value');
        cy.get('div[class="uploader-file-status"] > span').should('contain.text','success');
        cy.get('button[aria-label="Submit"]').click();
    }
    
    async actionsAndAssertionsOfTCP42391(requestId) {
        cy.get('div[class="multiselect__select"]').first().click();
        cy.get('ul[id="listbox-0"] > li[aria-label="YES. "]').click();
        cy.get('button[data-cy="loop-loop_1-add"]').click();
        cy.get('input[aria-label="Line Input Loop"]').type("test1");
        cy.get('button[data-cy="loop-loop_1-add"]').click();
        cy.get('input[class="form-control is-invalid"]').type("test2");
        cy.get('button[data-cy="loop-loop_1-add"]').click();
        cy.get('input[class="form-control is-invalid"]').type("test3");
        cy.get('button[aria-label="New Submit"]').click();
        login.navigateToUrl();
        login.login();
        navHelper.navigateToAllRequests();
        cy.get('tr[item-index="0"]').find('a[title="Open Request"]').click();
        cy.get('tr[item-index="0"] > td[class="vuetable-slot"]').contains('Form Task').click();
        cy.get('span[class="multiselect__single"]').contains('YES');
        cy.get('div[name="loop_1"]').find('input[aria-label="Line Input Loop"]').eq(0).should('have.value', 'test1');
        cy.get('div[name="loop_1"]').find('input[aria-label="Line Input Loop"]').eq(1).should('have.value', 'test2');
        cy.get('div[name="loop_1"]').find('input[aria-label="Line Input Loop"]').eq(2).should('have.value', 'test3');
        cy.get('button[aria-label="New Submit"]').click();         
    }
    async actionsAndAssertionsOfTCP42227(requestId) {
        cy.get('input[name="form_input_1"]').type("Test");
        cy.get('button[aria-label="Submit"]').click();
        cy.xpath("(//button[contains(@class, 'select-list-options')])[1]").click();
        cy.xpath("(//button[contains(@class, 'select-list-options')])[2]").click();
        cy.xpath("(//button[contains(@class, 'select-list-options')])[3]").click();
        cy.xpath("//button[text()[normalize-space()='I am done selecting']]").click();

        cy.xpath("(//button[contains(@class, 'select-list-options')])[1]").click();
        //cy.xpath("//button[text()[normalize-space()='I am done selecting']]").click();

        //cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        cy.visit('/requests/' + requestId);
        var result = await request.waitUntilTheRequestIsCompleted(20000);
        // expect(result).to.be(true);

        cy.get('#file-manager-tab').click();
        cy.get('#fileManager tbody[role="rowgroup"] tr[data-pk]').should('have.length', 3);
    }

    async actionsAndAssertionsOfTCP42248(requestId) {
        //request part click on select list
        cy.get('[class="multiselect__input"]').click({
            force: true
        });
        //add option to select list
        cy.xpath('(//li[@role="option"]//span//span[text()="Latin America & Caribbean "])[1]').click({
            multiple: true
        });
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');

        //Go to Inprogress
        navHelper.navigateToProcessPage();
        navHelper.navigateToInprogressRequests();
        //open request by ID
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        //click on select list
        cy.get('[class="multiselect__input"]').click({
            force: true
        });
        //add option title3
        cy.xpath('(//span[text()="title3"])[1]').click();
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');

        //Go to Inprogress
        navHelper.navigateToProcessPage();
        navHelper.navigateToInprogressRequests();
        //open request by ID
        request.openRequestById(requestId);
        cy.wait(2000);
        request.clickOnTaskName(1, 1);
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        //verify the process is completed
        request.processIsCompleted(requestId);
        //cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Data Connector A']]").should('be.visible');

        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task A']]").scrollIntoView().should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task B']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Data Connector B']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task c']]").should('be.visible');
    }

    async actionsAndAssertionsOfTCP42331(requestId, name, form_Screen, display_Screen){
        cy.get("[name='form_Screen']".replace('form_Screen', form_Screen)).should('be.visible');
        cy.get('[data-cy="screen-field-form_input_1"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
        cy.xpath('(//input[@type="file"])[1]').attachFile("sample.pdf");
        cy.get('.uploader-file-name').contains("sample.pdf");
        cy.get('[data-cy="screen-field-form_input_2"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
        cy.xpath('(//input[@type="file"])[2]').attachFile('drone.jpg');
        cy.xpath('(//*[@class="uploader-file-name"])[2]').contains("drone.jpg");
        cy.xpath('//button[text()[normalize-space()="New Submit"]]').click();
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        navHelper.navigateToRequestsPage();
        //navHelper.navigateToInprogressRequests();
        request.openRequestById(requestId);
        cy.wait(5000);
        request.clickOnTaskName(1, 1);
        cy.get("[name='display_Screen']".replace('display_Screen', display_Screen)).should('be.visible');
        cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[1]").should('be.visible');
        cy.get('[data-cy="screen-field-file_upload_1"]').should('be.visible');
        cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[2]").should('be.visible');
        cy.xpath("//div[@data-cy='screen-field-file_upload_2']//img[1]").should('be.visible');
        cy.xpath('//a[text()="Go to about Processmaker"]').click();
        cy.get("[aria-label='ProcessMaker']").should('be.visible');
        cy.go('back');
        cy.xpath('//button[text()[normalize-space()="Complete Task"]]').click();
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        cy.reload();
        cy.get('[id="file-manager-tab"]').click();
        cy.xpath('(//*[@title="View"])[3]').click();
        request.processIsCompleted(requestId);
    
        //requestpart___Quarter Scenario
        navHelper.navigateToRequestsPage();
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        var requestId = await header.clickOnStart(name);
        request.clickOnTaskName(1, 1);
        cy.get("[name='form_Screen']".replace('form_Screen', form_Screen)).should('be.visible');
        //cy.get('[data-cy="screen-field-form_input_1"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
        cy.xpath('(//input[@type="file"])[1]').attachFile("sample.pdf");
        cy.get('.uploader-file-name').contains("sample.pdf");
        cy.get('[data-cy="screen-field-form_input_2"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
        cy.xpath('(//input[@type="file"])[2]').attachFile('drone.jpg');
        cy.xpath('(//*[@class="uploader-file-name"])[2]').contains("drone.jpg");
        cy.xpath('//button[text()[normalize-space()="New Submit"]]').click();
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        navHelper.navigateToRequestsPage();
        //navHelper.navigateToInprogressRequests();
        request.openRequestById(requestId);
        cy.wait(5000);
        request.clickOnTaskName(1, 1);
        cy.get("[name='display_Screen']".replace('display_Screen', display_Screen)).should('be.visible');
        cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[1]").should('be.visible');
        cy.get('[data-cy="screen-field-file_upload_1"]').should('be.visible');
        // cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[2]").should('be.visible');
        cy.xpath("//div[@data-cy='screen-field-file_upload_2']//img[1]").should('be.visible');
        cy.xpath('//a[text()="Go to about Processmaker"]').click();
        cy.get("[aria-label='ProcessMaker']").should('be.visible');
        cy.go('back');
        cy.xpath('//button[text()[normalize-space()="Complete Task"]]').click();
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        cy.get("[id='file-manager-tab']").should('be.visible');
        cy.get('[id="file-manager-tab"]').click();
        cy.xpath('(//*[@title="View"])[1]').click();
        cy.wait(2000);
        cy.go('back');
        cy.xpath('(//*[@title="View"])[2]').click();
        request.processIsCompleted(requestId);
    }

    async actionsAndAssertionsOfTCP42451() {
        var selectorLineInput = '[data-cy="screen-field-form_input_1"]';
        var selectorSubmitBtn = '.btn';
        var selectorContentPageScocia = '.above-fold-section__search-install';
        var xpathRequest = '//span[text()="TCP4-2451 Verify terminate End Test WEB ENTRY"]/ancestor::tbody/tr[1]/td[1]';
        // Step 1: Complete Screen WE 
        cy.get(selectorSubmitBtn).should('be.visible');
        cy.get(selectorLineInput).type("Well").should('have.value',"Well");
        cy.get(selectorSubmitBtn).click();
        cy.get(selectorContentPageScocia).should('be.visible');

        //Step 2: Login PM4 page 
        login.navigateToUrl();
        login.login();

        //Step 3: Complete the request 
        navHelper.navigateToAllRequests();
        cy.xpath(xpathRequest).should('be.visible');
        cy.xpath(xpathRequest).click();
    }

    async actionsAndAssertionsOfTCP42442() {
        const xpathRadioBox = "//label[text()='provideJointInfo']";
        const xpathYesOption = "//label[contains(text(),'Yes')]";
        const xpathNoOption = "//label[contains(text(),'No')]";
        const xpathBeforeTodayLineInput = "//label[text()='Before Date TODAY']/following-sibling::input";
        const messageError = "//div[text()='Must be before today']";
        const xpathSubmitButton = "//button[contains(text(),'New Submit')]";
        const xpathRequest = "//span[text()='TCP4-2442 Web entry  visibility rules nested  before  date']//ancestor::tr[1]/td[1]/a";
        const xpathStatusRequest = "//h4[text()='Completed']";

        //Step 1: Verify that page is load
        cy.xpath(xpathRadioBox).should('be.visible');

        //Step 2: Click No of the provideJointInfo variable
        cy.xpath(xpathNoOption).click();

        //Step 3: Verify "Before Date TODAY" is not visible
        cy.xpath(xpathBeforeTodayLineInput).should('not.be.visible');

        //Step 4: Click Yes of the provideJointInfo variable
        cy.xpath(xpathYesOption).click();

        //Step 5: Verify "Before Date TODAY" is visible
        cy.xpath(xpathBeforeTodayLineInput).should('be.visible');

        //Step 6: In the Before Date TODAY variable, place a date current date
        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var day = currentDate.getDate();
        var month = currentDate.getMonth()+1;

        var dateFormat = month + '/' + day + '/' + year;

        cy.xpath(xpathBeforeTodayLineInput).type(dateFormat);
        cy.xpath(xpathYesOption).click();
        cy.xpath(messageError).should('be.visible');

        //Step 7: In the Before Date TODAY variable, place a date before the day the test is running.
        day = currentDate.getDate() - 1;
        dateFormat = month + '/' + day + '/' + year;

        cy.xpath(xpathBeforeTodayLineInput).clear();
        cy.xpath(xpathBeforeTodayLineInput).type(dateFormat);
        cy.xpath(xpathYesOption).click();

        //Step 8: Click on new submit button
        cy.xpath(xpathSubmitButton).click();

        //Step 9: Verify that Google page is load
        cy.title().should('eq', 'Google');

        //Step 10: Login PM4 page
        login.navigateToUrl();
        login.login();

        //Step 11: Open the request completed
        navHelper.navigateToAllRequests();
        cy.xpath(xpathRequest).first().should('be.visible').click();

        //Step 12: Verify that request is completed
        cy.xpath(xpathStatusRequest).should('be.visible');
    }

    goToLastTaskAndFillFormTCP4_2397(){
        //cy.get(selectors.lastTask).click();
        cy.get('tr > :nth-child(2) > a').should('be.visible').click();
        cy.get('[data-cy="screen-field-name"]').should('be.visible').type('name1');
        cy.get('[data-cy="screen-field-phone"]').should('be.visible').type('123');
        cy.get('.form-group > .btn').click();
        
    }
    actionsTCP4_2314 (inputone, inputtwo,inputthree){
        //complete recordlist
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class = modal-content]').should('be.visible');
        cy.get('[data-cy="screen-field-form_input_1"]').first().type(inputone).should('have.value',inputone);
        cy.get('[data-cy="screen-field-form_input_2"]').first().type(inputtwo).should('have.value',inputtwo);
        cy.get('[data-cy="screen-field-form_input_3"]').first().type(inputthree).should('have.value',inputthree);
        cy.xpath("//button[text()='Ok']").click();
        cy.xpath("//div[text()='line1']").should('be.visible');
    }
    otherActionsAndSubmitTCP4_2314 (inputoneedit){
        cy.get('thead > tr > [aria-colindex="1"]').click();
        cy.get('thead > tr > [aria-colindex="1"]').click();
        cy.wait(2000);
        cy.get('[title = "Edit"]').first().click();
        cy.get('[debug-context="Record List Edit"]').should('be.visible');
        cy.get('div[name="lineInput"] > div > div > div > div > div  > input[name="form_input_1"]').eq(1).type(inputoneedit);
        cy.xpath("//button[text()='Save']").click();
        cy.wait(2000);
        cy.get('.form-group > .btn').click();
}

    async scenario1OfTCP42414() {
        //Step 1: Press 'Fill the form' button
        cy.get('button').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        //Step 2: Verify 'Personal Dates'
        cy.get('strong').should('be.visible').and("have.text", "Personal Dates")

        //Step 3: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")

        //Step 4 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")

        //Step 5 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').should("be.visible")

        //Step 6: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")

        //Step 7: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 8: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        //Step 9: Fill fields
        cy.get('[data-cy="screen-field-name"]').type('test123')
        cy.get('[data-cy="screen-field-lastName"]').type('lastname123')
        cy.get('input[aria-label="Birthday Date"]').type('06/23/2022')
        cy.get('[data-cy="screen-field-form_input_3"]').type('test')
        cy.get('button[aria-label="New Submit"]').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        //Step 10: validate values in the new screen
        cy.get('[data-cy="screen-field-name"]').should('have.value','test123')
        cy.get('[data-cy="screen-field-lastName"]').should('have.value','lastname123')
        cy.get('input[aria-label="Birthday Date"]').should('have.value','06/23/2022')
        cy.get('[data-cy="screen-field-form_input_3"]').should('have.value','test')

        //Step 11: Verify 'Personal Dates'
        cy.get('strong').should('be.visible').and("have.text", "Personal Dates")

        //Step 12: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")

        //Step 13 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")

        //Step 14 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').should("be.visible")

        //Step 15: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")

        //Step 16: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 17: Verify "Password" field
        cy.get('div[class="form-group"] > label').eq(3).should("be.visible").and("have.text", "Password")
        cy.get('[data-cy="screen-field-password"]').should("be.visible")

        //Step 18: Fill "password" field
        cy.get('[data-cy="screen-field-password"]').type("123456").should("have.value","123456")

        //Step 19: Verify "Confirm Password" field
        cy.get('[class="form-group form-group--error"] > label').should("be.visible").and("have.text", "Confirm Password")
        cy.get('[data-cy="screen-field-confirmPassword"]').type("abc123").should("have.value","abc123")
        cy.get('div[class="alert alert-danger mt-3"] > i').should("be.visible")
        cy.get('[data-cy="screen-field-confirmPassword"]').should("be.visible")

        //Step 20: Fill "Confirm Password" field
        cy.get('[data-cy="screen-field-confirmPassword"]').clear()
        cy.get('[data-cy="screen-field-confirmPassword"]').type("123456").should("have.value","123456")

        //Step 21: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        cy.get('button[aria-label="New Submit"]').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        //Step 22: Verify 'Print Result'
        cy.get('h4 > span > strong').should('be.visible').and("have.text", "Print Result")

        //Step 23: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")
        cy.get('[data-cy="screen-field-name"]').should("have.attr", "readonly", "readonly")

        //Step 24 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")
        cy.get('[data-cy="screen-field-lastName"]').should("have.attr", "readonly", "readonly")

        //Step 25 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').eq(1).should("be.visible")
        cy.get('[aria-label="Birthday Date"]').eq(1).should("have.attr", "disabled")

        //Step 26: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")
        cy.get('[data-cy="screen-field-form_input_3"]').should("have.attr", "readonly", "readonly")

        //Step 27: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 28: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        //Step 29: Verify "password" field
        cy.get('div[class="form-group"] > label').eq(3).should("be.visible").and("have.text", "Password")
        cy.get('[data-cy="screen-field-password"]').should("have.value","123456")
        cy.get('[data-cy="screen-field-password"]').should("have.attr","readonly","readonly")

        //Step 30: Verify "Confirm Password" field
        cy.get('div[class="form-group"] > label').eq(4).should("be.visible").and("have.text", "Confirm Password")
        cy.get('input[name="confirmPassword"]').should("have.attr","readonly","readonly")

        //Step 31: Press Submit button to complete the Request.
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")
        
        cy.get('button[aria-label="New Submit"]').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        cy.get('h3').should('contain','This request is complete')
    }

    async scenario2OfTCP42414() {
        //Step 1: Press 'Fill the form' button
        cy.get('button').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        //Step 2: Verify 'Personal Dates'
        cy.get('strong').should('be.visible').and("have.text", "Personal Dates")

        //Step 3: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")

        //Step 4 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")

        //Step 5 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').should("be.visible")

        //Step 6: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")

        //Step 7: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 8: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        //Step 9: Fill fields
        cy.get('[data-cy="screen-field-name"]').type('test123')
        cy.get('[data-cy="screen-field-lastName"]').type('lastname123')
        cy.get('input[aria-label="Birthday Date"]').type('06/23/2022')
        cy.get('[data-cy="screen-field-form_input_3"]').type('test')
        cy.get('button[aria-label="New Submit"]').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        //Step 10: validate values in the new screen
        cy.get('[data-cy="screen-field-name"]').should('have.value','test123')
        cy.get('[data-cy="screen-field-lastName"]').should('have.value','lastname123')
        cy.get('input[aria-label="Birthday Date"]').should('have.value','06/23/2022')
        cy.get('[data-cy="screen-field-form_input_3"]').should('have.value','test')

        //Step 11: Verify 'Personal Dates'
        cy.get('strong').should('be.visible').and("have.text", "Personal Dates")

        //Step 12: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")

        //Step 13 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")

        //Step 14 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').should("be.visible")

        //Step 15: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")

        //Step 16: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 17: Verify "Password" field
        cy.get('div[class="form-group"] > label').eq(3).should("be.visible").and("have.text", "Password")
        cy.get('[data-cy="screen-field-password"]').should("be.visible")

        //Step 18: Fill "password" field
        cy.get('[data-cy="screen-field-password"]').type("123456").should("have.value","123456")

        //Step 19: Verify "Confirm Password" field
        cy.get('[class="form-group form-group--error"] > label').should("be.visible").and("have.text", "Confirm Password")
        cy.get('[data-cy="screen-field-confirmPassword"]').type("abc123").should("have.value","abc123")
        cy.get('div[class="alert alert-danger mt-3"] > i').should("be.visible")
        cy.get('[data-cy="screen-field-confirmPassword"]').should("be.visible")

        //Step 20: Fill "Confirm Password" field
        cy.get('[data-cy="screen-field-confirmPassword"]').clear()
        cy.get('[data-cy="screen-field-confirmPassword"]').type("123456").should("have.value","123456")

        //Step 21: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        //Wait by 5 minutes until the boundary timer is executed
        cy.wait(60000)
        cy.wait(60000)
        cy.wait(60000)
        cy.wait(60000)
        cy.wait(60000)

        // Verify confirm password field not exist
        cy.get('[data-cy="screen-field-password"]').should("not.exist")
        cy.get('[data-cy="screen-field-confirmPassword"]').should("not.exist")

        //Step 22: Verify 'Personal Dates'
        cy.get('strong').should('be.visible').and("have.text", "Personal Dates")

        //Step 23: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")

        //Step 24 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")

        //Step 25 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').should("be.visible")

        //Step 26: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")

        //Step 27: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 28: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        //Step 29: validate values in the new screen
        cy.get('[data-cy="screen-field-name"]').should('have.value','test123')
        cy.get('[data-cy="screen-field-lastName"]').should('have.value','lastname123')
        cy.get('input[aria-label="Birthday Date"]').should('have.value','06/23/2022')
        cy.get('[data-cy="screen-field-form_input_3"]').should('have.value','test')

        cy.get('button[aria-label="New Submit"]').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        //Step 30: validate values in the new screen
        cy.get('[data-cy="screen-field-name"]').should('have.value','test123')
        cy.get('[data-cy="screen-field-lastName"]').should('have.value','lastname123')
        cy.get('input[aria-label="Birthday Date"]').should('have.value','06/23/2022')
        cy.get('[data-cy="screen-field-form_input_3"]').should('have.value','test')

        //Step 31: Verify 'Personal Dates'
        cy.get('strong').should('be.visible').and("have.text", "Personal Dates")

        //Step 32: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")

        //Step 33 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")

        //Step 34 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').should("be.visible")

        //Step 35: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")

        //Step 36: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 37: Verify "Password" field
        cy.get('div[class="form-group"] > label').eq(3).should("be.visible").and("have.text", "Password")
        cy.get('[data-cy="screen-field-password"]').should("be.visible")

        //Step 38: Fill "password" field
        cy.get('[data-cy="screen-field-password"]').type("123456").should("have.value","123456")

        //Step 39: Verify "Confirm Password" field
        cy.get('[class="form-group form-group--error"] > label').should("be.visible").and("have.text", "Confirm Password")
        cy.get('[data-cy="screen-field-confirmPassword"]').type("abc123").should("have.value","abc123")
        cy.get('div[class="alert alert-danger mt-3"] > i').should("be.visible")
        cy.get('[data-cy="screen-field-confirmPassword"]').should("be.visible")

        //Step 40: Fill "Confirm Password" field
        cy.get('[data-cy="screen-field-confirmPassword"]').clear()
        cy.get('[data-cy="screen-field-confirmPassword"]').type("123456").should("have.value","123456")

        //Step 41: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        cy.get('button[aria-label="New Submit"]').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        //Step 42: Verify 'Print Result'
        cy.get('h4 > span > strong').should('be.visible').and("have.text", "Print Result")

        //Step 43: Verify Name field
        cy.get('div[class="form-group"] > label').eq(0).should("be.visible").and("have.text", "Name")
        cy.get('[data-cy="screen-field-name"]').should("be.visible")
        cy.get('[data-cy="screen-field-name"]').should("have.attr", "readonly", "readonly")

        //Step 44 Verify Last Name field
        cy.get('div[class="form-group"] > label').eq(1).should("be.visible").and("have.text", "Last Name")
        cy.get('[data-cy="screen-field-lastName"]').should("be.visible")
        cy.get('[data-cy="screen-field-lastName"]').should("have.attr", "readonly", "readonly")

        //Step 45 Verify "Birthday Date" field
        cy.get('[data-cy="screen-field-birthdayDate"] > label').should("be.visible").and("have.text","Birthday Date")
        cy.get('[aria-label="Birthday Date"]').eq(1).should("be.visible")
        cy.get('[aria-label="Birthday Date"]').eq(1).should("have.attr", "disabled")

        //Step 46: Verify New Input field
        cy.get('div[class="form-group"] > label').eq(2).should("be.visible").and("have.text", "New Input")
        cy.get('[data-cy="screen-field-form_input_3"]').should("be.visible")
        cy.get('[data-cy="screen-field-form_input_3"]').should("have.attr", "readonly", "readonly")

        //Step 47: Verify Form
        cy.get('div[id="tab-form"]').should('be.visible')

        //Step 48: Verify "New submit" button
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")

        //Step 49: Verify "password" field
        cy.get('div[class="form-group"] > label').eq(3).should("be.visible").and("have.text", "Password")
        cy.get('[data-cy="screen-field-password"]').should("have.value","123456")
        cy.get('[data-cy="screen-field-password"]').should("have.attr","readonly","readonly")

        //Step 50: Verify "Confirm Password" field
        cy.get('div[class="form-group"] > label').eq(4).should("be.visible").and("have.text", "Confirm Password")
        cy.get('input[name="confirmPassword"]').should("have.attr","readonly","readonly")

        //Press Submit button to complete the Request.
        cy.get('button[aria-label="New Submit"]').should('be.visible').and('contain',"New Submit")
        cy.get('button[aria-label="New Submit"]').click()

        //verify icon
        cy.get('svg[class="lds-gear"]').should('be.visible')
        cy.get('svg[class="lds-gear"]').should('not.exist')

        cy.get('h3').should('contain','This request is complete')
    }

    async actionsAndAssertionsOfTCP2429() {
        //Set Variables
        var selectorButtonAdd = '[data-cy="add-row"]';
        var selectorFirstDateControl = '[aria-label="Date"]';
        var selectorSecondDateControl = '[aria-label="DateTime"]';
        var selectorCheckgroupControl = '[data-cy="screen-field-check1"]';
        var selectorLineInputControl = '[data-cy="screen-field-name"]';
        var selectorSelectList = '[data-cy="screen-field-varR"]';
        var selectorSubmitButton = 'button[aria-label="New Submit"]';

        //fill fields to the first Record List (first row)
        cy.get(selectorButtonAdd).click()
        cy.get(selectorFirstDateControl).first().type('10/10/2022')
        cy.get(selectorSecondDateControl).first().type('06/10/2022 11:11')
        cy.get(selectorCheckgroupControl).first().check()
        cy.get(selectorLineInputControl).first().type('Test Name')
        cy.get(selectorSelectList).first().click()
        cy.get('ul > li[id="option-0-2"]').should("be.visible").click()
        cy.get('[class="modal-content"]').contains("Ok").click()

        //fill fields to the first Record List (second row)
        cy.get(selectorButtonAdd).click()
        cy.get(selectorFirstDateControl).first().type('11/11/2023')
        cy.get(selectorSecondDateControl).first().type('02/02/2024 21:00')
        cy.get(selectorCheckgroupControl).first().check()
        cy.get(selectorLineInputControl).first().type('Test Name 2')
        cy.get(selectorSelectList).first().click()
        cy.get('ul > li[id="option-2-1"]').should("be.visible").click()
        cy.get('[class="modal-content"]').contains("Ok").click()

        //fill fields to the first Record List (third row)
        cy.get(selectorButtonAdd).click()
        cy.get(selectorFirstDateControl).first().type('02/02/2021')
        cy.get(selectorSecondDateControl).first().type('09/08/2025 08:25')
        cy.get(selectorCheckgroupControl).first().check()
        cy.get(selectorLineInputControl).first().type('Test Name 3')
        cy.get(selectorSelectList).first().click()
        cy.get('ul > li[id="option-3-3"]').should("be.visible").click()
        cy.get('[class="modal-content"]').contains("Ok").click()

        //send Web Entry
        cy.get(selectorSubmitButton).click()

        //obtain the Request ID from WE's display screen
        cy.get(".page > :nth-child(1) > .form-group > :nth-child(1) > div").then(($requestID) => {
            var RequestID = $requestID.text()

            //Step 2 login PM4 page
            login.navigateToUrl();
            login.login();

            //Step 3 open request
            //navHelper.navigateToAllRequests();
            request.openRequestById(RequestID);

            //Step 4 open the task
            cy.get('tr > :nth-child(1) > a').first().click()

            //Verify values for the First Row and first Record List

            cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="1"]').eq(0).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('2022-10-10')
            })

            cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="2"]').eq(0).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('2022-06-10 11:11')
            })

            cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="3"]').eq(0).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('Test Name')
            })

            cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="4"]').eq(0).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('var3')
            })

            cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="5"]').eq(0).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('true')
            })

            //Verify values for the Second Row and first Record List
            cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="1"]').eq(0).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('2023-11-11')
            })

            cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="2"]').eq(0).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('2024-02-02 21:00')
            })

            cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="3"]').eq(0).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('Test Name 2')
            })

            cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="4"]').eq(0).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('var2')
            })

            cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="5"]').eq(0).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('true')
            })

            //Verify values for the Third Row and first Record List
            cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="1"]').eq(0).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('2021-02-02')
            })

            cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="2"]').eq(0).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('2025-09-08 08:25')
            })

            cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="3"]').eq(0).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('Test Name 3')
            })

            cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="4"]').eq(0).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('var4')
            })

            cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="5"]').eq(0).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('true')
            })

            //Verify values for the First Row and Second Record List

            cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="1"]').eq(1).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('2022-10-10')
            })

            cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="2"]').eq(1).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('2022-06-10 11:11')
            })

            cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="3"]').eq(1).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('Test Name')
            })

            cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="4"]').eq(1).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('var3')
            })

            cy.get('tbody > [aria-rowindex="1"] > [aria-colindex="5"]').eq(1).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('true')
            })

            //Verify values for the Second Row and Second Record List
            cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="1"]').eq(1).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('2023-11-11')
            })

            cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="2"]').eq(1).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('2024-02-02 21:00')
            })

            cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="3"]').eq(1).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('Test Name 2')
            })

            cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="4"]').eq(1).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('var2')
            })

            cy.get('tbody > [aria-rowindex="2"] > [aria-colindex="5"]').eq(1).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('true')
            })

            //Verify values for the Third Row and Second Record List
            cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="1"]').eq(1).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('2021-02-02')
            })

            cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="2"]').eq(1).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('2025-09-08 08:25')
            })

            cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="3"]').eq(1).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('Test Name 3')
            })

            cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="4"]').eq(1).invoke('text').then((VarDate) => {
                expect(VarDate.trim()).to.equal('var4')
            })

            cy.get('tbody > [aria-rowindex="3"] > [aria-colindex="5"]').eq(1).invoke('text').then((control) => {
                expect(control.trim()).to.equal('true')
            })
        })
    }
    async actionsAndAssertionsOfTCP42388(){
        //webentry
        var selectorSubmitButton = "//button[contains(text(),'New Submit')]";
        var selectorMenuEcosia = "//header/div[1]/div[5]/div[1]/button[1]/*[1]";
        cy.xpath(selectorSubmitButton).should('be.visible');
        cy.xpath(selectorSubmitButton).click();
        cy.xpath(selectorMenuEcosia).should('be.visible');
        //processmaker
        login.navigateToUrl();
        login.login();
        navHelper.navigateToSelfServiceSaveSearch();
        var processname = "form";
        tasks.searchTaskName(processname);
        tasks.openSelfServiceTask();
        var selectorSubmitButtonForm = ".form-group > .btn";
        cy.get(selectorSubmitButtonForm).should('be.visible');
        cy.get(selectorSubmitButtonForm).click();
        cy.title().should('eq', 'To Do Tasks - ProcessMaker');
    }

    async actionsOfTCP2305(yearVar,monthVar){
        //Step 1: Fill "New Date Picker 1" field
        cy.get('input[aria-label="New Date Picker 1"]').click();
        screen.useCustomDate('2022','Nov','20');

        //Step 2: Fill "New Date Picker 2" field
        cy.get('input[aria-label="New Date Picker 2"]').click();
        screen.openOptionTimeCalendar();
        screen.selectHour('02');
        screen.selectMinute('40');
        screen.incrementMinute();
        screen.incrementMinute();
        screen.openOptionTimeCalendar();
        screen.selectMonth();
        screen.selectYear();
        screen.selectCustomYear('2023');
        screen.selectCustomMonth('Apr');
        screen.selectDay('24');
        screen.closePicker();

        //Step 3: Fill "New Date Picker 3" field
        cy.get('input[aria-label="New Date Picker 3"]').click();
        screen.useCustomDate('2024','Aug','27');
        //Step 4: Add a new datepicker in the loop
        cy.get('[data-cy="loop-loop_1-add"]').click();
        cy.get('input[aria-label="New Date Picker 3"]').eq(1).click();
        screen.useCustomDate('2022','Dec','25');

        //Step 5: Fill "New Date Picker 4" field
        cy.get('input[aria-label="New Date Picker 4"]').click();
        screen.useCustomDateTime('2027','Oct','8','05','55');
        cy.get('[data-cy="loop-loop_2-add"]').click();
        //Step 6: Add a new datepicker in the loop
        cy.get('input[aria-label="New Date Picker 4"]').eq(1).click();
        screen.useCustomDateTime('2026','May','13','10','20');

        //Step 7: Open Record List
        cy.get('[data-cy="add-row"]').click();
        //var timeStamp = new Date();
        //var yearVar = timeStamp.getFullYear();
        //var monthVar = timeStamp.getMonth();
        //const literalMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        //Step 8: Fill datepicker 1
        cy.get('input[aria-label="date time"]').eq(0).click();
        screen.useCustomDateTime(yearVar,monthVar,'11','01','10');

        //Step 9: Fill datepicker 2
        cy.get('[aria-label="date"]').eq(0).click();
        screen.useCustomDate(yearVar,monthVar,'20');

        //Step 10: Click datepicker MIN
        cy.get('input[aria-label="min"]').eq(0).click();

        //Step 11: verify that the day is disabled for the datepicker MIN
        cy.contains('td[data-action="selectDay"]',10).should('have.class','day disabled');

        //Step 12: Verify that other date and time inside correct range is selected
        
		//screen.selectMonth();
        //screen.selectYear();
        //screen.selectCustomYear(yearVar);
        //screen.selectCustomMonth(literalMonths[monthVar]);
        screen.selectDay('11');
        screen.openOptionTimeCalendar();
        screen.selectHour('01');
        //cy.get('input[aria-label="min"]').eq(0).click();
        screen.openOptionTimeCalendar();
        screen.selectMinute('15');
		screen.closePicker();

        //Step 13: Click datepicker MAX
        cy.get('input[aria-label="max"]').eq(0).click();

        //Step 14: Verify that the day is disabled for the datepicker MAX
        cy.contains('td[data-action="selectDay"]',12).should('have.class','day disabled');

        //Step 15: Verify that other date and time inside correct range is selected
		screen.selectMonth();
        screen.selectYear();
        screen.selectCustomYear(yearVar);
        screen.selectCustomMonth(monthVar);
        screen.selectDay('10');
        screen.openOptionTimeCalendar();
        screen.selectHour('01');
        cy.get('input[aria-label="max"]').eq(0).click();
        screen.openOptionTimeCalendar();
        screen.selectMinute('15');
		screen.closePicker();

        //Step 16: Click datepicker MIN DATE
        cy.get('input[aria-label="Min Date"]').eq(0).click();

        //Step 17: Verify that the day is disabled for the datepicker MIN DATE
        cy.contains('td[data-action="selectDay"]',19).should('have.class','day disabled');

        //Step 18: Verify that other date and time inside correct range is selected
		screen.selectMonth();
        screen.selectYear();
        screen.selectCustomYear(yearVar);
        screen.selectCustomMonth(monthVar);
        screen.selectDay('21');

        //Step 19: Click datepicker MAX DATE
        cy.get('input[aria-label="max date"]').eq(0).click();

        //Step 20: Verify that the day is disabled for the datepicker MAX DATE
        cy.contains('td[data-action="selectDay"]',21).should('have.class','day disabled');

        //Step 21: Verify that other date and time inside correct range is selected
		screen.selectMonth();
        screen.selectYear();
        screen.selectCustomYear(yearVar);
        screen.selectCustomMonth(monthVar);
        screen.selectDay('19');

        //Step 22: Close record list
        cy.get('button').contains('Ok').click();

        /**
        * search Request ID according to card
        **/
        cy.get('div[class="card"] > ul > li > a').invoke('text').then((URL) => {
            URL=URL.trim();
            var requestID = URL.substring(1,URL.indexOf(' '));

            //Step 23: Submit request
            cy.get('[aria-label="New Submit"]').eq(3).click();

            //Step 24: Open the Request
            request.openRequestById(requestID);
        });

    }

    async assertionsOfTCP2305(yearVar,monthVar){
        //verify fields      
        cy.get('tr > td[aria-colindex="1"]').should('contain.text',monthVar+'/11/'+yearVar+' 01:10');
        cy.get('tr > td[aria-colindex="2"]').should('contain.text',monthVar+'/11/'+yearVar+' 01:15');
        cy.get('tr > td[aria-colindex="3"]').should('contain.text',monthVar+'/10/'+yearVar+' 01:15');
        cy.get('tr > td[aria-colindex="4"]').should('contain.text',monthVar+'/20/'+yearVar);
        cy.get('tr > td[aria-colindex="5"]').should('contain.text',monthVar+'/21/'+yearVar);
        cy.get('tr > td[aria-colindex="6"]').should('contain.text',monthVar+'/19/'+yearVar);

        cy.get('div > p').eq(0).should('have.text','11/20/2022');
        cy.get('div > p').eq(1).should('have.text','04/24/2023 02:42');
        cy.get('div > p').eq(2).should('have.text','08/27/2024');
        cy.get('div > p').eq(3).should('have.text','12/25/2022');
        cy.get('div > p').eq(5).should('have.text','09/28/2027 05:55');
        cy.get('div > p').eq(6).should('have.text','05/13/2026 10:20');
    }
///////////////////
async actionsAndAssertionsOfTCP42332_1(taskName, process_id, subprocess_id, subprocessName, processName){
    // press + button on the loop control
    cy.get('button[title="Add Item"]').click();
    cy.get('input[name="form_input_1"]').eq(0).type('test 1').should('have.value','test 1');
    cy.get('button[title="Add Item"]').click();
    cy.get('input[name="form_input_1"]').eq(1).type('test 2').should('have.value','test 2');

    // fill line inputs
    cy.get('input[name="decimal"]').type('1.1').should('have.value','1.1');
    cy.get('input[name="integer"]').type('1').should('have.value','1');

    /**
    * search Request ID according to card
    **/
    cy.get('div[class="card"] > ul > li > a').invoke('text').then((URL) => {    
        URL=URL.trim();
        var requestID = URL.substring(1,URL.indexOf(' '));

        //press submit button
        cy.get('button[aria-label="New Submit"]').click();

        //Open Request
        navHelper.navigateToInprogressRequests();
        cy.visit('/requests/'+requestID);
        cy.location('href').should('include', '/requests/'+requestID);

        //verify Main Request status
        cy.get('div[class="card"] > div > h4').should('have.text', 'In Progress');

        //Verify that 2 threads are displayed
        cy.get('div[class="card"] > ul > li > div > i').should('have.length',2);

        //Verify the process name according to Sub process
        cy.get('div[class="card"] > ul > li > div > a').eq(0).should('have.contain',subprocessName);
        cy.get('div[class="card"] > ul > li > div > a').eq(1).should('have.contain',subprocessName);

        //Open the first subprocess
        cy.get('div[class="card"] > ul > li > div > a').eq(0).click();

        //fill fields in the first subprocess
        cy.get('tr > :nth-child(2) > a').eq(0).should('contain', taskName);
        cy.get('tr > :nth-child(2) > a').eq(0).click();

        // press + button on the loop control
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(0).type('test subprocess 1A').should('have.value','test subprocess 1A');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(1).type('test subprocess 2A').should('have.value','test subprocess 2A');

        cy.get('input[name="decimal"]').type('12.2').should('have.value','12.2');
        cy.get('input[name="integer"]').type('4').should('have.value','4');

        //press submit button
        cy.get('button[aria-label="New Submit"]').click();

        //Open the second subprocess
        cy.get('div[class="card"] > ul > li > div > a').eq(1).click();

        //fill fields in the second subprocess
        cy.get('tr > :nth-child(2) > a').eq(0).should('contain', taskName);
        cy.get('tr > :nth-child(2) > a').eq(0).click();

        // press + button on the loop control
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(0).type('test subprocess 1B').should('have.value','test subprocess 1B');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(1).type('test subprocess 2B').should('have.value','test subprocess 2B');

        cy.get('input[name="decimal"]').type('10123.2').should('have.value','10123.2');
        cy.get('input[name="integer"]').type('263').should('have.value','263');

        //press submit button to complete the request
        cy.get('button[aria-label="New Submit"]').click();

        //verify Main Request status
        cy.get('div[class="card"] > div > h4').should('have.text', 'Completed');

        //Verify that 2 threads are displayed in the Main
        cy.get('div[class="card"] > ul > li > div > i').should('have.length',2);

        //Verify the process name according to Sub process
        cy.get('div[class="card"] > ul > li > div > a').eq(0).should('have.contain',subprocessName);
        cy.get('div[class="card"] > ul > li > div > a').eq(1).should('have.contain',subprocessName);

        //Verify data in each row in the summary tab for the main process    
        cy.get('tbody[role="rowgroup"] > tr').should('have.length', 14)
        cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(0).should('have.text','loop_1.0.loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(1).should('have.text','test subprocess 1A')

        cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(0).should('have.text','loop_1.0.loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(1).should('have.text','test subprocess 2A')

        cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(0).should('have.text','loop_1.0.decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(1).should('have.text','12.2')

        cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(0).should('have.text','loop_1.0.integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(1).should('have.text','4')

        cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(0).should('have.text','loop_1.0.loopCounter')
        cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(1).should('have.text','1')

        cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(0).should('have.text','loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(1).should('have.text','test 1')

        cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(0).should('have.text','loop_1.1.loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(1).should('have.text','test subprocess 1B')

        cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(0).should('have.text','loop_1.1.loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(1).should('have.text','test subprocess 2B')

        cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(0).should('have.text','loop_1.1.decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(1).should('have.text','10123.2')

        cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(0).should('have.text','loop_1.1.integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(1).should('have.text','263')

        cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(0).should('have.text','loop_1.1.loopCounter')
        cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(1).should('have.text','2')

        cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(0).should('have.text','loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(1).should('have.text','test 2')

        cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(0).should('have.text','decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(1).should('have.text','1.1')

        cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(0).should('have.text','integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(1).should('have.text','1')

        //Validate the first subprocess
        //open subprocess
        cy.get('div[class="card"] > ul > li > div > a').eq(0).click();

        //Validate first subprocess status
        cy.get('div[class="card"] > div > h4').should('have.text', 'Completed');

        cy.get('tbody[role="rowgroup"] > tr').should('have.length', 20)
        cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(0).should('have.text','loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(1).should('have.text','test subprocess 1A')

        cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(0).should('have.text','loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(1).should('have.text','test subprocess 2A')

        cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(0).should('have.text','_parent.config.name')
        cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(1).should('have.contain',subprocessName)

        cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(0).should('have.text','_parent.config.processId')
        cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(1).should('have.text',subprocess_id)

        cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(0).should('have.text','_parent.config.startEvent')
        cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(1).should('have.text','node_1')

        cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(0).should('have.text','_parent.config.calledElement')
        cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(1).should('have.text','ProcessId-'+subprocess_id)

        cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(0).should('have.text','_parent.loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(1).should('have.text','test 1')

        cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(0).should('have.text','_parent.loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(1).should('have.text','test 2')

        cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(0).should('have.text','_parent.decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(1).should('have.text','1.1')

        cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(0).should('have.text','_parent.integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(1).should('have.text','1')

        cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(0).should('have.text','_parent.node_id')
        cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(1).should('have.text','node_19')

        cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(0).should('have.text','_parent.process_id')
        cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(1).should('have.text', process_id)

        cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(0).should('have.text','_parent.request_id')
        cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(1).should('have.text',requestID)

        cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(0).should('have.text','decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(1).should('have.text','12.2')

        cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(0).should('have.text','integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(1).should('have.text','4')

        cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(0).should('have.text','loopCounter')
        cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(1).should('have.text','1')

        cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(0).should('have.text','form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(1).should('have.text','test 1')

        cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(0).should('have.text','numberOfInstances')
        cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(1).should('have.text','2')

        cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(0).should('have.text','numberOfActiveInstances')
        cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(1).should('have.text','2')

        cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(0).should('have.text','numberOfCompletedInstances')
        cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(1).should('have.text','0')

        //Return to main process
        cy.get('div[class="card"] > ul > li > a').should('have.contain',processName)
        cy.get('div[class="card"] > ul > li > a').click();

        //Validate second subprocess
        //open subprocess
        cy.get('div[class="card"] > ul > li > div > a').eq(1).click();

        //Validate first subprocess status
        cy.get('div[class="card"] > div > h4').should('have.text', 'Completed');

        cy.get('tbody[role="rowgroup"] > tr').should('have.length', 20)
        cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(0).should('have.text','loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(1).should('have.text','test subprocess 1B')

        cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(0).should('have.text','loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(1).should('have.text','test subprocess 2B')

        cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(0).should('have.text','_parent.config.name')
        cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(1).should('have.contain',subprocessName)

        cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(0).should('have.text','_parent.config.processId')
        cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(1).should('have.text',subprocess_id)

        cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(0).should('have.text','_parent.config.startEvent')
        cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(1).should('have.text','node_1')

        cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(0).should('have.text','_parent.config.calledElement')
        cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(1).should('have.text','ProcessId-'+subprocess_id)

        cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(0).should('have.text','_parent.loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(1).should('have.text','test 1')

        cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(0).should('have.text','_parent.loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(1).should('have.text','test 2')

        cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(0).should('have.text','_parent.decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(1).should('have.text','1.1')

        cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(0).should('have.text','_parent.integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(1).should('have.text','1')

        cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(0).should('have.text','_parent.node_id')
        cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(1).should('have.text','node_19')

        cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(0).should('have.text','_parent.process_id')
        cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(1).should('have.text',process_id)

        cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(0).should('have.text','_parent.request_id')
        cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(1).should('have.text',requestID)

        cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(0).should('have.text','decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(1).should('have.text','10123.2')

        cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(0).should('have.text','integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(1).should('have.text','263')

        cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(0).should('have.text','loopCounter')
        cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(1).should('have.text','2')

        cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(0).should('have.text','form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(1).should('have.text','test 2')

        cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(0).should('have.text','numberOfInstances')
        cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(1).should('have.text','2')

        cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(0).should('have.text','numberOfActiveInstances')
        cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(1).should('have.text','2')

        cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(0).should('have.text','numberOfCompletedInstances')
        cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(1).should('have.text','0')
    });  
}

async actionsAndAssertionsOfTCP42332_4(taskName, process_id, subprocess_id, subprocessName, processName){
    // press + button on the loop control
    cy.get('button[title="Add Item"]').click();
    cy.get('input[name="form_input_1"]').eq(0).type('test 1').should('have.value','test 1');
    cy.get('button[title="Add Item"]').click();
    cy.get('input[name="form_input_1"]').eq(1).type('test 2').should('have.value','test 2');
    cy.get('button[title="Add Item"]').click();
    cy.get('input[name="form_input_1"]').eq(2).type('test 3').should('have.value','test 3');

    // fill line inputs
    cy.get('input[name="decimal"]').type('1.1').should('have.value','1.1');
    cy.get('input[name="integer"]').type('1').should('have.value','1');

    /**
    * search Request ID according to card
    **/
    cy.get('div[class="card"] > ul > li > a').invoke('text').then((URL) => {    
        URL=URL.trim();
        var requestID = URL.substring(1,URL.indexOf(' '));

        //press submit button
        cy.get('button[aria-label="New Submit"]').click();

        //Open Request
        navHelper.navigateToInprogressRequests();
        cy.visit('/requests/'+requestID);
        cy.location('href').should('include', '/requests/'+requestID);

        //verify Main Request status
        cy.get('div[class="card"] > div > h4').should('have.text', 'In Progress');

        cy.reload();

        //Verify that 3 threads are displayed
        cy.get('div[class="card"] > ul > li > div > i').should('have.length',3);

        //Verify the process name according to Sub process
        cy.get('div[class="card"] > ul > li > div > a').eq(0).should('have.contain',subprocessName);
        cy.get('div[class="card"] > ul > li > div > a').eq(1).should('have.contain',subprocessName);
        cy.get('div[class="card"] > ul > li > div > a').eq(2).should('have.contain',subprocessName);

        //// Open the first subprocess
        cy.get('div[class="card"] > ul > li > div > a').eq(0).click();

        //fill fields in the first subprocess
        cy.get('tr > :nth-child(2) > a').eq(0).should('contain', taskName);
        cy.get('tr > :nth-child(2) > a').eq(0).click();

        // press + button on the loop control
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(0).type('test subprocess 1A').should('have.value','test subprocess 1A');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(1).type('test subprocess 2A').should('have.value','test subprocess 2A');

        cy.get('input[name="decimal"]').type('12.2');
        cy.get('input[name="integer"]').type('4');

        //press submit button
        cy.get('button[aria-label="New Submit"]').click();

        //Open the second subprocess
        cy.get('div[class="card"] > ul > li > div > a').eq(1).click();

        //fill fields in the second subprocess
        cy.get('tr > :nth-child(2) > a').eq(0).should('contain', taskName);
        cy.get('tr > :nth-child(2) > a').eq(0).click();

        // press + button on the loop control
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(0).type('test subprocess 1B').should('have.value','test subprocess 1B');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(1).type('test subprocess 2B').should('have.value','test subprocess 2B');

        cy.get('input[name="decimal"]').type('10123.2');
        cy.get('input[name="integer"]').type('263');

        //press submit button to complete the request
        cy.get('button[aria-label="New Submit"]').click();

        //// Open the third subprocess
        cy.get('div[class="card"] > ul > li > div > a').eq(2).click();

        //fill fields in the first subprocess
        cy.get('tr > :nth-child(2) > a').eq(0).should('contain', taskName);
        cy.get('tr > :nth-child(2) > a').eq(0).click();

        // press + button on the loop control
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(0).type('test subprocess 1C').should('have.value','test subprocess 1C');
        cy.get('button[title="Add Item"]').click();
        cy.get('input[name="form_input_1"]').eq(1).type('test subprocess 2C').should('have.value','test subprocess 2C');

        cy.get('input[name="decimal"]').type('111.1');
        cy.get('input[name="integer"]').type('4546');

        //press submit button
        cy.get('button[aria-label="New Submit"]').click();

        //verify Main Request status
        cy.get('div[class="card"] > div > h4').should('have.text', 'Completed');

        //Verify that 3 threads are displayed in the Main
        cy.get('div[class="card"] > ul > li > div > i').should('have.length',3);

        //Verify the process name according to Sub process
        cy.get('div[class="card"] > ul > li > div > a').eq(0).should('have.contain',subprocessName);
        cy.get('div[class="card"] > ul > li > div > a').eq(1).should('have.contain',subprocessName);
        cy.get('div[class="card"] > ul > li > div > a').eq(2).should('have.contain',subprocessName);

        //Verify data in each row in the summary tab for the main process    
        cy.get('tbody[role="rowgroup"] > tr').should('have.length', 20)
        cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(0).should('have.text','loop_1.0.loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(1).should('have.text','test subprocess 1A')

        cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(0).should('have.text','loop_1.0.loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(1).should('have.text','test subprocess 2A')

        cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(0).should('have.text','loop_1.0.decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(1).should('have.text','12.2')

        cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(0).should('have.text','loop_1.0.integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(1).should('have.text','4')

        cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(0).should('have.text','loop_1.0.loopCounter')
        cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(1).should('have.text','1')

        cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(0).should('have.text','loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(1).should('have.text','test 1')

        cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(0).should('have.text','loop_1.1.loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(1).should('have.text','test subprocess 1B')

        cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(0).should('have.text','loop_1.1.loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(1).should('have.text','test subprocess 2B')

        cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(0).should('have.text','loop_1.1.decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(1).should('have.text','10123.2')

        cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(0).should('have.text','loop_1.1.integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(1).should('have.text','263')

        cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(0).should('have.text','loop_1.1.loopCounter')
        cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(1).should('have.text','2')

        cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(0).should('have.text','loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(1).should('have.text','test 2')

        cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(0).should('have.text','loop_1.2.loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(1).should('have.text','test subprocess 1C')

        cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(0).should('have.text','loop_1.2.loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(1).should('have.text','test subprocess 2C')

        cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(0).should('have.text','loop_1.2.decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(1).should('have.text','111.1')

        cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(0).should('have.text','loop_1.2.integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(1).should('have.text','4546')

        cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(0).should('have.text','loop_1.2.loopCounter')
        cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(1).should('have.text','3')

        cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(0).should('have.text','loop_1.2.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(1).should('have.text','test 3')

        cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(0).should('have.text','decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(1).should('have.text','1.1')

        cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(0).should('have.text','integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(1).should('have.text','1')

        //Validate the first subprocess
        //open subprocess
        cy.get('div[class="card"] > ul > li > div > a').eq(0).click();

        //Validate first subprocess status
        cy.get('div[class="card"] > div > h4').should('have.text', 'Completed');

        cy.get('tbody[role="rowgroup"] > tr').should('have.length', 21)
        cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(0).should('have.text','loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(1).should('have.text','test subprocess 1A')

        cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(0).should('have.text','loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(1).should('have.text','test subprocess 2A')

        cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(0).should('have.text','_parent.config.name')
        cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(1).should('have.contain',subprocessName);

        cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(0).should('have.text','_parent.config.processId')
        cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(1).should('have.text',subprocess_id)

        cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(0).should('have.text','_parent.config.startEvent')
        cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(1).should('have.text','node_1')

        cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(0).should('have.text','_parent.config.calledElement')
        cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(1).should('have.text','ProcessId-'+subprocess_id)

        cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(0).should('have.text','_parent.loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(1).should('have.text','test 1')

        cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(0).should('have.text','_parent.loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(1).should('have.text','test 2')

        cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(0).should('have.text','_parent.loop_1.2.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(1).should('have.text','test 3')

        cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(0).should('have.text','_parent.decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(1).should('have.text','1.1')

        cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(0).should('have.text','_parent.integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(1).should('have.text','1')

        cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(0).should('have.text','_parent.node_id')
        cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(1).should('have.text','node_19')

        cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(0).should('have.text','_parent.process_id')
        cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(1).should('have.text',process_id)

        cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(0).should('have.text','_parent.request_id')
        cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(1).should('have.text',requestID)

        cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(0).should('have.text','decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(1).should('have.text','12.2')

        cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(0).should('have.text','integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(1).should('have.text','4')

        cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(0).should('have.text','loopCounter')
        cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(1).should('have.text','1')

        cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(0).should('have.text','form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(1).should('have.text','test 1')

        cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(0).should('have.text','numberOfInstances')
        cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(1).should('have.text','3')

        cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(0).should('have.text','numberOfActiveInstances')
        cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(1).should('have.text','3')

        cy.get('tbody[role="rowgroup"] > tr').eq(20).find('td').eq(0).should('have.text','numberOfCompletedInstances')
        cy.get('tbody[role="rowgroup"] > tr').eq(20).find('td').eq(1).should('have.text','0')

        //Return to main process
        cy.get('div[class="card"] > ul > li > a').should('have.contain',processName)
        cy.get('div[class="card"] > ul > li > a').click();

        //Validate second subprocess
        //open subprocess
        cy.get('div[class="card"] > ul > li > div > a').eq(1).click();

        //Validate second subprocess status
        cy.get('div[class="card"] > div > h4').should('have.text', 'Completed');

        cy.get('tbody[role="rowgroup"] > tr').should('have.length', 21)
        cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(0).should('have.text','loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(1).should('have.text','test subprocess 1B')

        cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(0).should('have.text','loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(1).should('have.text','test subprocess 2B')

        cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(0).should('have.text','_parent.config.name')
        cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(1).should('have.contain',subprocessName);

        cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(0).should('have.text','_parent.config.processId')
        cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(1).should('have.text',subprocess_id)

        cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(0).should('have.text','_parent.config.startEvent')
        cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(1).should('have.text','node_1')

        cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(0).should('have.text','_parent.config.calledElement')
        cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(1).should('have.text','ProcessId-'+subprocess_id)

        cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(0).should('have.text','_parent.loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(1).should('have.text','test 1')

        cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(0).should('have.text','_parent.loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(1).should('have.text','test 2')

        cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(0).should('have.text','_parent.loop_1.2.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(1).should('have.text','test 3')

        cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(0).should('have.text','_parent.decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(1).should('have.text','1.1')

        cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(0).should('have.text','_parent.integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(1).should('have.text','1')

        cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(0).should('have.text','_parent.node_id')
        cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(1).should('have.text','node_19')

        cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(0).should('have.text','_parent.process_id')
        cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(1).should('have.text',process_id)

        cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(0).should('have.text','_parent.request_id')
        cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(1).should('have.text',requestID)

        cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(0).should('have.text','decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(1).should('have.text','10123.2')

        cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(0).should('have.text','integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(1).should('have.text','263')

        cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(0).should('have.text','loopCounter')
        cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(1).should('have.text','2')

        cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(0).should('have.text','form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(1).should('have.text','test 2')

        cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(0).should('have.text','numberOfInstances')
        cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(1).should('have.text','3')

        cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(0).should('have.text','numberOfActiveInstances')
        cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(1).should('have.text','3')

        cy.get('tbody[role="rowgroup"] > tr').eq(20).find('td').eq(0).should('have.text','numberOfCompletedInstances')
        cy.get('tbody[role="rowgroup"] > tr').eq(20).find('td').eq(1).should('have.text','0')

        //Return to main process
        cy.get('div[class="card"] > ul > li > a').should('have.contain',processName)
        cy.get('div[class="card"] > ul > li > a').click();

        //Validate third subprocess
        //open subprocess
        cy.get('div[class="card"] > ul > li > div > a').eq(2).click();

        //Validate third subprocess status
        cy.get('div[class="card"] > div > h4').should('have.text', 'Completed');

        cy.get('tbody[role="rowgroup"] > tr').should('have.length', 21)
        cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(0).should('have.text','loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(0).find('td').eq(1).should('have.text','test subprocess 1C')

        cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(0).should('have.text','loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(1).find('td').eq(1).should('have.text','test subprocess 2C')

        cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(0).should('have.text','_parent.config.name')
        cy.get('tbody[role="rowgroup"] > tr').eq(2).find('td').eq(1).should('have.contain',subprocessName)

        cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(0).should('have.text','_parent.config.processId')
        cy.get('tbody[role="rowgroup"] > tr').eq(3).find('td').eq(1).should('have.contain',subprocess_id);

        cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(0).should('have.text','_parent.config.startEvent')
        cy.get('tbody[role="rowgroup"] > tr').eq(4).find('td').eq(1).should('have.text','node_1')

        cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(0).should('have.text','_parent.config.calledElement')
        cy.get('tbody[role="rowgroup"] > tr').eq(5).find('td').eq(1).should('have.text','ProcessId-'+subprocess_id)

        cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(0).should('have.text','_parent.loop_1.0.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(6).find('td').eq(1).should('have.text','test 1')

        cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(0).should('have.text','_parent.loop_1.1.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(7).find('td').eq(1).should('have.text','test 2')

        cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(0).should('have.text','_parent.loop_1.2.form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(8).find('td').eq(1).should('have.text','test 3')

        cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(0).should('have.text','_parent.decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(9).find('td').eq(1).should('have.text','1.1')

        cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(0).should('have.text','_parent.integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(10).find('td').eq(1).should('have.text','1')

        cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(0).should('have.text','_parent.node_id')
        cy.get('tbody[role="rowgroup"] > tr').eq(11).find('td').eq(1).should('have.text','node_19')

        cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(0).should('have.text','_parent.process_id')
        cy.get('tbody[role="rowgroup"] > tr').eq(12).find('td').eq(1).should('have.text',process_id)

        cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(0).should('have.text','_parent.request_id')
        cy.get('tbody[role="rowgroup"] > tr').eq(13).find('td').eq(1).should('have.text',requestID)

        cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(0).should('have.text','decimal')
        cy.get('tbody[role="rowgroup"] > tr').eq(14).find('td').eq(1).should('have.text','111.1')

        cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(0).should('have.text','integer')
        cy.get('tbody[role="rowgroup"] > tr').eq(15).find('td').eq(1).should('have.text','4546')

        cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(0).should('have.text','loopCounter')
        cy.get('tbody[role="rowgroup"] > tr').eq(16).find('td').eq(1).should('have.text','3')

        cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(0).should('have.text','form_input_1')
        cy.get('tbody[role="rowgroup"] > tr').eq(17).find('td').eq(1).should('have.text','test 3')

        cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(0).should('have.text','numberOfInstances')
        cy.get('tbody[role="rowgroup"] > tr').eq(18).find('td').eq(1).should('have.text','3')

        cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(0).should('have.text','numberOfActiveInstances')
        cy.get('tbody[role="rowgroup"] > tr').eq(19).find('td').eq(1).should('have.text','3')

        cy.get('tbody[role="rowgroup"] > tr').eq(20).find('td').eq(0).should('have.text','numberOfCompletedInstances')
        cy.get('tbody[role="rowgroup"] > tr').eq(20).find('td').eq(1).should('have.text','0')
    });  
}
//////////////////////

    async verifyRichTextTCP42310(){
        cy.wait(5000);
        request.openNewRequest("Verify Rich Text in Four Different Type of Screen");
        cy.wait(5000);
        cy.get('.col-2 > .btn').click();
        cy.wait(5000);
        cy.get('tr > :nth-child(2) > a').click();
        cy.wait(5000);
        cy.get('[data-cy="screen-field-input"]').type('test1');
        cy.get(':nth-child(3) > .form-group > :nth-child(1) > div > p').should('have.text','test1');
        cy.get('.form-group > .btn').click();
        cy.wait(5000);
        cy.get('[item-index="0"] > :nth-child(3) > a').click();
        cy.get('#pending > .data-table > div > .vuetable > .vuetable-body > tr > :nth-child(2) > a').click();
        cy.get(':nth-child(3) > .form-group > :nth-child(1) > div > p').should('have.text','test1');
        cy.get('.card-footer > .btn').click();
        cy.get('[item-index="0"] > :nth-child(3) > a').click();
        cy.get('#pending > .data-table > div > .vuetable > .vuetable-body > tr > :nth-child(2) > a').click();
        cy.get(':nth-child(3) > .message > div > span > p').should('have.text','test1');
        cy.get('.d-block > .btn').click();
    }

    async verifySelectListValuesTCP42325(){
        navHelper.navigateToAllRequests();
        cy.wait(5000);
        request.openNewRequest("TCP4-2325 Process select list");
        cy.wait(5000);
        cy.get('.col-2 > .btn').click();
        cy.wait(5000);
        cy.get('tr > :nth-child(2) > a').click();
        cy.xpath('/html[1]/body[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/input[1]').eq(0).should('have.value','3');
        //select list
        cy.get('div[class="multiselect__select"]').first().click();
        cy.get('ul[id="listbox-0"] > li[id="option-0-0"]').click();
        //cy.get('.multiselect__tags').eq(0).select('Uno');
        cy.xpath('/html[1]/body[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/input[1]').eq(0).should('have.value','Uno');
        cy.get('div[class="multiselect__select"]').first().click();
        cy.get('ul[id="listbox-0"] > li[id="option-0-2"]').click();
        cy.xpath('/html[1]/body[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/input[1]').eq(0).should('have.value','Tres');
        cy.get('.form-group > .btn').click();
        cy.get('[item-index="0"] > :nth-child(3) > a').click();
        cy.get('#pending > .data-table > div > .vuetable > .vuetable-body > tr > :nth-child(2) > a').click();
        cy.xpath('/html[1]/body[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/input[1]').eq(0).should('have.value','Tres');
        cy.get('.form-group > .btn').click();

    }
    async actionsTCP42345(example){
        cy.get('[data-cy="screen-field-form_checkbox_1"]').click();
        cy.get('[data-cy="screen-field-form_input_1"]').should('be.visible');
        cy.get('[data-cy="screen-field-form_input_1"]').type('example').should('have.value', 'example');
        cy.get('div[class="multiselect__select"]').should('be.visible');
        cy.get('div[class="multiselect__select"]').first().click();
        cy.get('ul[id="listbox-0"] > li[id="option-0-1"]').click();
        cy.get('[name="form_text_area_1"]').should('be.visible').type('example');
        cy.get('[class="btn btn-secondary text-white"]').should('be.visible');
        //upload file
        const file = 'drone.jpg';
        cy.get('input[data-cy="file-upload-button"]').attachFile(file);
        cy.get('div[class="uploader-file-status"] > span').should('contain.text','success');
        //google placess
        cy.get('input[class="form-control pac-target-input"]').click();
        cy.get('input[class="form-control pac-target-input"]').type("Bolivia");
        cy.get('.pac-item', { timeout: 10000 }).should('be.visible').eq(0).click();
        cy.wait(5000);
        //New submit
        cy.get('button[aria-label="New Submit"]').click();
        //Verify data
        cy.get('[data-cy="screen-field-form_checkbox_1"]').should('be.visible');
        cy.get('[data-cy="screen-field-form_input_1"]').should('be.visible').should('have.value', 'example');
        cy.get('.form-control-file > .btn').should('be.visible');
        cy.get('[name="form_text_area_1"]').should('be.visible');
        cy.get('[class="btn btn-secondary text-white"]').should('be.visible');
        cy.get('input[class="form-control pac-target-input"]').should('be.visible');
        //New submit
        cy.get('.form-group > .btn').click();
        cy.wait(8000);
        login.navigateToUrl();
        login.login();
        navHelper.navigateToAllRequests();
        cy.wait(5000);
        cy.get('tr > td[class="vuetable-slot"] > span').contains('TCP4-2345 Verify the operation of interstitial with a web entry task').parent().parent().children().children().eq(0).click();
        cy.get('tr[item-index="0"] > td[class="vuetable-slot"]').contains('Form Task').click();
        //Verify data
        cy.get('[data-cy="screen-field-form_checkbox_1"]').should('be.visible');
        cy.get('[data-cy="screen-field-form_input_1"]').should('be.visible').should('have.value', 'example');
        cy.get('.form-control-file > .btn').should('be.visible');
        cy.get('[name="form_text_area_1"]').should('be.visible');
        cy.get('input[class="form-control pac-target-input"]').should('be.visible');
        //New submit
        cy.get('button[aria-label="New Submit"]').click();
        cy.wait(8000);
        navHelper.navigateToAllRequests();
        cy.get('tr > td[class="vuetable-slot"] > span').contains('TCP4-2345 Verify the operation of interstitial with a web entry task').parent().parent().children().children().eq(0).click();
        cy.get('#pending > .data-table > div > .vuetable > .vuetable-body > tr > :nth-child(2) > a').contains('Form Task 2').click();
        cy.get('button[aria-label="New Submit"]').click();
        cy.wait(8000);
        cy.xpath("//a[contains(text(),'File Manager')]").click();
        cy.get('[class="star-component"]').should('be.visible');
    }

    configProcessTCP4_2332(subProcessName,subProcessFilePath,mainProcessName, mainProcessFilePath){
        navHelper.navigateToProcessPage();
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get('#processIndex > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > #search-box').type(subProcessName);
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('be.visible');
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('not.be.visible');
        var selectors_processTable = '//div[@id="processIndex"]/div[2]/div/div[2]/table/tbody/tr';
        
        //Import subprocess  
        cy.xpath(selectors_processTable, { timeout: 10000 })
        .find('td')
        .then(($loadedTable) => {
            if($loadedTable.length === 1){
                //Import subprocess
                process.importProcess(subProcessFilePath);

                //Config process
                //start event
                cy.xpath('//strong[text()="Start Event"]/ancestor::tr//div[@class="multiselect__select"]').click();
                cy.xpath('//strong[text()="Start Event"]/ancestor::tr//div[@class="multiselect__tags"]/input').type('Admin User',{timeout:20000});
                cy.xpath('//strong[text()="Start Event"]/ancestor::tr//div[@class="multiselect__tags"]/input').type('{enter}',{delay:30});
                //cy.xpath('//strong[text()="Start Event"]/ancestor::tr//div[@class="multiselect__content-wrapper"]/ul/li[@aria-label="Admin User. "]').should('be.visible').click();                
                cy.xpath('//strong[text()="Start Event"]/ancestor::tr//div[@class="multiselect__tags"]/span[@class="multiselect__single"]').should('contain.text',"Admin User");


                //Process Manager
                cy.xpath('//strong[text()="Process Manager"]/ancestor::tr//div[@class="multiselect__select"]').click();
                cy.xpath('//strong[text()="Process Manager"]/ancestor::tr//div[@class="multiselect__tags"]/input').type('Admin User',{timeout:20000})
                cy.xpath('//strong[text()="Process Manager"]/ancestor::tr//div[@class="multiselect__tags"]/input').type('{enter}',{delay:30});
                //cy.xpath('//strong[text()="Process Manager"]/ancestor::tr//div[@class="multiselect__content-wrapper"]').should('have.css','display');
                //cy.xpath('//strong[text()="Process Manager"]/ancestor::tr//div[@class="multiselect__content-wrapper"]/ul/li[@aria-label="Admin User. "]').should('be.visible').click();
                cy.xpath('//strong[text()="Process Manager"]/ancestor::tr//div[@class="multiselect__tags"]/span[@class="multiselect__single"]').should('contain.text',"Admin User");
                
                
                //cy.get('div[class="multiselect__tags"]').eq(1).click();
                //cy.get('div[class="multiselect__tags"] > input').eq(1).type('Admin User');
                //cy.get('div > ul[role="listbox"] > li[id="option-1-0"]').should('have.attr',"aria-label","Admin User. ").click();
                
                //Cancel Request
                cy.get('div[class="multiselect__tags"]').eq(2).click();
                cy.get('div[class="multiselect__tags"]').eq(2).type('Admin User');
                cy.get('div > ul[role="listbox"] > li[id="option-2-2"]').should('have.attr',"aria-label","Admin User. ").click();

                //Edit Data
                cy.get('div[class="multiselect__tags"]').eq(3).click();
                cy.get('div[class="multiselect__tags"]').eq(3).type('Admin User');
                cy.get('div > ul[role="listbox"] > li[id="option-3-1"]').should('have.attr',"aria-label","Admin User. ").click();
                cy.wait(5000);
                //Press Save button
                cy.get('div[id="card-footer-post-import"] > div > button').click();
            }
        });

        navHelper.navigateToProcessPage();
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get('#processIndex > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > #search-box').type(mainProcessName);
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('be.visible');
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('not.be.visible');

         //Import Main process
         cy.xpath(selectors_processTable, { timeout: 10000 })
         .find('td')
         .then(($loadedTable) => {
             if($loadedTable.length === 1){
                 process.importProcess(mainProcessFilePath);
 
                 //Config process
                 //start event
                 cy.get('div[class="multiselect__tags"]').eq(0).click();
                 cy.get('div[class="multiselect__tags"]').eq(0).type('Admin User');
                 cy.get('div > ul[role="listbox"] > li[id="option-0-1"]').should('have.attr',"aria-label","Admin User. ").click();        
 
                 //Assign subprocess to Form Task 2
                 cy.get('div[class="multiselect__tags"]').eq(1).click();
                 cy.get('div[class="multiselect__tags"]').eq(1).type(subProcessName);
                 cy.get('div > ul[role="listbox"] > li[id="option-1-0"] > span > span').should('contain.text',subProcessName).click();
 
                 //Process Manager
                 cy.get('div[class="multiselect__tags"]').eq(2).click();
                 cy.get('div[class="multiselect__tags"]').eq(2).type('Admin User');
                 cy.get('div > ul[role="listbox"] > li[id="option-2-0"]').should('have.attr',"aria-label","Admin User. ").click();
 
                 //Cancel Request
                 cy.get('div[class="multiselect__tags"]').eq(3).click();
                 cy.get('div[class="multiselect__tags"]').eq(3).type('Admin User');
                 cy.get('div > ul[role="listbox"] > li[id="option-3-2"]').should('have.attr',"aria-label","Admin User. ").click();
 
                 //Edit Data
                 cy.get('div[class="multiselect__tags"]').eq(4).click();
                 cy.get('div[class="multiselect__tags"]').eq(4).type('Admin User');
                 cy.get('div > ul[role="listbox"] > li[id="option-4-1"]').should('have.attr',"aria-label","Admin User. ").click();
 
                 cy.wait(5000);
 
                 //Press Save button
                 cy.get('div[id="card-footer-post-import"] > div > button').click();
 
                 ///////////////////////////////////////////////////
                 //Main Process is configurated with a sub-process//
                 ///////////////////////////////////////////////////
                 navHelper.navigateToProcessPage();
                 process.searchForProcess(mainProcessName);                            
 
                 //Assign subprocess
                 cy.get('text[joint-selector="label"] > tspan').eq(3).click();
                 cy.get('div[class="multiselect__tags"]').eq(0).click();
                 cy.get('div[class="multiselect__tags"]').eq(0).type(subProcessName);
                 cy.wait(2000);
                 cy.get('div[role="combobox"] > div > ul[role="listbox"] > li[id="option-0-0"] > span > span').should('contain.text',subProcessName);
                 cy.get('div[role="combobox"] > div > ul[role="listbox"] > li[id="option-0-0"] > span > span').click();
                 cy.wait(3000);
                 cy.get('text[joint-selector="label"] > tspan').eq(2).click();
 
                 //save process
                 cy.get('button[title="Save"]').click();
                 cy.get('div[class="modal-content"] > div > div[class="modal-footer"] > button').should('be.visible');
                 cy.get('div[class="modal-content"] > div > div[class="modal-footer"] > button').eq(1).click();
             }
         });
    }
    
    verifyDashboardWithUser(Dashboard, linkName) {
        cy.get("strong").should("contain", Dashboard);
        cy.get('[style="z-index: 100;"] > .nav-item > .nav-link').should(
            "contain",
            linkName
        );
    }

    async actionsAndAssertionsOfTCP42295(requestId){
        request.openNewRequest(
            "TCP4-2295 Verify the entered data of a selectlist and recordlist after a Message Start-End Event"
        );
        cy.get(
            'ul[id="requestTab"] > li[class="nav-item"] > a[id="pending-tab"]'
        ).click();
        cy.wait(5000);
        cy.get('tbody[class="vuetable-body"] > tr[item-index="0"] > td').eq(1).get('a[target="_self"]').eq(6).should('contain.text',"A").click();
        cy.wait(5000);
        cy.get('div[class="multiselect__select"]').eq(0).click();
        cy.get('li[aria-label="carlos. "] > span > span')
            .should("contain.text", "carlos")
            .click();
        cy.get('div[class="multiselect__select"]').eq(0).click();
        cy.get('li[aria-label="maria. "] > span > span').should('contain.text',"maria").click();
        cy.get('div[class="multiselect__select"]').eq(0).click();
        cy.get('li[aria-label="ada. "] > span > span').should('contain.text',"ada").click();
        cy.get('div[class="multiselect__select"]').eq(0).click();
        cy.get('li[aria-label="abed. "] > span > span').should('contain.text',"abed").click();
        cy.get('div[class="multiselect__select"]').eq(1).click();
        cy.get('li[aria-label="carla. "] > span > span').should('contain.text',"carla").click();
        cy.get('div[class="multiselect__select"]').eq(1).click();
        cy.get('li[aria-label="andres. "] > span > span').should('contain.text',"andres").click();
        cy.get('div[class="multiselect__select"]').eq(1).click();
        cy.get('li[aria-label="keila. "] > span > span')
            .should("contain.text", "keila")
            .click();
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Spain");
        cy.get('button[type="button"]').eq(6).should('contain.text',"Ok").click();
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Italy");
        cy.get('button[type="button"]').eq(6).should('contain.text',"Ok").click();
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Portugal");
        cy.get('button[type="button"]').eq(6).should('contain.text',"Ok").click();
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Ireland");
        cy.get('button[type="button"]').eq(6).should('contain.text',"Ok").click();
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Belgium");
        cy.get('button[type="button"]').eq(6).should('contain.text',"Ok").click();
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Greece");
        cy.get('button[type="button"]').eq(6).should('contain.text',"Ok").click();
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Moldova");
        cy.get('button[type="button"]').eq(10).should('contain.text',"Ok").click();
        cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
        cy.get('input[data-cy="screen-field-option"]').eq(0).type("Cyprus");
        cy.get('button[type="button"]').eq(10).should('contain.text',"Ok").click();
        cy.get('div[class="card"] > ul > li > a')
          .invoke("text")
          .then((text) => {
            var requestIDtext = text.trim();
            requestIDtext = requestIDtext.substring(
                0,
                requestIDtext.length
            );           
            var requestIDNumber = requestIDtext.substring(
                1,
                5
            );
            requestIDNumber = Math.floor(requestIDNumber);
            requestIDNumber = requestIDNumber + 1;
            var newRequest = '#' + requestIDNumber + requestIDtext.substring(
                5,
                requestIDtext.length
            );
            cy.get('div[aria-label="New Submit"] > button[aria-label="New Submit"]')
                .should('contain.text',"New Submit")
                .click();
            cy.wait(5000);
            navHelper.navigateToTasksPage();
            cy.get('tbody[class="vuetable-body"]')
            .get("tr")
            .get('td[class="vuetable-slot"] > a[target="_self"]')
            .contains(requestIDtext)
            .click();
            cy.wait(5000);
                cy.get('tbody[class="vuetable-body"] > tr[item-index="0"] > td')
                    .eq(1)
                    .get('a[target="_self"]')
                    .eq(6)
                    .should("contain.text", "B")
                    .click();
            cy.get(
                'div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span'
                )
                    .eq(0)
                    .should("contain.text", "carlos");
            cy.get(
                    'div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span'
                )
                    .eq(1)
                    .should("contain.text", "maria");
            cy.get(
                    'div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span'
                )
                    .eq(2)
                    .should("contain.text", "ada");
            cy.get(
                    'div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span'
                )
                    .eq(3)
                    .should("contain.text", "abed");
            cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(4).should('contain.text',"carla");
            cy.get(
                    'div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span'
                )
                    .eq(5)
                    .should("contain.text", "andres");
            cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(6).should('contain.text',"keila");
            cy.get('input[data-cy="screen-field-value"]').eq(0).should('have.value', 'carlos');
            cy.get('input[data-cy="screen-field-value"]').eq(1).should('have.value', 'maria');
            cy.get('input[data-cy="screen-field-value"]').eq(2).should('have.value', 'ada');
            cy.get('input[data-cy="screen-field-value"]').eq(3).should('have.value', 'abed');
            cy.get('input[data-cy="screen-field-value"]').eq(4).should('have.value', 'A');
            cy.get('input[data-cy="screen-field-content"]').eq(0).should('have.value', 'carla');
            cy.get('input[data-cy="screen-field-value"]').eq(5).should('have.value', 'B');
            cy.get('input[data-cy="screen-field-content"]').eq(1).should('have.value', 'andres');
            cy.get('input[data-cy="screen-field-value"]').eq(6).should('have.value', 'C');
            cy.get('input[data-cy="screen-field-content"]').eq(2).should('have.value', 'keila');
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="1"] > td[aria-colindex="1"]').should('contain.text',"Spain");
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="2"] > td[aria-colindex="1"]').should('contain.text',"Italy");
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="3"] > td[aria-colindex="1"]').should('contain.text',"Portugal");
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="4"] > td[aria-colindex="1"]').should('contain.text',"Ireland");
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="5"] > td[aria-colindex="1"]').should('contain.text',"Belgium");
            cy.get('li[class="page-item"] > button[aria-label="Go to page 2"]').should('contain.text', 2).click();
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="6"] > td[aria-colindex="1"]').should('contain.text',"Greece");
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="7"] > td[aria-colindex="1"]').should('contain.text',"Moldova");
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="8"] > td[aria-colindex="1"]').should('contain.text',"Cyprus");
            cy.get('div[aria-label="New Submit"] > button[aria-label="New Submit"]').should('contain.text',"New Submit").click();
            cy.wait(5000);
            cy.get('div[id="request"] > div > div[class="flex-grow-1"] > div[class="px-4 mb-2 timeline"] > div > div[class="flex-grow-1"]').eq(0).should('contain.text',"Admin User has completed the task A");
            cy.get('div[id="request"] > div > div[class="flex-grow-1"] > div[class="px-4 mb-2 timeline"] > div > div[class="flex-grow-1"]').eq(1).should('contain.text',"Admin User has completed the task B");
            navHelper.navigateToTasksPage();
            cy.wait(5000);
            cy.get('td[class="vuetable-slot"] > a[target="_self"]')
                    .should('contain.text',"C  TCP4-2295")
                    .eq(0)
                    .click();
            cy.wait(3000);
            cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(0).should('contain.text',"carlos");
            cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(1).should('contain.text',"maria");
            cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(2).should('contain.text',"ada");
            cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(3).should('contain.text',"abed");
            cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(4).should('contain.text',"carla");
            cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(5).should('contain.text',"andres");
            cy.get('div[class="multiselect__tags"] > div[class="multiselect__tags-wrap"] > span').eq(6).should('contain.text',"keila");
            cy.get('input[data-cy="screen-field-value"]').eq(0).should('have.value', 'carlos');
            cy.get('input[data-cy="screen-field-value"]').eq(1).should('have.value', 'maria');
            cy.get('input[data-cy="screen-field-value"]').eq(2).should('have.value', 'ada');
            cy.get('input[data-cy="screen-field-value"]').eq(3).should('have.value', 'abed');
            cy.get('input[data-cy="screen-field-value"]').eq(4).should('have.value', 'A');
            cy.get('input[data-cy="screen-field-content"]').eq(0).should('have.value', 'carla');
            cy.get('input[data-cy="screen-field-value"]').eq(5).should('have.value', 'B');
            cy.get('input[data-cy="screen-field-content"]').eq(1).should('have.value', 'andres');
            cy.get('input[data-cy="screen-field-value"]').eq(6).should('have.value', 'C');
            cy.get('input[data-cy="screen-field-content"]').eq(2).should('have.value', 'keila');
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="1"] > td[aria-colindex="1"]').should('contain.text',"Spain");
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="2"] > td[aria-colindex="1"]').should('contain.text',"Italy");
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="3"] > td[aria-colindex="1"]').should('contain.text',"Portugal");
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="4"] > td[aria-colindex="1"]').should('contain.text',"Ireland");
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="5"] > td[aria-colindex="1"]').should('contain.text',"Belgium");
            cy.get('table[data-cy="table"] > tbody > tr').should('have.length',5);
            cy.get('li[class="page-item"] > button[aria-label="Go to page 2"]').should('contain.text', 2).click();
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="6"] > td[aria-colindex="1"]').should('contain.text',"Greece");
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="7"] > td[aria-colindex="1"]').should('contain.text',"Moldova");
            cy.get('tbody[role="rowgroup"] > tr[aria-rowindex="8"] > td[aria-colindex="1"]').should('contain.text',"Cyprus");
            cy.get('table[data-cy="table"] > tbody > tr').should('have.length',3);
            cy.get('li[class="page-item"] > button[aria-label="Go to page 1"]').should('contain.text', 1).click();
            cy.get('button[data-cy="remove-row"] > i').eq(0).click();
            cy.get('button[type="button"]').eq(18).should('contain.text', "Delete").click();
            cy.get('table[data-cy="table"] > tbody > tr').should('have.length',5);
            cy.get('button[data-cy="remove-row"] > i').eq(0).click();       
            cy.get('button[type="button"]').eq(18).should('contain.text', "Delete").click();
            cy.get('button[data-cy="remove-row"] > i').eq(0).click();       
            cy.get('table[data-cy="table"] > tbody > tr').should('have.length',5);
            cy.get('button[type="button"]').eq(18).should('contain.text', "Delete").click();
            cy.get('button[data-cy="remove-row"] > i').eq(0).click();
            cy.get('table[data-cy="table"] > tbody > tr').should('have.length',5);
            cy.get('button[type="button"]').eq(14).should('contain.text', "Delete").click();
            cy.get('button[data-cy="remove-row"] > i').eq(0).click();
            cy.get('table[data-cy="table"] > tbody > tr').should('have.length',4);
            cy.get('button[type="button"]').eq(14).should('contain.text', "Delete").click();
            cy.get('button[data-cy="remove-row"] > i').eq(0).click();
            cy.get('table[data-cy="table"] > tbody > tr').should('have.length',3);
            cy.get('button[type="button"]').eq(14).should('contain.text', "Delete").click();
            cy.get('button[data-cy="remove-row"] > i').eq(0).click();
            cy.get('table[data-cy="table"] > tbody > tr').should('have.length',2);
            cy.get('button[type="button"]').eq(14).should('contain.text', "Delete").click();
            cy.get('button[data-cy="remove-row"] > i').eq(0).click();
            cy.get('table[data-cy="table"] > tbody > tr').should('have.length',1);
            cy.get('button[type="button"]').eq(14).should('contain.text', "Delete").click();
            cy.get('table[data-cy="table"] > tbody > tr').should('not.exist');

            cy.get('button[data-cy="add-row"]').should('contain.text',"Add").click();
            cy.get('input[data-cy="screen-field-option"]').eq(0).type("Spain");
            cy.get('button[type="button"]').eq(6).should('contain.text',"Ok").click();
            cy.get('table[data-cy="table"] > tbody > tr').should('have.length',1);

            cy.get('div[aria-label="New Submit"] > button[aria-label="New Submit"]').should('contain.text',"New Submit").click();
            cy.wait(10000);
            cy.get('div[class="flex-grow-1"]')
                    .eq(2)
                    .should(
                        "contain.text",
                        "Admin User has completed the task C"
                    );
        });
    }

    async actionsAndAssertionsOfTCP42326(){
        const newRecordBtn = "button[id='addUserCollection']";
        const maritalStatusSelectLits = "//label[text()='marital status']/parent::div//div[@class='multiselect__tags']";
        const maritalStatusInput ="//label[text()='marital status']/parent::div//input";
        const professionSelectList = "//label[text()='profession']/parent::div//div[@class='multiselect__tags']";
        const professionInput = "//label[text()='profession']/parent::div//input";
        const importFileInput = '[data-cy="file-upload-button"]';
        const submitButton = "button[class='btn btn-primary']";
        const successMessage = "//span[text()='success']";
        const maritalStatusField = "//p[text()='divorced']";
        const professionField = "//p[text()='QA']";
        const imageField = "//img[@class='mw-100']";

        //Fill Marital status
        cy.get(newRecordBtn).should('be.visible').click();
        cy.xpath(maritalStatusSelectLits).should('be.visible').click();
        cy.xpath(maritalStatusInput).type("divorced").type('{enter}');

        //Fill profession
        cy.xpath(professionSelectList).click();
        cy.xpath(professionInput).type("QA").type('{enter}');

        //Upload a File
        const filePath = 'drone.jpg';
        cy.get(importFileInput).attachFile(filePath);
        cy.xpath(successMessage).should('be.visible');

        //Save the changes
        cy.get(submitButton).click();

        //Verify that data were recovered
        cy.xpath(maritalStatusField).should('be.visible');
        cy.xpath(professionField).should('be.visible');
        cy.xpath(imageField).should('be.visible');

    }

    importAndSetup2414(username, password, firstName, lastName, jobTitle, status, email, processName, processFilePath){
        //Step 1: Create User
        navHelper.navigateToAdminUserPage();
        cy.get('[placeholder="Search"]').should("be.visible");
        cy.get('[placeholder="Search"]').eq(0).click().type(username);
        cy.get('[placeholder="Search"]')
            .eq(0)
            .click()
            .type(" ")
            .type("{backspace}");
        cy.get(".jumbotron.jumbotron-fluid").should("be.visible");
        cy.wait(2000);
        cy.get('[placeholder="Search"]').should("have.value", username);
        cy.xpath('//div[@id="users-listing"]/div[2]/div/div[2]/table/tbody/tr', { timeout: 10000 })
        .find('td')
        .then(($loadedTableUser) => {
            if($loadedTableUser.length === 1){
                admin.createUser(username, firstName, lastName, jobTitle, status, email, password);
            }
        });

        //Import process//
        navHelper.navigateToProcessPage();
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get('#processIndex > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > #search-box').type(processName);
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('be.visible');
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('not.be.visible');
        var selectors_processTable = '//div[@id="processIndex"]/div[2]/div/div[2]/table/tbody/tr';

        cy.xpath(selectors_processTable, { timeout: 10000 })
        .find('td')
        .then(($loadedTable) => {
            if($loadedTable.length === 1){
                //Import Processrocess
                navHelper.navigateToProcessPage();
                process.importProcess(processFilePath);

                //Config process
                //start event
                cy.get('div[class="multiselect__tags"]').eq(0).click();
                cy.get('div[class="multiselect__tags"]').eq(0).type(username);
                cy.get('div > ul[role="listbox"] > li[id="option-0-1"]').should('have.attr',"aria-label",firstName+" "+lastName+". ").click();

                //1
                cy.get('div[class="multiselect__tags"]').eq(1).click();
                cy.get('div[class="multiselect__tags"] > input').eq(1).type(firstName+" ");
                cy.get('div > ul[role="listbox"] > li[id="option-1-4"]').should('have.attr',"aria-label",firstName+" "+lastName+". ").click();

                //2
                cy.get('div[class="multiselect__tags"]').eq(2).click();
                cy.get('div[class="multiselect__tags"] > input').eq(2).type(firstName+" ");
                cy.get('div > ul[role="listbox"] > li[id="option-2-4"]').should('have.attr',"aria-label",firstName+" "+lastName+". ").click();
                
                //3
                cy.get('div[class="multiselect__tags"]').eq(3).click();
                cy.get('div[class="multiselect__tags"] > input').eq(3).type(firstName+" ");
                cy.get('div > ul[role="listbox"] > li[id="option-3-4"]').should('have.attr',"aria-label",firstName+" "+lastName+". ").click();

                //Cancel Request
                cy.get('div[class="multiselect__tags"]').eq(4).click();
                cy.get('div[class="multiselect__tags"]').eq(4).type('Admin');
                cy.get('div > ul[role="listbox"] > li[id="option-4-0"]').should('have.attr',"aria-label","Admin User. ").click();

                //Edit Data
                cy.get('div[class="multiselect__tags"]').eq(5).click();
                cy.get('div[class="multiselect__tags"]').eq(5).type('Admin');
                cy.get('div > ul[role="listbox"] > li[id="option-5-2"]').should('have.attr',"aria-label","Admin User. ").click();
                cy.wait(2000);

                //Press Save button
                cy.get('div[id="card-footer-post-import"] > div > button').click();
            }
        });
    }

    async completeConfigurationProcessTCP42308(ProcessName,name){
        process.searchProcessAndSelectOptions(ProcessName,"edit");
        cy.get('g > text >tspan').contains('Data').should('be.visible').click();
        cy.get(':nth-child(1) > .multiselect > .multiselect__tags > .multiselect__single', { timeout: 10000 })
            .then(($loadedCollection) => {
                if($loadedCollection.length === 1){
                    this.configurationProcess(name);
                }
                else return;
            });
    }

    configurationProcess(name){
        cy.get(':nth-child(1) > .multiselect > .multiselect__tags > .multiselect__single').type(name);
        cy.wait(9000);
        cy.get(':nth-child(1) > .multiselect > .multiselect__tags>input').type('{enter}');
        cy.wait(5000);
        cy.get('[title="Save"]').click();
        cy.get('[class="btn btn-secondary"]').click();
    }

    async completeformTCP42308 (){
        cy.get('[name="form_input_1"]').type('123456789').should('have.value','123456789');
        cy.get('[name="form_input_2"]').type('nameDoctorTest').should('have.value','nameDoctorTest');
        cy.get('[class="btn btn-primary"]').click();
        cy.get('[class="breadcrumb-item active"]').should('be.visible');
        cy.wait(5000);
    }
    async reviewCollectionTCP42308 (){
        cy.xpath("//*[@id='search-collection-box']").type('Doctor Collection').should('be.visible');
        cy.wait(3000);
        cy.get('[title="Records"] > .fas').first().should('be.visible').click();
        cy.wait(3000);
        cy.get('[title="Edit"]').first().should('be.visible').click();
        cy.get('[name="nameDoctor"]').should('be.visible');
        cy.get('[name="nameDoctor"]').should('have.value','nameDoctorTest');
        cy.get('[name="lastNameDoctor"]').should('have.value','Salgado');
        cy.get('[name="ciDoctor"]').should('have.value','123456789');
    }

    requestsForSaveSearch(taskName){
        request.openNewRequest("TCP4-2342 Save Search");
        request.openTask(taskName);
        cy.get('[data-cy="screen-field-form_input_1"]').type('test1');
        cy.get('[data-cy="screen-field-form_input_2"]').type('test2');
        cy.get('[data-cy="screen-field-form_input_3"]').type('test3');
        cy.get('.form-group > .btn').click();
    }

    setConfigurationSaveSearch(name){
        cy.xpath('//a[@title="Configure Saved Search"]').should('be.visible')
        cy.xpath('//a[@title="Configure Saved Search"]').click()
        cy.xpath('//label[text()="PMQL"]/following-sibling::input').clear().type('(request = "TCP4-2342 Save Search") AND (status = "Completed")');
        cy.get('#nav-config > .d-flex > .btn-secondary').click();
        cy.get('#nav-config > .d-flex > .btn-outline-secondary').click();
        cy.xpath('//a[@title="View"]').should('be.visible')
        saveSearch.viewSaveSearch(name);
        cy.xpath('//a[@title="Configure Saved Search"]').click();
        cy.xpath('//a[text()="Columns"]').click();
        cy.get('h5').eq(0).should('have.text','Active Columns');
        cy.get('h5').eq(1).should('have.text','Available Columns');
        //verify active column
        cy.get('div[class="border bg-muted px-3 draggable-list draggable-current"] > div').should('have.length',6)
        //verify available column
        cy.get('div[class="border bg-muted px-3 draggable-list draggable-available"] > div').should('have.length',3)
        //move element
        cy.get(':nth-child(2) > .border > :nth-child(1) > .column-card > .d-flex').drag('div[class="border bg-muted px-3 draggable-list draggable-current"]');
        //verify active column
        cy.get('div[class="border bg-muted px-3 draggable-list draggable-current"] > div').should('have.length',7)
        //verify available column
        cy.get('div[class="border bg-muted px-3 draggable-list draggable-available"] > div').should('have.length',2)

        cy.get('.mt-3 > .d-flex > .btn-secondary').click();
        cy.get('.mt-3 > .d-flex > .btn-outline-secondary').click();
        saveSearch.viewSaveSearch(name);
        cy.xpath('//a[@title="Configure Saved Search"]').click()
        cy.get('#nav-columns-tab').click();
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-current"]//div/span[text()="Line 1"]').should('have.text','Line 1');
        cy.get('.mr-auto > .btn').click();
        cy.xpath('//div[@class="modal-content"]').should('be.visible');
        cy.xpath('//button[text()="Confirm"]').click();
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-available"]//div/span[text()="Line 1"]').should('have.text','Line 1');
        //verify active column
        cy.get('div[class="border bg-muted px-3 draggable-list draggable-current"] > div').should('have.length',6)
        //verify available column
        cy.get('div[class="border bg-muted px-3 draggable-list draggable-available"] > div').should('have.length',3)
        cy.get('.mt-3 > .d-flex > .btn-secondary').click();
        cy.get('.mt-3 > .d-flex > .btn-outline-secondary').click();
    }

    async completeFormTCP42311(codeHTML,processName){
        //Complete form
        const formInput1Selector = '[name="form_input_1"]';
        const fileUpload1Xpath = '//div[@data-cy="screen-field-file_upload_1"]//input[@data-cy="file-upload-button"]';
        const formInput2Selector = '[name="form_input_2"]';
        const fileUpload2Xpath = '//div[@data-cy="screen-field-file_upload_2"]//input[@data-cy="file-upload-button"]';
        const submitButton = '//button[contains(text(),"New Submit")]';
        const successFile1Message = "//div[@data-cy='screen-field-file_upload_1']//span[text()='success']";
        const successFile2Message = "//div[@data-cy='screen-field-file_upload_2']//span[text()='success']";

        cy.get(formInput1Selector).type(codeHTML).should('have.value',codeHTML);
        const file1 = 'drone.jpg';
        cy.xpath(fileUpload1Xpath).attachFile(file1);
        cy.xpath(successFile1Message).should('be.visible');
        cy.get(formInput2Selector).type(codeHTML).should('have.value',codeHTML);
        const file2 = 'sample.pdf';
        cy.xpath(fileUpload2Xpath).attachFile(file2);
        cy.xpath(successFile2Message).should('be.visible');
        cy.xpath(submitButton).click();

        //open Manual task
        cy.get('#breadcrumbs > nav > ol > li.breadcrumb-item.active').should('be.visible').then(() =>{
            cy.wait(6000);
        });
        navHelper.navigateToTasksPage();

        const manualTaskXpath= "//a[contains(text(),'processName')]/ancestor::tr//a[contains(text(),'Manual Task')]";
        const openBtnXpath= "//span[contains(text(),'processName')]/ancestor::tr//a[@title='Open Request']";

        cy.xpath(manualTaskXpath.replace('processName',processName)).first().click();
        //Review Manual task
        cy.wait(2000);
        cy.xpath("//a[text()='Go to about Processmaker']").click();
        cy.get('[class="card-deck-flex"]').should('be.visible');
        //Open request and complete Manual task
        cy.xpath(openBtnXpath.replace('processName',processName)).first().click();
        cy.get('#pending > div > div > table > tbody > tr > td:nth-child(2) > a').should('be.visible');
        cy.get('#pending > div > div > table > tbody > tr > td:nth-child(2) > a').click();
        cy.get('[class="btn btn-primary"]').click();
        cy.wait(3000);
        cy.get('[id="file-manager-tab"]').click();
        //Verify PDF generator
        cy.get('[class="star-component"]').first().should('be.visible');
        cy.get('[class="star-component"]').eq(2).should('be.visible');
        cy.get('.px-4 > :nth-child(2) > .flex-grow-1').should('be.visible');
        cy.xpath("//span[text()='TESTCASE']/ancestor::tr//button[@title='View']").should('be.visible').click();
        cy.wait(2000);
        cy.get('.file-detail').should('be.visible');
    }

    async completeFormPath2TCP42311(codeHTML,processName){
        const formInput1Selector = '[name="form_input_1"]';
        const fileUpload1Xpath = '//div[@data-cy="screen-field-file_upload_1"]//input[@data-cy="file-upload-button"]';
        const formInput2Selector = '[name="form_input_2"]';
        const fileUpload2Xpath = '//div[@data-cy="screen-field-file_upload_2"]//input[@data-cy="file-upload-button"]';
        const submitButton = '//button[contains(text(),"New Submit")]';
        const successFile1Message = "//div[@data-cy='screen-field-file_upload_1']//span[text()='success']";
        const successFile2Message = "//div[@data-cy='screen-field-file_upload_2']//span[text()='success']";

        //Complete form
        const file1 = 'drone.jpg';
        cy.xpath(fileUpload1Xpath).attachFile(file1);
        cy.xpath(successFile1Message).should('be.visible');
        cy.get(formInput2Selector).type(codeHTML).should('have.value',codeHTML);
        const file2 = 'sample.pdf';
        cy.xpath(fileUpload2Xpath).attachFile(file2);
        cy.xpath(successFile2Message).should('be.visible');
        cy.xpath(submitButton).click();

        //open Manual task
        cy.get('#breadcrumbs > nav > ol > li.breadcrumb-item.active').should('be.visible').then(() =>{
            cy.wait(16000);
            navHelper.navigateToTasksPage();
        });

        const openBtnXpath= "//a[contains(text(),'processName')]/ancestor::tr//a[@title='Open Task']";
        const openRequestBtnXpath= "//span[contains(text(),'processName')]/ancestor::tr//a[@title='Open Request']";

        cy.xpath(openBtnXpath.replace('processName', processName)).first().click();
        //Review Manual task
        cy.wait(2000);
        cy.xpath("//a[text()='Go to about Processmaker']").click();
        cy.get('[class="card-deck-flex"]').should('be.visible');
        //Open request and complete Manual task
        cy.xpath(openRequestBtnXpath.replace('processName',processName)).first().click();
        cy.wait(2000);
        cy.get('#pending > div > div > table > tbody > tr > td:nth-child(2) > a').should('be.visible');
        cy.get('#pending > div > div > table > tbody > tr > td:nth-child(2) > a').click();
        cy.get('[class="btn btn-primary"]').click();
        cy.wait(2000);
        cy.get('[id="file-manager-tab"]').click();
        //Verify PDF generator
        cy.get('[class="star-component"]').first().should('be.visible');
        cy.get('[class="star-component"]').eq(2).should('be.visible');
        cy.get('[class="star-component"]').eq(3).should('be.visible');
        cy.get('.px-4 > :nth-child(2) > .flex-grow-1').should('be.visible');
        cy.xpath('/html/body/div[1]/div[2]/div[2]/div/div/div/div[1]/div[1]/div/div[6]/div/div/div/table/tbody/tr[4]/td[6]/button[1]').should('be.visible').click();
        cy.wait(2000);
        cy.get('[allowfullscreen="allowfullscreen"]').should('be.visible');
    }
    
    //TCP4-2343
    verifyDashboardsAndMenusdWithUser(nameDashboard1, nameDashboard2, nameDashboard3, nameMenu1, nameMenu2, nameMenu3) {
        cy.get('[class="navbar-nav d-flex align-items-center"]')
            .should("be.visible")
            .should("contain", nameMenu1)
            .and("contain", nameMenu2)
            .and("contain", nameMenu3);
        cy.get('[class="nav-link dropdown-toggle nav-link-custom"]')
            .eq(0)
            .click();
        cy.get('[role="presentation"]')
            .should("be.visible")
            .should("contain", "Link1");
        cy.get('[class="nav-link dropdown-toggle nav-link-custom"]')
            .eq(1)
            .click();
        cy.get('[role="presentation"]')
            .should("be.visible")
            .should("contain", "Link2");
        cy.get('[class="nav-link dropdown-toggle nav-link-custom"]')
            .eq(2)
            .click();
        cy.get('[role="presentation"]')
            .should("be.visible")
            .should("contain", "Link3");

        cy.get('[class="nav nav-tabs"]')
            .should("be.visible")
            .should("contain", nameDashboard1)
            .and(
                "contain",
                nameDashboard2
            ).and("contain",
                nameDashboard3)
        cy.get('[class="nav-item"]').eq(0).click();
        cy.get('[class="tab-content"]').should("contain", "DASHBOARD1");
        cy.get('[class="nav-item"]').eq(1).click();
        cy.get('[class="tab-content"]').should('be.visible').and("contain", "DASHBOARD2");
        cy.get('[class="nav-item"]').eq(2).click();
        cy.get('[class="tab-content"]').should('be.visible').and("contain", "DASHBOARD3");
    }

    async completeFormWebEntryTCP42294 (){
        cy.get('[class="alert alert-danger mt-3"]').should('be.visible');
        cy.get('[name="accepted"]').type('yes').should('be.visible');
        cy.get('[name="maxlength"]').type('1234567').should('be.visible');
        cy.get('[name="afterdate"]').type('2022-01-20').should('be.visible');
        cy.get('[name="minlength"]').type('12345').should('be.visible');
        cy.get('[name="afterorequaltodate"]').type('2022-01-15').should('be.visible');
        cy.get('[name="regex"]').type('2022-01-31').should('be.visible');
        cy.get('[name="alpha"]').type('ProcessMaker').should('be.visible');
        cy.get('[name="required"]').type('ProcessMaker').should('be.visible');
        cy.get('[name="alphanumeric"]').type('Process123').should('be.visible');
        cy.get('[name="requiredif"]').type('ProcessMaker').should('be.visible');
        cy.get('[name="beforedate"]').type('2022-01-01').should('be.visible');
        cy.get('[name="requiredunless"]').type('ProcessMaker').should('be.visible');
        cy.get('[name="beforeorequaldate"]').type('2022-01-15').should('be.visible');
        cy.get('[name="same"]').type('ProcessMaker').should('be.visible');
        cy.get('[name="betweenminmax"]').type('5').should('be.visible');
        cy.get('[name="url"]').type('https://qualitlabs-qa.processmaker.net/').should('be.visible');
        cy.get('[name="date"]').type('2022-07-07').should('be.visible');
        cy.get('[name="email"]').type('automation1@endtest-mail.io').should('be.visible');
        cy.get('[name="Verify Validation Rules with Loop and Nested Screen in Nested Screen"] > :nth-child(2) > .form-group > .btn').should('be.visible').click();
        //Log In
        login.navigateToUrl();
        login.login();
        //Open request
        var processName = "TCP4-2294 Verify Validation Rules with Loop and Nested Screen";
        var taskName = 'Form Task';
        request.openRequestByName(processName);
        request.openTaskByTaskName(taskName);
        //Review Data and Add a Loop
        cy.get('[name="accepted"]').should('be.visible').should('have.value', 'yes');
        cy.get('[name="maxlength"]').should('be.visible').should('have.value', '1234567');
        cy.get('[name="afterdate"]').should('be.visible').should('have.value', '2022-01-20');
        cy.get('[name="minlength"]').should('be.visible').should('have.value', '12345');
        cy.get('[name="afterorequaltodate"]').should('be.visible').should('have.value', '2022-01-15');
        cy.get('[name="regex"]').should('be.visible').should('have.value', '2022-01-31');
        cy.get('[name="alpha"]').should('be.visible').should('have.value', 'ProcessMaker');
        cy.get('[name="required"]').should('be.visible').should('have.value', 'ProcessMaker');
        cy.get('[name="alphanumeric"]').should('be.visible').should('have.value', 'Process123');
        cy.get('[name="requiredif"]').should('be.visible').should('have.value', 'ProcessMaker');
        cy.get('[name="beforedate"]').should('be.visible').should('have.value', '2022-01-01');
        cy.get('[name="requiredunless"]').should('be.visible').should('have.value', 'ProcessMaker');
        cy.get('[name="beforeorequaldate"]').should('be.visible').should('have.value', '2022-01-15');
        cy.get('[name="same"]').should('be.visible').should('have.value', 'ProcessMaker');
        cy.get('[name="betweenminmax"]').should('be.visible').should('have.value', '5');
        cy.get('[name="url"]').should('be.visible').should('have.value', 'https://qualitlabs-qa.processmaker.net/');
        cy.get('[name="date"]').should('be.visible').should('have.value', '2022-07-07');
        cy.get('[name="email"]').should('be.visible').should('have.value', 'automation1@endtest-mail.io');
        //Add a loop
        cy.get('[data-cy="loop-loop-add"]').should('be.visible').click();
        cy.get('[name="accepted"]').eq(1).type('yes').should('be.visible');
        cy.get('[name="maxlength"]').eq(1).type('1234567').should('be.visible');
        cy.get('[name="afterdate"]').eq(1).type('2022-01-20').should('be.visible');
        cy.get('[name="minlength"]').eq(1).type('12345').should('be.visible');
        cy.get('[name="afterorequaltodate"]').eq(1).type('2022-01-15').should('be.visible');
        cy.get('[name="regex"]').eq(1).type('2022-01-31').should('be.visible');
        cy.get('[name="alpha"]').eq(1).type('ProcessMaker').should('be.visible');
        cy.get('[name="required"]').eq(1).type('ProcessMaker').should('be.visible');
        cy.get('[name="alphanumeric"]').eq(1).type('Process123').should('be.visible');
        cy.get('[name="requiredif"]').eq(1).type('ProcessMaker').should('be.visible');
        cy.get('[name="beforedate"]').eq(1).type('2022-01-01').should('be.visible');
        cy.get('[name="requiredunless"]').eq(1).type('ProcessMaker').should('be.visible');
        cy.get('[name="beforeorequaldate"]').eq(1).type('2022-01-15').should('be.visible');
        cy.get('[name="same"]').eq(1).type('ProcessMaker').should('be.visible');
        cy.get('[name="betweenminmax"]').eq(1).type('5').should('be.visible');
        cy.get('[name="url"]').eq(1).type('https://qualitlabs-qa.processmaker.net/').should('be.visible');
        cy.get('[name="date"]').eq(1).type('2022-07-07').should('be.visible');
        cy.get('[name="email"]').eq(1).type('automation1@endtest-mail.io').should('be.visible');
        cy.get('[name="Verify Validation Rules with Loop and Nested Screen in Nested Screen"] > :nth-child(2) > .form-group > .btn').should('be.visible').click();
        cy.wait(2000);
        cy.get('[class="flex-grow-1"]').eq(3).should('be.visible');
        cy.get('[class="flex-grow-1"]').eq(2).should('be.visible');
        cy.get('[id="forms-tab"]').should('be.visible').click();
        cy.get('[title="Details"]').should('be.visible').click();
        cy.wait(2000);
        cy.contains('An Anonymous User started this request from a web entry').scrollIntoView();
    }
    async actionsOfTCP42298(processName){
        cy.get('[name="form_input_1"]').should('be.visible').type('test_2298');
        //record1
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist').should('have.value','test_2298_recodlist');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record2
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_2').should('have.value','test_2298_recodlist_2');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record3
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_3').should('have.value','test_2298_recodlist_3');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record4
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_4').should('have.value','test_2298_recodlist_4');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record5
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_5').should('have.value','test_2298_recodlist_5');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record6
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_6').should('have.value','test_2298_recodlist_6');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record7
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_7').should('have.value','test_2298_recodlist_7');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record8
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_8').should('have.value','test_2298_recodlist_8');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record9
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_9').should('have.value','test_2298_recodlist_9');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();
        //record10
        cy.xpath("//button[contains(text(),'Add')]").click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="form_input_2"]').first().type('test_2298_recodlist_10').should('have.value','test_2298_recodlist_10');
        cy.xpath("//button[text()='Ok']").should('be.visible').click();

        cy.get('.signature > canvas').click();
        cy.get('[name="form_text_area_1"]').type('text_area{enter}text_area2{enter}');
        cy.get('.form-group > .btn').should('be.visible').click();
        cy.wait(5000);
        cy.get('.breadcrumb > .active').should('be.visible');
        //Complete form task 2
        cy.get('#breadcrumbs > nav > ol > li.breadcrumb-item.active').should('be.visible');
        var processName = 'TCP4-2298 Check the functionality of Intermediate Event with nested screen tasks';
        request.openRequestByName(processName);
        var taskName = 'Form Task 2';
        request.openTaskByTaskName(taskName);
        cy.get('[name="form_input_1"]').should('be.visible').should('have.value', 'test_2298');
        cy.get('[aria-rowindex="1"] > .table-column').should('be.visible');
        cy.get(':nth-child(5) > .page-link').click();
        cy.get('[aria-rowindex="6"] > .table-column').should('be.visible');
        cy.get('[data-cy="screen-field-form_text_area_1"]').should('be.visible');
        cy.get('.form-group > .btn').should('be.visible').click();
        //Open manual task and complete
        cy.get('#breadcrumbs > nav > ol > li.breadcrumb-item.active').should('be.visible');
        var processName = 'TCP4-2298 Check the functionality of Intermediate Event with nested screen tasks';
        request.openRequestByName(processName);
        var taskName = 'Manual Task';
        request.openTaskByTaskName(taskName);
        cy.get('[class="card card-body border-top-0 h-100 display-screen"]').should('be.visible');
        cy.get('[class="btn btn-primary"]').should('be.visible').click();
    }
    async reviewDataOfTCP42298(){
        navHelper.navigateToInprogressRequests();
        cy.xpath('//span[text()="TCP4-2298 Check the functionality of Intermediate Event with nested screen tasks"]/ancestor::tr//a[@title="Open Request"]').first().should('be.visible').click();
        //Review Summary
        cy.get('[id="summary-tab"]').should('be.visible').click();
        cy.get('[class="card-body"]').should('be.visible');
        cy.get('[id="completed-tab"]').should('be.visible').click();
        //Review File Manager
        cy.get('[id="file-manager-tab"]').should('be.visible').click();
        request.waitUntilElementIsVisible('selector','[title="View"]');
        cy.get('[title="View"]').should('be.visible').click();
        cy.wait(5000);
        cy.get('iframe').should('be.visible');
    }

    async completeFormTCP42292(requestId){
        //First section
        cy.get('[name="fullName"]').should('be.visible').type('test case_1').should('have.value','test case_1');
        cy.get('[style="color: #000000;"]').should('be.visible');
        cy.get('[data-cy="loop-loop_1-add"]').first().should('be.visible').click();
        cy.get('[style="color: #000000;"]').eq(1).should('be.visible');
        cy.get('[data-cy="loop-loop_2-add"]').first().should('be.visible').click();
        cy.xpath("//span[contains(text(),'test case_1')]").eq(2).should('be.visible');
        cy.get('[data-cy="loop-loop_2-add"]').first().should('be.visible').click();
        cy.get('[class="container-fluid"]').eq(3).should('be.visible');
        //second section
        cy.get('[data-cy="add-row"]').first().click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="nameRecordList"]').first().type('record_test_case').should('have.value','record_test_case');
        cy.xpath("//text()[contains(.,'Ok')]/ancestor::button[1]").first().click();
        cy.get('[data-cy="add-row"]').first().click();
        cy.get('[name="nameRecordList"]').first().type('record_test_case_2').should('have.value','record_test_case_2');
        cy.xpath("//text()[contains(.,'Ok')]/ancestor::button[1]").first().click();
        cy.xpath("//p[text()='record_test_case_2']").first().should('be.visible');
        cy.get('[data-cy="loop-loop_4-add"]').first().click();
        cy.xpath("//span[text()='record_test_case']").should('be.visible');
        cy.xpath("//p[text()='record_test_case_2']").eq(1).should('be.visible');
        //third section
        cy.get('[class="container-fluid"]').eq(7).should('be.visible');
        cy.get('[class="container-fluid"]').eq(9).should('be.visible');
        cy.get('[data-cy="loop-loop_1-add"]').eq(1).click();
        cy.get('[class="container-fluid"]').eq(9).should('be.visible');
        cy.get('[data-cy="loop-loop_2-add"]').eq(1).click();
        cy.get('[class="container-fluid"]').eq(13).should('be.visible');
        //Quarter section
        cy.get('[name="form_input_1"]').type('test case_input').should('have.value','test case_input');
        cy.get('[icon="fas fa-table"] > :nth-child(1) > :nth-child(2) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[name="form_input_2"]').type('test case_input_2').should('have.value','test case_input_2');
        cy.get(':nth-child(2) > :nth-child(1) > [icon="fas fa-redo"] > :nth-child(1) > .container-fluid > :nth-child(1) > .page > :nth-child(2) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[name="form_input_3"]').type('test case_input_3').should('have.value','test case_input_3');
        cy.get(':nth-child(3) > :nth-child(1) > [icon="fas fa-redo"] > :nth-child(1) > .container-fluid > :nth-child(1) > .page > :nth-child(2) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[data-cy="loop-loop_3-add"]').eq(1).click();
        cy.get('[data-cy="screen-field-form_input_2"]').eq(1).type('test case_input_2_2').should('have.value','test case_input_2_2');
        cy.get('[data-cy="loop-loop_4-add"]').eq(1).click();
        cy.get('[data-cy="screen-field-form_input_3"]').eq(1).type('test case_input_3_2').should('have.value','test case_input_3_2');
        cy.get('[data-cy="add-row"]').eq(1).click();
        cy.get('[name="form_input_4"]').first().type('record_test_2_2').should('have.value','record_test_2_2');
        cy.xpath("//text()[contains(.,'Ok')]/ancestor::button[1]").eq(1).click();
        cy.get('[data-cy="add-row"]').eq(1).click();
        cy.get('[name="form_input_4"]').first().type('record_test_2_3').should('have.value','record_test_2_3');
        cy.xpath("//text()[contains(.,'Ok')]/ancestor::button[1]").eq(1).click();
        cy.get(':nth-child(4) > :nth-child(2) > .form-group > :nth-child(1) > div > :nth-child(1)').should('be.visible');
        //fifth Section
        cy.get('.multiselect__tags').type('bbb');
        cy.get('.multiselect__tags>input').type('{enter}');
        cy.get(':nth-child(2) > :nth-child(1) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[name="form_input_5"]').type('test_case').should('have.value','test_case');
        cy.get('[name="screen rich text 4.2.26"] > :nth-child(3) > [icon="fas fa-table"] > :nth-child(2) > :nth-child(2) > .form-group > :nth-child(1) > div > :nth-child(1)').should('be.visible');
        cy.get('.signature > canvas').click();
        cy.get('[data-cy="loop-loop_5-add"]').click();
        cy.get('.multiselect__tags').eq(1).type('aaa');
        cy.xpath('//input[@class="multiselect__input"]').eq(1).type('{enter}');
        cy.get('[name="form_input_5"]').eq(1).type('test_case_2').should('have.value','test_case_2');
        cy.get('.signature > canvas').eq(1).click();
        cy.get(':nth-child(2) > .form-group > .btn').click();
        cy.wait(3000);

        ///Review task form 2
        //cy.get('[class="breadcrumb-item active"]').should('be.visible');
        //cy.get('[title="Open Task"]').first().click();
        var taskName = 'Form Task';
        cy.visit('/requests/'+requestId);
        request.clickOnTaskName(1, 1);
        cy.contains('New Submit').scrollIntoView();
        //First section
        cy.get('[name="fullName"]').should('be.visible').should('have.value','test case_1');
        cy.get('[style="color: #000000;"]').should('be.visible');
        cy.get('[style="color: #000000;"]').eq(1).should('be.visible');
        cy.xpath("//span[contains(text(),'test case_1')]").eq(2).should('be.visible');
        cy.get('[class="container-fluid"]').eq(3).should('be.visible');
        //second section
        cy.get('[data-cy="add-row"]').first().click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('[name="nameRecordList"]').first().type('record_test_case_3').should('have.value','record_test_case_3');
        cy.xpath("//text()[contains(.,'Ok')]/ancestor::button[1]").first().click();
        cy.xpath("//p[text()='record_test_case_2']").first().should('be.visible');
        cy.get('[data-cy="loop-loop_4-add"]').first().click();
        cy.xpath("//span[text()='record_test_case']").should('be.visible');
        //third section
        cy.get('[class="container-fluid"]').eq(13).should('be.visible');
        cy.get('[class="container-fluid"]').eq(16).should('be.visible');
        cy.get('[class="container-fluid"]').eq(15).should('be.visible');
        cy.get('[class="container-fluid"]').eq(20).should('be.visible');
        //Quarter section
        cy.get('[name="form_input_1"]').should('have.value','test case_input');
        cy.get('[icon="fas fa-table"] > :nth-child(1) > :nth-child(2) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[name="form_input_2"]').should('have.value','test case_input_2');
        cy.get(':nth-child(2) > :nth-child(1) > [icon="fas fa-redo"] > :nth-child(1) > .container-fluid > :nth-child(1) > .page > :nth-child(2) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[name="form_input_3"]').should('have.value','test case_input_3');
        cy.get(':nth-child(3) > :nth-child(1) > [icon="fas fa-redo"] > :nth-child(1) > .container-fluid > :nth-child(1) > .page > :nth-child(2) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[data-cy="screen-field-form_input_2"]').eq(1).should('have.value','test case_input_2_2');
        cy.get('[data-cy="screen-field-form_input_3"]').eq(1).should('have.value','test case_input_3_2');
        cy.get('[data-cy="loop-loop_3-add"]').eq(1).click();
        cy.get('[name="form_input_2"]').eq(2).type('test case_input_2_3').should('have.value','test case_input_2_3');
        cy.get('[data-cy="loop-loop_4-add"]').eq(1).click();
        cy.get('[name="form_input_3"]').eq(2).type('test case_input_3_3').should('have.value','test case_input_3_3');
        cy.get('[name="form_input_3"]').eq(3).type('test case_input_3_4').should('have.value','test case_input_3_4');
        cy.get('[data-cy="add-row"]').eq(1).click();
        cy.get('[name="form_input_4"]').first().type('record_test_2_4').should('have.value','record_test_2_4');
        cy.xpath("//text()[contains(.,'Ok')]/ancestor::button[1]").eq(1).click();
        cy.get(':nth-child(4) > :nth-child(2) > .form-group > :nth-child(1) > div > :nth-child(1)').should('be.visible');
        //fifth Section
        cy.get(':nth-child(2) > :nth-child(1) > .form-group > :nth-child(1) > div > p').should('be.visible');
        cy.get('[name="form_input_5"]').should('have.value','test_case');
        cy.get('[name="screen rich text 4.2.26"] > :nth-child(3) > [icon="fas fa-table"] > :nth-child(2) > :nth-child(2) > .form-group > :nth-child(1) > div > :nth-child(1)').should('be.visible');
        cy.get(':nth-child(2) > .form-group > .btn').click();
        cy.wait(2000);
    }
    async completeFormTCP42286 (){
        //first textarea
        cy.get('[title="Bold"]').first().click();
        cy.get('[title="Italic"]').first().click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').first().click();
        cy.get('[title="Red"]').should('be.visible').click();
        cy.get('[class="tox-edit-area__iframe"]').first().then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('strong').type('This is a test to verify textarea control');
        })
        //second textarea
        cy.get('[title="More..."]').first().click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(1).should('be.visible').click();
        cy.get('[title="Italic"]').eq(1).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(1).should('be.visible').click();
        cy.get('[title="Dark Purple"]').should('be.visible').click();
        cy.get('[title="More..."]').first().click();
        cy.get('[class="tox-edit-area__iframe"]').eq(1).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        })
        //textarea inside a loop 1
        cy.get('[data-cy="loop-loop_1-add"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(1).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(2).should('be.visible').click();
        cy.get('[title="Italic"]').eq(2).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(2).should('be.visible').click();
        cy.get('[title="Orange"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(1).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(2).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        })
        //textarea inside a loop 2
        cy.get('[data-cy="loop-loop_5-add"]').click();
        cy.get('[name="loop_5"]').should('be.visible');
        cy.get('[title="More..."]').eq(2).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(3).should('be.visible').click();
        cy.get('[title="Italic"]').eq(3).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(3).should('be.visible').click();
        cy.get('[title="Blue"]').should('be.visible').click();
        cy.get('[title="Bullet list"]').eq(3).should('be.visible').click();
        cy.get('[title="More..."]').eq(2).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(3).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('li').type('This is a test to verify textarea control');
        })
        //Add textarea inside a record list
        cy.get('[class="btn btn-primary"]').first().should('be.visible').click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('.tox-toolbar__primary > :nth-child(3) > .tox-tbtn > .tox-icon > svg').click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(5).should('be.visible').click();
        cy.get('[title="Italic"]').eq(5).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(5).should('be.visible').click();
        cy.get('[title="Dark Turquoise"]').should('be.visible').click();
        cy.get('.tox-toolbar__primary > :nth-child(3) > .tox-tbtn > .tox-icon > svg').click();
        cy.get('[class="tox-edit-area__iframe"]').eq(4).should('be.visible');
        cy.get('[class="tox-edit-area__iframe"]').eq(4).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        })
        //Add textarea inside a record list first loop
        cy.get('[data-cy="loop-loop_2-add"]').first().should('be.visible').click();
        cy.get('[title="More..."]').eq(4).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(5).should('be.visible').click();
        cy.get('[title="Italic"]').eq(5).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(5).should('be.visible').click();
        cy.get('[title="Dark Gray"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(4).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(5).should('be.visible');
        cy.get('[class="tox-edit-area__iframe"]').eq(5).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        })
        //Add textarea inside a record list second loop 2
        cy.get('[data-cy="loop-loop_4-add"]').first().should('be.visible').click();
        cy.get('[title="More..."]').eq(5).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(5).should('be.visible').click();
        cy.get('[title="Italic"]').eq(5).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(5).should('be.visible').click();
        cy.get('[title="Yellow"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(5).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(6).should('be.visible');
        cy.get('[class="tox-edit-area__iframe"]').eq(6).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        })
        cy.xpath('//button[text() = "Ok"]').click((err, runnable) => {
            return false
        });
        cy.get('.form-group > .btn').should('be.visible').click();
        //Open next form task
        cy.get('.breadcrumb > .active').should('be.visible');
        const processName = 'TCP4-2286 process Text Area Rich Text';
        const taskName = 'Form Task';
        request.openRequestByName(processName);
        request.openTaskByTaskName(taskName);
        //Review first textarea
        cy.get('[class="tox-edit-area__iframe"]').first().then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('strong').contains('This is a test to verify textarea control');
        })
        //Review second textarea
        cy.get('[class="tox-edit-area__iframe"]').eq(1).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').contains('This is a test to verify textarea control');
        })
        //Review textarea inside a loop 1
        cy.get('[class="tox-edit-area__iframe"]').eq(2).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').contains('This is a test to verify textarea control');
        })
        //Review textarea inside a loop 2
        cy.get('[class="tox-edit-area__iframe"]').eq(3).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('li').contains('This is a test to verify textarea control');
        })
        //Review textarea inside a record list
        cy.get('[title="Edit"]').click((err, runnable) => {
            return false
        });
        cy.wait(2000);
        cy.get('[class="tox-edit-area__iframe"]').eq(5).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').contains('This is a test to verify textarea control');
        })
        cy.xpath('//button[text() = "Save"]').click((err, runnable) => {
            return false
        });
        cy.get('.form-group > .btn').should('be.visible').click();
        //Review tab form
        cy.get('[id="summary-tab"]').should('be.visible');
        cy.get('[id="forms-tab"]').should('be.visible').click();
        cy.get('[title="Details"]').first().click();
        cy.get('[class="card-body h-100"]').should('be.visible');
    }
    async completeFormManualTaskTCP42286 (){
        navHelper.navigateToRequestsPage();
        const processName = 'TCP4-2286 process Text Area Rich Text';
        const taskName = 'Form Task';
        const nroButton = '1';
        request.openNewRequestByNumberStartButton(processName,nroButton);
        request.openTaskByTaskName(taskName);
        //first textarea
        cy.get('[title="Bold"]').first().click();
        cy.get('[title="Italic"]').first().click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').first().click();
        cy.get('[title="Red"]').should('be.visible').click();
        cy.get('[class="tox-edit-area__iframe"]').first().then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('strong').type('This is a test to verify textarea control');
        })
        //second textarea
        cy.get('[title="More..."]').first().click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(1).should('be.visible').click();
        cy.get('[title="Italic"]').eq(1).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(1).should('be.visible').click();
        cy.get('[title="Dark Purple"]').should('be.visible').click();
        cy.get('[title="More..."]').first().click();
        cy.get('[class="tox-edit-area__iframe"]').eq(1).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        })
        //textarea inside a loop 1
        cy.get('[data-cy="loop-loop_1-add"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(1).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(2).should('be.visible').click();
        cy.get('[title="Italic"]').eq(2).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(2).should('be.visible').click();
        cy.get('[title="Orange"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(1).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(2).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        })
        //textarea inside a loop 2
        cy.get('[data-cy="loop-loop_5-add"]').click();
        cy.get('[name="loop_5"]').should('be.visible');
        cy.get('[title="More..."]').eq(2).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(3).should('be.visible').click();
        cy.get('[title="Italic"]').eq(3).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(3).should('be.visible').click();
        cy.get('[title="Blue"]').should('be.visible').click();
        cy.get('[title="Bullet list"]').eq(3).should('be.visible').click();
        cy.get('[title="More..."]').eq(2).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(3).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('li').type('This is a test to verify textarea control');
        })
        //Add textarea inside a record list
        cy.get('[class="btn btn-primary"]').first().should('be.visible').click();
        cy.get('[class="modal-content"]').first().should('be.visible');
        cy.get('.tox-toolbar__primary > :nth-child(3) > .tox-tbtn > .tox-icon > svg').click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(5).should('be.visible').click();
        cy.get('[title="Italic"]').eq(5).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(5).should('be.visible').click();
        cy.get('[title="Dark Turquoise"]').should('be.visible').click();
        cy.get('.tox-toolbar__primary > :nth-child(3) > .tox-tbtn > .tox-icon > svg').click();
        cy.get('[class="tox-edit-area__iframe"]').eq(4).should('be.visible');
        cy.get('[class="tox-edit-area__iframe"]').eq(4).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        })
        //Add textarea inside a record list first loop
        cy.get('[data-cy="loop-loop_2-add"]').first().should('be.visible').click();
        cy.get('[title="More..."]').eq(4).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(5).should('be.visible').click();
        cy.get('[title="Italic"]').eq(5).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(5).should('be.visible').click();
        cy.get('[title="Dark Gray"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(4).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(5).should('be.visible');
        cy.get('[class="tox-edit-area__iframe"]').eq(5).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        })
        //Add textarea inside a record list second loop 2
        cy.get('[data-cy="loop-loop_4-add"]').first().should('be.visible').click();
        cy.get('[title="More..."]').eq(5).click();
        cy.get('[class="tox-toolbar__overflow"]').should('be.visible');
        cy.get('[title="Bold"]').eq(5).should('be.visible').click();
        cy.get('[title="Italic"]').eq(5).should('be.visible').click();
        cy.get('[class="tox-tbtn tox-split-button__chevron"]').eq(5).should('be.visible').click();
        cy.get('[title="Yellow"]').should('be.visible').click();
        cy.get('[title="More..."]').eq(5).click();
        cy.get('[class="tox-edit-area__iframe"]').eq(6).should('be.visible');
        cy.get('[class="tox-edit-area__iframe"]').eq(6).then(($iframe) => {
            const $body = $iframe.contents().find('body');
            cy.wrap($body).find('p').type('This is a test to verify textarea control');
        })
        cy.xpath('//button[text() = "Ok"]').click((err, runnable) => {
            return false
        });
        cy.get('.form-group > .btn').should('be.visible').click();
        //Open next form task
        cy.get('.breadcrumb > .active').should('be.visible');
        request.openRequestByName(processName);
        const taskName1 = 'Manual Task';
        request.openTaskByTaskName(taskName1);
        cy.get(':nth-child(1) > #tab-form > .card').should('be.visible');
        cy.get('.card-footer > .btn').click();
        //Review tab form
        cy.get('[id="summary-tab"]').should('be.visible');
        cy.get('[id="forms-tab"]').should('be.visible').click();
        cy.get('[title="Details"]').first().click();
        cy.get('[class="card-body h-100"]').should('be.visible');
    }
    //TCP4-2309
    putLatestFileAtTopList(){
        cy.reload();
        cy.xpath('//table//thead//tr//th[@aria-colindex="5"]').click().click();
    }

    async completeFormTCP42235 (requestId){
        cy.get('[class="col-sm-4"]').first().should('be.visible');
        cy.xpath("//p[text()='Rich textImage PNG']").should('be.visible');
        cy.get('[class="col-sm-4"]').eq(1).should('be.visible');
        cy.xpath("//p[text()='Image JPEG']").should('be.visible');
        cy.get('[class="col-sm-4"]').eq(2).should('be.visible');
        //Sign
        cy.contains('New Submit').scrollIntoView();
        cy.xpath("//p[text()='Render HTML from a Variable']").should('be.visible');
        cy.get('[data-cy="screen-field-sig"] > .signature-container > .signature > canvas').click('center');
        cy.get('[data-cy="screen-field-sig"] > .signature-container > .signature > canvas').click('left');
        cy.get('[data-cy="screen-field-sig"] > .signature-container > .signature > canvas').click('right');
        cy.get(':nth-child(3) > .row > :nth-child(2) > :nth-child(1) > .form-group > img').should('be.visible');
        cy.xpath("//p[text()='Image Render Loop Signature']").should('be.visible');
        cy.get('[data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('center');
        cy.get('[data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('left');
        cy.get('[data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('right');
        cy.get(':nth-child(1) > .row > :nth-child(2) > :nth-child(1) > .form-group > img').should('be.visible');
        cy.get('button[title="Add Item"]').should('be.visible').click();
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(1) > :nth-child(1) > [data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('center');
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(1) > :nth-child(1) > [data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('left');
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(1) > :nth-child(1) > [data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('right');
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(2) > :nth-child(1) > .form-group > img').should('be.visible');
        cy.get('.form-group > .btn').click();
        var taskName = 'Form Task';
        cy.visit('/requests/'+requestId);
        request.clickOnTaskName(1, 1);
        //Review Form
        cy.get('[class="col-sm-4"]').first().should('be.visible');
        cy.xpath("//p[text()='Rich textImage PNG']").should('be.visible');
        cy.get('[class="col-sm-4"]').eq(1).should('be.visible');
        cy.xpath("//p[text()='Image JPEG']").should('be.visible');
        cy.get('[class="col-sm-4"]').eq(2).should('be.visible');
        cy.contains('New Submit').scrollIntoView();
        //Review Sign
        cy.xpath("//p[text()='Render HTML from a Variable']").should('be.visible');
        cy.get('[data-cy="screen-field-sig"] > .signature-container > .signature > canvas').should('be.visible');
        cy.get(':nth-child(3) > .row > :nth-child(2) > :nth-child(1) > .form-group > img').should('be.visible');
        cy.xpath("//p[text()='Image Render Loop Signature']").should('be.visible');
        cy.get('[data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').should('be.visible');
        cy.get(':nth-child(1) > .row > :nth-child(2) > :nth-child(1) > .form-group > img').should('be.visible');
        //Review New Sign
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(1) > :nth-child(1) > [data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').should('be.visible');
        cy.get(':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(2) > :nth-child(1) > .form-group > img').should('be.visible');
        //Add New Sing
        cy.get('button[title="Add Item"]').should('be.visible').click();
        cy.get(':nth-child(3) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(1) > :nth-child(1) > [data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('center');
        cy.get(':nth-child(3) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(1) > :nth-child(1) > [data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('left');
        cy.get(':nth-child(3) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(1) > :nth-child(1) > [data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas').click('right');
        cy.get(':nth-child(3) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(2) > :nth-child(1) > .form-group > img').should('be.visible');
        cy.get('[class="btn btn-primary"]').click();
    }
    actionsAndAssertionsOfTCP42307(){
        //First Page
        cy.get('[id="password-input"]').should('be.visible').type("anamauricio11235813");
        cy.xpath('//button').click();

        //Fill the data
        const titleXpath = "//strong[text()='Action By Email Regression']";
        const userSelectListXpath = "//label[text()='User']/parent::div//div[@class='multiselect__tags']";
        const userLineInptXpath = "//label[text()='User']/parent::div//input";
        const optionCheckXpath = "//label[text()='option']";
        const select1SelectListXpath = "//label[text()='form_select_list_1']/parent::div//div[@class='multiselect__tags']";
        const select1LineInputXpath = "//label[text()='form_select_list_1']/parent::div//input";
        const AlabamaOption = "//label[contains(text(),'Alabama')]";
        const KansasOption = "//label[contains(text(),'Kansas')]";
        const submitBtnXpath = "//button[contains(text(),'New Submit')]";

        cy.xpath(titleXpath).should('be.visible');
        //Select an user on the first select list
        cy.xpath(userSelectListXpath).click();
        cy.xpath(userLineInptXpath).type('ana').should('have.value','ana');
        cy.xpath('//label[text()="User"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
            .should('have.attr', 'aria-label')
            .and('equal', "ana. ");
        cy.xpath(userLineInptXpath).type('{enter}');


        //Enable the watcher
        cy.xpath(optionCheckXpath).click();
        cy.xpath(AlabamaOption).should('be.visible').click();
        cy.xpath(KansasOption).should('be.visible').click();

        //Select an option in select list 2
        cy.xpath(select1SelectListXpath).click();
        cy.xpath(select1LineInputXpath).type('Arizona').should('have.value','Arizona');
        cy.xpath('//label[text()="form_select_list_1"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
            .should('have.attr', 'aria-label')
            .and('equal', "Arizona. ");
        cy.xpath(select1LineInputXpath).type('{enter}');

        //Click on Submit button
        cy.xpath(submitBtnXpath).click();

        //Verify data in the second task
        cy.xpath("//input[@type='text'][@name='data2']").should('be.visible');
        cy.xpath("//input[@type='text'][@name='data2']").should('have.value','22');
        cy.xpath("//input[@type='text'][@name='data3']").should('have.value','333');
        cy.xpath("//input[@type='text'][@name='data4']").should('have.value','4444');
        cy.xpath("//div[text()='automation@endtest-mail.io']").should('be.visible');
        cy.xpath("//div[text()='Arizona']").should('be.visible');
        cy.xpath("//div[text()='Alabama,Kansas']").should('be.visible');
        cy.xpath("//button[contains(text(),'New Submit')]").should('be.visible').click();

        //Verify that the process is complete
        cy.xpath('//h3[text()="This request is complete"]').should('be.visible');
    }

    //Fill TCP4-2301
    clickInFormTask(){
        cy.get('tr > :nth-child(2) > a').should('be.visible').click();
    }
    userTagger(tagUser){
        cy.get('[class="btn text-uppercase btn-secondary btn-sm"]')
        cy.get('[class="comment-area"]').should('be.visible')
        cy.get('[class="comment-area"]').type(tagUser);
        cy.xpath('//div[@class="comment-editor mt-2 lg"]//div[@class="card-footer"]//button').click({force:true})  
    }
    replyTag(){
        cy.get('[class="btn btn-secondary btn-sm"]')
        .should("be.visible")
        .click();
    } 
    viewLoadReply(){
        cy.contains(
            '[class="btn btn-outline-secondary btn-sm"]',
            "Load Replies"
        ).click();
    }
    verifyTaggedUsers(TagUserA,TagUserB){
        cy.xpath('//span[text()="Comment posted on Form Task"]/parent::div').should('contain',TagUserA);
        cy.xpath('//span[text()="Comment posted on Form Task"]/parent::div').should('contain',TagUserB);
    }
}