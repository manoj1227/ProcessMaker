import { Requests } from "./requests";
import { Header } from "../pages/header";
import { NavigationHelper } from "../helpers/navigationHelper";
import { Login } from "../pages/login";
import { Admin } from "../pages/admin";

let navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const login = new Login();
const adminP = new Admin();
export class Specific {
    async actionsAndAssertionsOfTCP42227(requestId) {
        cy.get('input[name="form_input_1"]').should('be.visible').type("Test");
        cy.get('button[aria-label="Submit"]').click();
        cy.xpath("(//button[contains(@class, 'select-list-options')])[1]").click();
        cy.xpath("(//button[contains(@class, 'select-list-options')])[2]").click();
        cy.xpath("(//button[contains(@class, 'select-list-options')])[3]").click();
        cy.xpath("//button[text()[normalize-space()='I am done selecting']]").click();

        cy.xpath("(//button[contains(@class, 'select-list-options')])[1]").click();
        //cy.xpath("//button[text()[normalize-space()='I am done selecting']]").click();

        //cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        //cy.visit('/requests/' + requestId);
        //var result = await request.waitUntilTheRequestIsCompleted(20000);
        // expect(result).to.be(true);
        request.verifyRequestisCompleted(requestId);

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
        //open request by ID
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').should('be.visible').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        //verify the process is completed
        request.verifyRequestisCompleted(requestId);
        //cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Data Connector A']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task A']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task B']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Data Connector B']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task C']]").should('be.visible');
    }

    actionsAndAssertionsOfTCP42311(requestId, name, form_Screen, display_Screen) {
        cy.get("[name='form_Screen']".replace('form_Screen', form_Screen)).should('be.visible');
        cy.get('[data-cy="screen-field-form_input_1"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
        cy.xpath('(//input[@type="file"])[1]').attachFile("sample.pdf");
        cy.get('.uploader-file-name').contains("sample.pdf");
        cy.get('[data-cy="screen-field-form_input_2"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
        cy.xpath('(//input[@type="file"])[2]').attachFile('drone.jpg');
        cy.xpath('(//*[@class="uploader-file-name"])[2]').contains("drone.jpg");
        cy.xpath('//button[text()[normalize-space()="New Submit"]]').click();
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        //navHelper.navigateToRequestsPage();
        navHelper.navigateToInprogressRequests();
        request.openRequestById(requestId);
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
        //cy.reload();

        request.verifyRequestisCompleted(requestId);
        cy.get('[id="file-manager-tab"]').click();
        cy.xpath('(//*[@title="View"])[3]').click();

        //requestpart___Quarter Scenario
        navHelper.navigateToRequestsPage();
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            cy.get("[name='form_Screen']".replace('form_Screen', form_Screen)).should('be.visible');
            //cy.get('[data-cy="screen-field-form_input_1"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
            cy.xpath('(//input[@type="file"])[1]').attachFile("sample.pdf");
            cy.get('.uploader-file-name').contains("sample.pdf");
            cy.get('[data-cy="screen-field-form_input_2"]').type('<html><head><title>Este es solo un ejemplo</title></head> <body>Aqui se encuentra el contenido de la web</body>');
            cy.xpath('(//input[@type="file"])[2]').attachFile('drone.jpg');
            cy.xpath('(//*[@class="uploader-file-name"])[2]').contains("drone.jpg");
            cy.xpath('//button[text()[normalize-space()="New Submit"]]').click();
            cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
            navHelper.navigateToInprogressRequests();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            //cy.get("[name='display_Screen']".replace('display_Screen', display_Screen)).should('be.visible');
            cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[1]").should('be.visible');
            cy.get('[data-cy="screen-field-file_upload_1"]').should('be.visible');
            // cy.xpath("(//p[text()='Este es solo un ejemplo Aqui se encuentra el contenido de la web'])[2]").should('be.visible');
            cy.xpath("//div[@data-cy='screen-field-file_upload_2']//img[1]").should('be.visible');
            cy.xpath('//a[text()="Go to about Processmaker"]').click();
            cy.get("[aria-label='ProcessMaker']").should('be.visible');
            cy.go('back');
            cy.xpath('//button[text()[normalize-space()="Complete Task"]]').click();

            request.verifyRequestisCompleted(requestId);
            cy.get("[id='file-manager-tab']").should('be.visible');
            cy.get('[id="file-manager-tab"]').click();
            cy.xpath('(//*[@title="View"])[1]').click();
            cy.wait(2000);
            cy.go('back');
            cy.xpath('(//*[@title="View"])[2]').click();
        })
    }

     actionsAndAssertionsOfTCP42078(requestId, form_screen) {
        //request part
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        cy.xpath('(//*[@class="multiselect__select"])[1]').click();
        cy.xpath('(//*[@role="option"]//span[text()="paola1"])[1]').click();
        cy.get('[data-cy="add-row"]').click();
        cy.xpath('(//*[@role="option"]//span[text()="paola1"])[2]').should('be.visible');
        cy.xpath('(//*[@role="option"]//span[text()="paola2"])[2]').should('be.visible');
        cy.xpath('(//*[@role="option"]//span[text()="paola3"])[2]').should('be.visible');
        cy.xpath('(//*[@role="option"]//span[text()="paola2"])[2]').click();
        cy.xpath('//button[text()="Ok"]').click();
        cy.xpath('//button[text()[normalize-space()="New Submit"]]').click();
        request.verifyTaskIsCompleted();
        request.verifyRequestisCompleted(requestId);
    }

    actionsAndAssertionsOfTCP42112(requestId, form_screen1) {
        //verify presence of Claim Now button
        cy.xpath("//button[text()[normalize-space()='Claim Task']]").should('be.visible');
        //click on Claim Now button
        cy.xpath("//button[text()[normalize-space()='Claim Task']]").click().should('not.exist');
        //Verify presence of assigned screen
        cy.get("[name='form_screen1']".replace('form_screen1', form_screen1)).should('be.visible');
        //write text in input
        cy.get("[name='form_screen1'] input".replace('form_screen1', form_screen1)).should('be.visible').click({ force: true }).type("test").should('have.value', "test");
        //click on submit button
        request.clickOnSubmitButton();
        //verify process is completed
        request.verifyRequestisCompleted(requestId);
    }


     actionsAndAssertionsOfTCP42212(requestId) {
        cy.xpath("(//div[@class='d-block']/button[@type='button'])[1]").click();
        cy.xpath("//button[text()[normalize-space()='Japan']]").click();
        //select administrator
        cy.xpath("(//div[@class='d-block']/button[@type='button'])[2]").click();
        //writ text in input field
        cy.get("[name='input']").type("nice").should('have.value', "nice");
        //click on submit button
        cy.get('[class="fas fa-paper-plane"]').click();
        //verify task is completed
        request.verifyTaskIsCompleted();
        // cy.wait(10000);
        // cy.reload();
        //verify the process is completed
        request.verifyRequestisCompleted(requestId);
        //scroll to  bottom
        // cy.scrollTo('bottom');
        //verify group data connector task is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Groups']]").should('be.visible');
        //verify form task is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Form Task']]").should('be.visible');
        //verify task A is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task A']]").should('be.visible');
        //verify script task  B is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task B']]").should('be.visible');
        //verify script task C is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task C']]").should('be.visible');
    }

    actionsAndAssertionsOfTCP42113(name) {
        //Verify Request is created
        cy.xpath("//span[text()='name']".replace('name', name)).should('be.visible');
            //logout the application
            header.logout();
            //login with assigned user
            login.loginWithDifferentUser(Cypress.env("TestUser3"), Cypress.env("TestUser3Password"));
            //Go to InProgress Requests
            navHelper.navigateToInprogressRequests();
            //open the request by name
            request.openRequestByName(name);
            //get request id
            cy.url().then(url => {
                var requestId = url.split('/')[4].trim();
            //open form task
            request.clickOnTaskName(1, 1);
            //write text in input
            cy.get('[name="var1"]').type("test").should('have.value', "test");
            //click on submit button
            request.clickOnSubmitButton();
            //verify process is completed
            request.verifyRequestisCompleted(requestId);
        })
    }

    actionsAndAssertionsOfTCP42222(requestId, date) {
        //request part
        //write a text in  line input
        const selectListXpath = "//label[text()='New Select List']/parent::div//div[@class='multiselect__tags']";
        const inputLineXpath = "//label[text()='New Select List']/parent::div//input";
        const okBtnXPath = "//button[text()='Ok']";
        cy.get("[name='aa']").type("test").should('have.value', "test");
        //click on check box
        cy.get("[name='checkbox']").click();
        //write a date picker date
        cy.xpath('//div[@data-cy="screen-field-date"]//input[1]').type(date.toLocaleDateString('en-GB'));
        //click on add element
        cy.xpath("//button[@data-cy='add-row']").click();
        //select a book
        cy.xpath(selectListXpath).first().click();
        cy.xpath(inputLineXpath).first().type('title1');
        cy.xpath(inputLineXpath).first().type('{enter}');
        //click on ok
        cy.xpath(okBtnXPath).click();
        //verify the book is added
        cy.xpath("//td[@role='cell']").should('be.visible');

        //click on add element
        cy.xpath("//button[@data-cy='add-row']").click();
        //select a book
        cy.xpath(selectListXpath).first().click();
        cy.wait(2000);
        cy.xpath(inputLineXpath).first().type('title2');
        cy.xpath(inputLineXpath).first().type('{enter}');
        //click on ok
        cy.xpath(okBtnXPath).click();
        //verify the book is added
        cy.xpath("//td[text()[normalize-space()='title2']]").should('be.visible');

        //upload a file
        cy.get('[type="file"]').attachFile("sample.pdf");
        //click on submit
        cy.xpath('//div[@default-submit="true"]//button[1]').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        navHelper.navigateToRequestsPage();
        cy.visit('/requests/' + requestId);
        //cy.reload();
        //verify the process is completed
        request.waitUntilTextcontainText('selector','h4', "Completed");

        //click on file manger
        cy.xpath('//a[@href="#fileManager"]').click();
        //verify the pdf file1
        cy.xpath("(//div[@id='fileManager']//tr)[2]//td[2]").contains('1 (1) — pdf');
        //verify the pdf file2
        cy.xpath("(//div[@id='fileManager']//tr)[3]//td[2]").contains('c (c) — pdf');
        //verify the pdf file3
        cy.xpath("(//div[@id='fileManager']//tr)[4]//td[2]").contains('d (d) — pdf');
        //verify the pdf file4
        cy.xpath("(//div[@id='fileManager']//tr)[5]//td[2]").contains('e (e) — pdf');
        //verify the pdf file5
        cy.xpath("(//div[@id='fileManager']//tr)[6]//td[2]").contains('f (f) — pdf');
        //verify the pdf file6
        cy.xpath("(//div[@id='fileManager']//tr)[7]//td[2]").contains('sample (fileUpload) — pdf');
        //verify the pdf file7
        cy.xpath("(//div[@id='fileManager']//tr)[8]//td[2]").contains('test (test) — pdf');
        //click on forms
        cy.xpath('//a[@href="#forms"]').click();
        //verify the screen
        // cy.xpath("//td[text()='{{$FormScreen}}']").contains('{{$FormScreen}}');
        //verify the admin user task is completed
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task Form Task']]").should('be.visible');
        //verify the admin user as completed task A
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task A']]").should('be.visible');
        //verify the admin user as completed task B
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task B']]").should('be.visible');
        //verify the admin user as completed task C
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task C']]").should('be.visible');
        //verify the admin user as completed task D
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task D']]").should('be.visible');
        //verify the admin user as completed task E
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task E']]").should('be.visible');
        //verify the admin user as completed task F
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task F']]").should('be.visible');
    }

    async actionsAndAssertionsOfTCP42241(requestId, collection1, name, collection2) {
        //request part->click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        //go to collection page
        navHelper.navigateToCollectionPage();
        //search for collection
        admin.searchForCollection(collection1);
        //click on edit record
        cy.get("[id='addUserCollection']").click();
        //write text in input
        cy.get("[type='text']").type("test");
        //click on submit button
        cy.xpath("//button[@class='btn btn-primary']").click();
        //go to inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open task
        request.clickOnTaskName(1, 1);
        //click on complete task
        cy.xpath("//button[@class='btn btn-primary']").click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        //verify the process is completed
        request.processIsCompleted(requestId);
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task A']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Form Task']]").should('be.visible');
        cy.wait(6000);


        //request part for second scenario
        navHelper.navigateToProcessPage();
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        //var requestId = await header.clickOnStart(name);
        request.clickOnTaskName(1, 1);
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        //go to collection page
        navHelper.navigateToCollectionPage();
        //search for collection
        admin.searchForCollection(collection2);
        //click on edit record
        cy.get("[id='addUserCollection']").click();
        //write text in input
        cy.get("[type='text']").type("testB");
        //click on submit button
        cy.xpath("//button[@class='btn btn-primary']").click();
        //go to inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open task
        request.clickOnTaskName(1, 1);
        //click on complete task
        cy.xpath("//button[@class='btn btn-primary']").click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        //verify the process is completed
        request.processIsCompleted(requestId);
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task B']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Form Task']]").should('be.visible');
    }

    actionsAndAssertionsOfTCP42243(requestId) {
        //request part
        //click on add item
        cy.xpath('(//*[@data-cy="loop-loop-add"])[1]').click();
        cy.wait(5000);
        //verify watcher is working
        cy.xpath("//p[text()='ASSAM is ASSAM KERELA is KERELA ORRISA is ORRISA']").should('be.visible');
        //click on submit button
        cy.xpath('//button[@class="btn btn-primary"]').click();
        //verify task is completed
        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        //go to inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open task
        request.clickOnTaskName(1, 1);
        //click on complete task
        cy.xpath("//button[@class='btn btn-primary']").click();
        //verify the process is completed
        request.verifyRequestisCompleted(requestId);
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task A']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task B']]").should('be.visible');
    }

    actionsAndAssertionsOfTCP42202(requestId) {
        //click on complete task
        cy.xpath("//button[text()[normalize-space()='Complete Task']]").click();
        //verify Task is completed Sucessfully
        request.verifyTaskIsCompleted();
        //go to inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        cy.wait(1000);
        cy.reload();
        //verify the A task is not present
        cy.xpath("(//*[text()[normalize-space()='Admin User has completed the task A']])[1]").should('be.visible');
        //verify the A task is not present
        cy.xpath("(//*[text()[normalize-space()='Admin User has completed the task B']])[2]").should('be.visible');
        //verify the AA task is not present
        cy.xpath("(//*[text()[normalize-space()='Admin User has completed the task AA']])[1]").should('be.visible');
        //verify the BB task is not present
        cy.xpath("//*[text()[normalize-space()='Admin User has completed the task BB']]").should('be.visible');
        //verify the AA task is not present
        cy.xpath("(//*[text()[normalize-space()='Admin User has completed the task AA']])[2]").should('be.visible');
    }

    async actionsAndAssertionsOfTCP42281(requestId, form_screen) {
        //request part for first scenario
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        cy.get('[name="aa"]').click()
        cy.get('[name="bb"]').click()
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is complted
        request.verifyTaskIsCompleted();
        //Go to Inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open a task
        request.clickOnTaskName(1, 1);
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is  completed
        request.verifyTaskIsCompleted();
        //Go to Inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open a task
        request.openTask('CC');
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is  completed
        request.verifyTaskIsCompleted();
        //verify the process is completed
        request.processIsCompleted(requestId);
        //Verify the Script A is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script A']]").should('be.visible');
        //verify the AA is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task AA']]").should('be.visible');
        //Verify the Script B is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script B']]").should('be.visible');
        //verify the BB is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task BB']]").should('be.visible');
        //Verify AAA is true
        cy.xpath("//div[text()[normalize-space()='AAA: aa == true']]").should('be.visible');
        //verify the CC is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task CC']]").should('be.visible');


        //request part for second scenario
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        cy.get('[name="bb"]').click()
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is complted
        request.verifyTaskIsCompleted();
        //Go to Inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open a task
        request.clickOnTaskName(1, 1);
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is  completed
        request.verifyTaskIsCompleted();
        //Go to Inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open a task
        request.openTask('DD');
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is  completed
        request.verifyTaskIsCompleted();
        //verify the process is completed
        request.processIsCompleted(requestId);
        //Verify the Script A is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script A']]").should('be.visible');
        //verify the AA is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task AA']]").should('be.visible');
        //Verify the Script B is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script B']]").should('be.visible');
        //verify the BB is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task BB']]").should('be.visible');
        //Verify AAA is true
        cy.xpath("//div[text()[normalize-space()='AAA: aa == true']]").should('be.visible');
        //verify the DD is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task DD']]").should('be.visible');

        //request part for Third scenario
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        cy.get('[name="aa"]').click()
        cy.get('[name="bb"]').click()
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is complted
        request.verifyTaskIsCompleted();
        //Go to Inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open a task
        request.clickOnTaskName(1, 1);
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is  completed
        request.verifyTaskIsCompleted();
        //Go to Inprogress
        navHelper.navigateToInprogressRequests();
        //open request by id
        request.openRequestById(requestId);
        //open a task
        request.openTask('EE');
        cy.get('[name="form_screen"]'.replace('form_screen', form_screen)).should('be.visible');
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is  completed
        request.verifyTaskIsCompleted();
        //verify the process is completed
        request.processIsCompleted(requestId);
        //Verify the Script A is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script A']]").should('be.visible');
        //verify the AA is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task AA']]").should('be.visible');
        //Verify the Script B is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script B']]").should('be.visible');
        //verify the BB is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task BB']]").should('be.visible');
        //Verify AAA is true
        cy.xpath("//div[text()[normalize-space()='AAA: aa == true']]").should('be.visible');
        //verify the EE is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task EE']]").should('be.visible');

    }

    actionsAndAssertionsOfTCP42193(requestId, form_screen, display_screen) {
        var date = new Date().toLocaleDateString('en-GB');
        //verify screen name
        // cy.get['[name="form_screen"]'.replace('form_screen', form_screen)];
        //add date to the date picker
        cy.xpath('(//*[@type="text"])[1]').type(date).should('have.value', date);
        //add 1 in var1 line input
        cy.get('[data-cy="screen-field-Var1"]').type("1").should('have.value', "1");
        //add value to the line input
        cy.xpath('(//*[@data-cy="screen-field-form_input_1"])[1]').type("test case").should('have.value', "test case");
        //enable check box
        cy.xpath('(//*[@data-cy="screen-field-form_checkbox_1"])[1]').click();
        //add value to the line input
        cy.xpath('(//*[@data-cy="screen-field-form_input_1"])[2]').type("test case 2").should('have.value', "test case 2");
        //enable check box
        cy.xpath('(//*[@data-cy="screen-field-form_checkbox_1"])[2]').click();
        //click on +
        cy.get('[data-cy="loop-loop_1-add"]').click();
        //write text in line input
        cy.xpath('(//*[@data-cy="screen-field-form_input_1"])[3]').type("test case").should('have.value', "test case");
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is completed
        request.verifyTaskIsCompleted();
        //wait for 2 min
        cy.wait(120000);
        //go to all requests
        navHelper.navigateToAllRequests();
        //open request by id
        request.openRequestById(requestId);
        //refresh the page
        cy.reload();
        //open manual task
        request.openTask("Manual Task");
        //verify screen name
        //cy.get['[name="display_screen"]'.replace('display_screen', display_screen)];
        //verify the date
        // cy.xpath("//div[@id='tabContent']/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]").should('be.visible');
        //verify the 1 value
        cy.xpath('//p[text()="1"]').should('be.visible');
        //verify testcase is present
        cy.xpath("(//p[text()='test case'])[1]").should('be.visible');
        //verify testcase 2 is present
        cy.xpath("//p[text()='test case 2']").should('be.visible');
        //verify testcase is present 
        cy.xpath("(//p[text()='test case'])[2]").should('be.visible');
        //click on complete task
        cy.get('[class="btn btn-primary"]').click();
        //verify task is completed
        request.verifyTaskIsCompleted();
        //verify the process is completed
        request.verifyRequestisCompleted();
    }


    async actionsAndAssertionsOfTCP42293(form_screen, display_screen, name) {
        //go to url
        cy.visit('webentry/511/node_1');
        //verify screen name
        cy.get['[name="form_screen"]'.replace('form_screen', form_screen)];
        //upload a file
        cy.wait(2000);
        cy.xpath('(//input[@type="file"])[1]').attachFile("drone.jpg");
        //cy.wait(2000);
        //click on submit button
        request.clickOnSubmitButton();
        //verify screen name
        cy.get['[name="display_screen"]'.replace('display_screen', display_screen)];
        //verify the download file option is showing
        cy.get('[aria-label="New File Download"]').should('be.visible');
        //verify the file preview name
        cy.xpath('//div[normalize-space(text())="drone.jpg"]').should('be.visible');
        //go to in progress request
        navHelper.navigateToInprogressRequests();
        //open the request by name
        // var requestId = await request.openRequestByName(name);
        //request.openRequestByName(name);
        //verify screen name
        cy.get['[name="form_screen"]'.replace('form_screen', form_screen)];
        //verify the file review
        cy.get('[style="flex: 1 1 0%;"]').should('be.visible');
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is completed
        request.verifyTaskIsCompleted();
        //verify the process is completed
        request.processIsCompleted();

    }

    async actionsAndAssertionsOfTCP42275(name) {
        navHelper.navigateToRequestsPage();
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        //var requestId = await header.clickOnStart(name);
        const dayjs = require("dayjs");
        const Time = dayjs().format("hh:mm:ss a");
        cy.log(Time);
        const min = Time.split(':')[1].trim();
        cy.log(min);
        var result = min % 2;
        cy.log(result);
        if (result == 0) {
            cy.reload();
            //verify script A
            cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script A']]").should('be.visible');
            //verify script B
            cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script B']]").should('be.visible');
            //verify process is completed
            request.processIsCompleted(requestId);
        }
        else {
            //refresh the page
            cy.reload();
            //verify script A
            cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script A']]").should('be.visible');
            //verify script B
            cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script B']]").should('be.visible');
            //verify script C
            cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script C']]").should('be.visible');
            cy.reload();
            //verify script D
            cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script D']]").should('be.visible');
            //verify script E
            cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script E']]").should('be.visible');
            //verify process is completed
            request.processIsCompleted(requestId);
        }
    }


    actionsAndAssertionsOfTCP42366(form_screen, name, processId) {
        //first Scenario
        cy.wait(2000);
        //go to url
        cy.visit('/webentry/' + processId + '/node_2');
        //verify screen name
        cy.get['[name="form_screen"]'.replace('form_screen', form_screen)];
        //click  on submit button
        request.clickOnSubmitButton();
        cy.wait(6000);
        //go to all requests
        navHelper.navigateToAllRequests();
        //open request by name and verify process is completed
        request.openRequestByNameForCompletedProcess(name);
        //verify the web entry is completed
        cy.xpath("//div[text()[normalize-space()='Admin User started this request from a web entry']]").should('be.visible');
        ////verify the Data Connector B is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Data Connector B']]").should('be.visible');
        //Verify the Script B is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script B']]").should('be.visible');
        //Verify the Script C is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script C']]").should('be.visible');


        //Second Scenario
        cy.wait(2000);
        //go to url
        cy.visit('/webentry/' + processId + '/node_2');
        //verify screen name
        cy.get['[name="form_screen"]'.replace('form_screen', form_screen)];
        //click on select list
        cy.xpath("(//div[@data-cy='screen-field-selectlist']//div)[1]").click();
        //add title1 to the select list
        cy.xpath("//span[text()='title1']").click();
        //click on select list
        cy.xpath("(//div[@data-cy='screen-field-selectlist']//div)[1]").click();
        //add title1 to the select list
        cy.xpath("//span[text()='title2']").click();
        //click on select list
        cy.xpath("(//div[@data-cy='screen-field-selectlist']//div)[1]").click();
        //add title1 to the select list
        cy.xpath("//span[text()='title3']").click();
        //click  on submit button
        request.clickOnSubmitButton();
        cy.wait(6000);
        //go to all requests
        navHelper.navigateToAllRequests();
        //open request by name and verify process is completed
        request.openRequestByNameForCompletedProcess(name);
        cy.get('[id="main"]').scrollTo('bottom');
        //verify the web entry is completed
        cy.xpath("//div[text()[normalize-space()='Admin User started this request from a web entry']]").should('be.visible');
        //Verify the Script A is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script A']]").should('be.visible');
        //verify the Data Connector A is completed
        cy.xpath("(//div[text()[normalize-space()='Admin User has completed the task Data Connector A']])[1]").should('be.visible');
        //verify the second Data Connector A is completed
        cy.xpath("(//div[text()[normalize-space()='Admin User has completed the task Data Connector A']])[2]").should('be.visible');
        //verify the third Data Connector A is completed
        cy.xpath("(//div[text()[normalize-space()='Admin User has completed the task Data Connector A']])[3]").should('be.visible');
        //verify the Data Connector B is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Data Connector B']]").should('be.visible');
        //Verify the Script B is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script B']]").should('be.visible');
        //Verify the Script C is completed
        cy.xpath("//div[text()[normalize-space()='Admin User has completed the task Script C']]").should('be.visible');

    }

    async actionsAndAssertionsOfTCP42440(requestId, name) {
        //click on yes
        cy.xpath("//input[@value='Yes']").should('be.visible').click();
        //verify before data is visible
        cy.xpath("//label[text()='Before Date TODAY']").should('be.visible');
        //add date 
        cy.xpath("(//label[text()='Before Date TODAY']/following::input)[1]").type('2022-06-05{enter}');
        //click on submit button
        request.clickOnSubmitButton();
        //verify task is completed
        request.verifyTaskIsCompleted();
        //verify the process is completed
        request.verifyRequestisCompleted(requestId);

        //request  part of second scenario
        navHelper.navigateToRequestsPage();
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            var requestId = url.split('/')[4].trim();
            request.clickOnTaskName(1, 1);
            cy.wait(4000);

            //click on No
            cy.xpath("//input[@value='No']").click();
            //verify before date is not visible
            cy.xpath("//label[text()='Before Date TODAY']").should('not.be.visible');
            //click on submit button
            request.clickOnSubmitButton();
            request.verifyTaskIsCompleted();
            request.verifyRequestisCompleted(requestId);
        })
    }

    actionsAndAssertionsOfTCP42384(requestId) {
        //create request part
        cy.xpath("//input[@name = 'form_input_1']").should('be.visible').type("yes");
        cy.xpath("//button[@aria-label = 'Submit']").click();
        cy.xpath("//div[text()[normalize-space()='yes']]").should('be.visible');

        cy.xpath("//input[@name = 'form_input_2']").type("8");
        cy.xpath("//button[@aria-label = 'Submit']").click();
        cy.xpath("//div[text()[normalize-space()='8']]").should('be.visible');

        cy.xpath("//button[@aria-label = 'Submit']").click();
        cy.xpath("//button[text()[normalize-space()='yes']]").click();

        //cy.xpath("(//div[text()[normalize-space()='yes']])[2]").should('be.visible');

        request.verifyTaskIsCompleted();

        //form task 1
        navHelper.navigateToInprogressRequests();
        request.openRequestById(requestId);
        cy.wait(4000);
        cy.xpath("//a[text()[normalize-space()='Form Task 1']]").should('be.visible');
        cy.xpath("//a[text()[normalize-space()='Form Task 2']]").should('be.visible');
        cy.xpath("//a[text()[normalize-space()='Form Task 3']]").should('be.visible');
        request.clickOnTaskName(1, 1);
        cy.xpath("//input[@name = 'form_input_1']").type("yes");
        cy.xpath("//button[@aria-label = 'Submit']").click();

        cy.xpath("//input[@name = 'form_input_2']").type("8");
        cy.xpath("//button[@aria-label = 'Submit']").click();

        cy.xpath("//button[@aria-label = 'Submit']").click();
        cy.xpath("//button[text()[normalize-space()='yes']]").click();
        request.verifyTaskIsCompleted();

        //form task 2
        navHelper.navigateToInprogressRequests();
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        cy.xpath("//input[@name = 'form_input_1']").type("yes");
        cy.xpath("//button[@aria-label = 'Submit']").click();

        cy.xpath("//input[@name = 'form_input_2']").type("8");
        cy.xpath("//button[@aria-label = 'Submit']").click();

        cy.xpath("//button[@aria-label = 'Submit']").click();
        cy.xpath("//button[text()[normalize-space()='yes']]").click();
        request.verifyTaskIsCompleted();

        //form task 3
        navHelper.navigateToInprogressRequests();
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        cy.xpath("//input[@name = 'form_input_1']").type("yes");
        cy.xpath("//button[@aria-label = 'Submit']").click();

        cy.xpath("//input[@name = 'form_input_2']").type("8");
        cy.xpath("//button[@aria-label = 'Submit']").click();

        cy.xpath("//button[@aria-label = 'Submit']").click();
        cy.xpath("//button[text()[normalize-space()='yes']]").click();
        request.verifyRequestisCompleted(requestId);

        cy.xpath("//div[text()[normalize-space() = 'Admin User has completed the task Form Task']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space() = 'Admin User has completed the task Form Task 1']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space() = 'Admin User has completed the task Form Task 2']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space() = 'Admin User has completed the task Form Task 3']]").should('be.visible');

    }
    async actionsAndAssertionsOfTCP42175(requestId) {
        cy.xpath('//label[text()="accepted"]/following::input[1]').should('be.visible').type('10');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The accepted must be accepted."]]')
            .should('be.visible');

        cy.xpath('//label[text()="accepted"]/following::input[1]').clear().type('test');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The accepted must be accepted."]]')
            .should('be.visible');

        cy.xpath('//label[text()="accepted"]/following::input[1]').clear().type('yes');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="yes"]]').should('be.visible');

        //date after date
        cy.xpath('//label[text()="date - after date"]/following::input[1]').type('2020-10-10');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The date - after date must be after 2020-10-10."]]')
            .should('be.visible');

        cy.xpath('//label[text()="date - after date"]/following::input[1]').clear().type('2018-08-19');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The date - after date must be after 2020-10-10."]]')
            .should('be.visible');

        cy.xpath('//label[text()="date - after date"]/following::input[1]').clear().type('2020-10-11');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="2020-10-11"]]').should('be.visible');

        // date time After or equal to date
        cy.xpath('//label[text()="datetime - After or Equal To Date"]/following::input[1]').type('2018-08-19');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The datetime - After or Equal To Date must be equal or after 2020-10-10."]]')
            .should('be.visible');

        cy.xpath('//label[text()="datetime - After or Equal To Date"]/following::input[1]').clear().type('2021-10-10');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="2021-10-10"]]')
            .should('be.visible');

        //test alpha
        cy.xpath('//label[text()="text - Alpha"]/following::input[1]').type('@#sad');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The text - Alpha field must contain only alphabetic characters."]]')
            .should('be.visible');

        cy.xpath('//label[text()="text - Alpha"]/following::input[1]').clear().type('12');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The text - Alpha field must contain only alphabetic characters."]]')
            .should('be.visible');

        cy.xpath('//label[text()="text - Alpha"]/following::input[1]').clear().type('testcase');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="testcase"]]')
            .should('be.visible');

        //integer-alpha numeric

        cy.xpath('//label[text()="integer - Alpha numeric"]/following::input[1]').type('@!A');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The integer - Alpha numeric field must be alphanumeric."]]')
            .should('be.visible');

        cy.xpath('//label[text()="integer - Alpha numeric"]/following::input[1]').clear().type('123456789');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="123456789"]]')
            .should('be.visible');

        ///date before date

        cy.xpath('//label[text()="date - before date"]/following::input[1]').type('2020-10-10');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The date - before date must be before 2020-10-10."]]').should('be.visible');

        cy.xpath('//label[text()="date - before date"]/following::input[1]').clear().type('2021-08-09');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The date - before date must be before 2020-10-10."]]').should('be.visible');

        cy.xpath('//label[text()="date - before date"]/following::input[1]').clear().type('2019-12-12');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="2019-12-12"]]').should('be.visible');

        //DateTime-before or equal to date

        cy.xpath('//span[text()="dateTime - Before or Equal to Date"]/following::input[1]').type('2020-12-12');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The dateTime - Before or Equal to Date must be equal or before 2020-10-10."]]')
            .should('be.visible');

        cy.xpath('//span[text()="dateTime - Before or Equal to Date"]/following::input[1]').clear().type('2010-10-10');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="2010-10-10"]]').should('be.visible');

        // text Between Min & Max 3 - 7

        cy.xpath('//span[text()="text Between Min & Max 3 - 7"]/following::input[1]').type('testlimhng');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="Must have a value between 3,7"]]')
            .should('be.visible');

        cy.xpath('//span[text()="text Between Min & Max 3 - 7"]/following::input[1]').clear().type('qe');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="Must have a value between 3,7"]]')
            .should('be.visible');

        cy.xpath('//span[text()="text Between Min & Max 3 - 7"]/following::input[1]').clear().type('3');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="3"]]').should('be.visible');

        //date date

        cy.xpath('//span[text()="date date"]/following::input[1]').type('1234-9')
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The date date must be a valid date."]]')
            .should('be.visible');

        cy.xpath('//span[text()="date date"]/following::input[1]').clear().type('1998-10-10');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="1998-10-10"]]').should('be.visible');

        //test email

        cy.xpath('//span[text()="text email"]/following::input[1]').type('abcd@user');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The text email format is invalid."]]')
            .should('be.visible');

        cy.xpath('//span[text()="text email"]/following::input[1]').clear().type('erth4436@gmail.com');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="erth4436@gmail.com"]]').should('be.visible');
        cy.wait(2000);

        //integer in 9
        cy.xpath('//span[text()="integer - IN - 9"]/following::input[1]').type('21');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The selected integer - IN - 9 is invalid."]]')
            .should('be.visible');

        cy.xpath('//span[text()="integer - IN - 9"]/following::input[1]').clear().type('9');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="9"]]').should('be.visible');

        //password

        cy.xpath('//span[text()="password - Max Length 10"]/following::input[1]').type('password12');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="password12"]]').should('be.visible');

        //integer min-length5

        cy.xpath('//span[text()="integer - min length 5"]/following::input[1]').type('12345');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="12345"]]').should('be.visible');

        //text not in 5

        cy.xpath('//span[text()="text - not in 5"]/following::input[1]').type('5');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The selected text - not in 5 is invalid."]]').should('be.visible');

        cy.xpath('//span[text()="text - not in 5"]/following::input[1]').clear().type('3');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="3"]]').should('be.visible');

        // required if

        cy.xpath('//span[text()="required if"]/following::input[1]').type('test');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="test"]]').should('be.visible');

        //required unless

        cy.xpath('//span[text()="required Unless"]/following::input[1]').type('test case required unless');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="test case required unless"]]').should('be.visible');

        //same before
        cy.xpath('//span[text()="same before"]/following::input[1]').type('yes');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="yes"]]').should('be.visible');

        //URL
        cy.xpath('//span[text()="URL"]/following::input[1]').type('yes');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="The URL format is invalid."]]').should('be.visible');

        cy.xpath('//span[text()="URL"]/following::input[1]').clear().type('https://ecosia.org');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();

        // regex(XYZ)

        cy.xpath('//span[text()="regex[xyz]"]/following::input[1]').type('xyz');
        cy.get(':nth-child(1) > :nth-child(1) > .btn > .fas').click();
        cy.xpath('//div[text()[normalize-space()="xyz"]]').should('be.visible');

        //list
        cy.xpath("//a[@href='https://ecosia.org']").should('be.visible');
        cy.xpath("//span[text()='list']").should('be.visible');
        cy.xpath("//button[text()[normalize-space()='one']]").click();

        // cy.xpath("//button[text()[normalize-space()='I am done selecting']]").click();

        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');
        cy.wait(2000);
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        cy.xpath("//p[text()='yes']").should('be.visible');
        cy.xpath("//p[text()='2020-10-11']").should("be.visible");
        cy.xpath("//p[text()='2021-10-10']").should("be.visible");
        cy.xpath("//p[text()='testcase']").should("be.visible");
        cy.xpath("//p[text()='123456789']").should("be.visible");
        cy.xpath("//p[text()='2019-12-12']").should("be.visible");
        cy.xpath("//p[text()='2010-10-10']").should("be.visible");
        cy.xpath("//p[text()='3']").should("be.visible");
        cy.xpath("//p[text()='1998-10-10']").should("be.visible");
        cy.xpath("//p[text()='erth4436@gmail.com']").should("be.visible");
        cy.xpath("//p[text()='9']").should("be.visible");
        cy.xpath("//p[text()='password12']").should("be.visible");
        cy.xpath("//p[text()='12345']").should("be.visible");
        cy.xpath("(//p[text()='3'])[2]").should("be.visible");
        cy.xpath("//p[text()='test']").should("be.visible");
        cy.xpath("//p[text()='test case required unless']").should("be.visible");
        cy.xpath("//p[text()='yes']").should("be.visible");
        cy.xpath("//p[text()='https://ecosia.org']").should("be.visible");
        cy.xpath("//p[text()='xyz']").should("be.visible");
        cy.xpath("//p[text()='one']").should("be.visible");
        //erth4436@gmail.com
        request.manualtaskcomplete();
        request.verifyRequestisCompleted(requestId);
    }
    actionsAndAssertionsOfTCP453922(requestId) {
        //cy.wait(4000);

        //request part click on enable visibility
        cy.xpath('//input[@data-cy="screen-field-visibility"]/following-sibling::label[1]').should('be.visible').click();

        //verify the new input control is present
        cy.xpath('//input[@data-cy="screen-field-form_input_1"]').should('be.visible');

        // verify the varA control is present
        cy.xpath('(//input[@data-cy="screen-field-varA"])[1]').should('be.visible');

        //verify the varB control is present
        cy.xpath('(//input[@data-cy="screen-field-varB"])[1]').should('be.visible');

        //verify the select list 1 control is present
        cy.xpath('(//div[@data-cy="screen-field-form_select_list_1"]//div)[1]').should('be.visible');

        //verify the select list 2 control is present
        cy.xpath('(//div[@data-cy="screen-field-form_select_list_2"]//div)[1]').should('be.visible');

        //verify the ADD control is present
        cy.xpath('//button[@data-cy="add-row"]').should('be.visible');

        // click on enable validation
        cy.xpath('(//label[@class="custom-control-label"])[1]').click();

        //verify the new input field is required
        cy.xpath('//input[@data-cy="screen-field-form_input_1"]/following-sibling::div[text()="Field is required"]')
            .should('be.visible');

        //verify the varA filed is required
        cy.xpath('//input[@data-cy="screen-field-varA"]/following-sibling::div[text()="Field is required"]').should('be.visible');

        //verify the varB filed is required
        cy.xpath('//input[@data-cy="screen-field-varB"]/following-sibling::div[text()="Field is required"]').should('be.visible');

        //click on add row
        cy.xpath('//button[@data-cy="add-row"]').click();

        //verify the varC filed is required
        cy.xpath('(//input[@data-cy="screen-field-varC"]/following-sibling::div[text()="Field is required"])[1]').should('be.visible');

        //click on cancel
        cy.xpath('(//button[text()="Cancel"])[1]').click();
        cy.wait(2000);
        //Verify the select list 1 field is required
        cy.xpath('(//div[text()="Field is required"])[6]').should('be.visible');

        //Verify the select list 2 field is required
        cy.xpath('(//div[text()="Field is required"])[7]').should('be.visible');

        //click on plus
        cy.xpath('(//i[@class="fas fa-plus"])[2]').click();

        //click on add
        cy.xpath('//button[@data-cy="add-row"]').click();

        //write text in varc
        cy.xpath('(//*[@data-cy="screen-field-varC"])[1]').type('varc');

        //click on ok
        cy.xpath('//button[text()="Ok"]').click();

        //click on 2 plus
        cy.xpath('//button[@data-cy="loop-loop_3-add"]//i[1]').click();

        //verify the selectlist 3 field is required
        cy.xpath('(//div[text()="Field is required"])[8]').should('be.visible');

        //verify the selectlist 4 field is required
        cy.xpath('(//div[text()="Field is required"])[9]').should('be.visible');

        //new input
        cy.xpath('//input[@data-cy="screen-field-form_input_1"]').type('new input');

        //enter the vara
        cy.xpath('(//input[@data-cy="screen-field-varA"])[1]').type('vara1');

        //enter the value of vara
        cy.xpath('(//input[@data-cy="screen-field-varA"])[2]').type('vara2');

        //enter the value of varb1
        cy.xpath('(//input[@data-cy="screen-field-varB"])[1]').type('varb1');

        //enter the value of varb2
        cy.xpath('(//input[@data-cy="screen-field-varB"])[2]').type('varb2');

        //click
        cy.xpath('(//div[@data-cy="screen-field-form_select_list_1"]//div)[1]').click();
        //select option 1
        cy.xpath('(//li[@role="option"]//span)[3]').click();

        //click
        cy.xpath("(//div[@class='multiselect__select'])[2]").click();
        //select option 2
        cy.xpath('(//li[@id="option-9-1"]//span)[1]').click();

        //click
        cy.xpath('(//div[@class="multiselect__select"])[3]').click();
        //select option 3
        cy.xpath('//li[@id="option-12-2"]/span[1]').click();

        //click
        cy.xpath('(//div[@class="multiselect__select"])[4]').click();
        //select option 4
        cy.xpath("//li[@id='option-13-0']/span[1]").click();

        //verify the new input field is required is disappear
        cy.xpath("//input[@data-cy='screen-field-form_input_1']/following-sibling::div[text()='Field is required']").should('not.exist');

        //verify the varA filed is required is disapper
        cy.xpath("//input[@data-cy='screen-field-varB']/following-sibling::div[text()='Field is required']").should('not.exist');

        //Verify the select list 1 field is required is disappear
        cy.xpath('(//div[text()="Field is required"])[6]').should('not.exist');

        //Verify the select list 2 field is required
        cy.xpath("(//div[text()='Field is required'])[7]").should('not.exist');

        //verify the selectlist 3 field is required
        cy.xpath('(//div[text()="Field is required"])[8]').should('not.exist');

        //verify the selectlist 4 field is required
        cy.xpath("(//div[text()='Field is required'])[9]").should('not.exist');

        //new submit
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();

        cy.xpath("//div[text()='Task Completed Successfully']").should('be.visible');

        //request page
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);

        //verify the new input data is present
        cy.xpath("//input[@data-cy='screen-field-form_input_1']").should('have.value', 'new input');

        //verify the varA data is present
        cy.xpath("(//input[@data-cy='screen-field-varA'])[1]").should('have.value', 'vara1');

        //verify the varA 2 data is present
        cy.xpath("(//input[@data-cy='screen-field-varA'])[2]").should('have.value', 'vara2');

        //verify the varB data is present
        cy.xpath("(//input[@data-cy='screen-field-varB'])[1]").should('have.value', 'varb1');

        //verify the varB 2 data is present
        cy.xpath("(//input[@data-cy='screen-field-varB'])[2]").should('have.value', 'varb2');

        //verify the varc data is present
        cy.xpath("//button[@data-cy='edit-row']//i[1]").should('be.visible');

        //verify select list1 data is present
        cy.xpath('(//span[@class="multiselect__single"])[1]').should('contain', 'Option 2');

        //verify select list2 data is present
        cy.xpath('(//span[@class="multiselect__single"])[2]').should('contain', 'Option 2');

        //verify select list3 data is present
        cy.xpath('(//span[@class="multiselect__single"])[3]').should('contain', 'Option 3');

        //verify select list4 data is present
        cy.xpath('(//span[@class="multiselect__single"])[4]').should('contain', 'Option 1')

        //clear value new input
        cy.xpath('//input[@data-cy="screen-field-form_input_1"]').clear();

        //verify the new input field is required
        cy.xpath("//input[@data-cy='screen-field-form_input_1']/following-sibling::div[text()='Field is required']")
            .should('be.visible');

        //clear input vara
        cy.xpath("(//input[@data-cy='screen-field-varA'])[1]").clear();

        //verify the vara field is required
        cy.xpath("//input[@data-cy='screen-field-varA']/following-sibling::div[text()='Field is required']")
            .should('be.visible');

        //clear vara1 input
        cy.xpath("(//input[@data-cy='screen-field-varA'])[2]").clear();

        //verify( the varA 2 field is required
        cy.xpath("(//input[@data-cy='screen-field-varA']/following-sibling::div[text()='Field is required'])[2]")
            .should('be.visible');

        //clear varb input
        cy.xpath("(//input[@data-cy='screen-field-varB'])[1]").clear();

        //verify the var B  field is required
        cy.xpath("//input[@data-cy='screen-field-varB']/following-sibling::div[text()='Field is required']")
            .should('be.visible');

        //clear varb2 input
        cy.xpath("(//input[@data-cy='screen-field-varB'])[2]").clear();

        //verify the varb field is required
        cy.xpath("(//input[@data-cy='screen-field-varB'])[2]").should('be.visible');

        //scrolldown
        // cy.scrollTo("[class='multiselect__input']");

        //click on select list 1
        cy.xpath("(//div[@data-cy='screen-field-form_select_list_1']//div)[1]").click();

        //add backspace
        cy.xpath("(//input[@class='multiselect__input'])[1]").type('{backspace}');
        //verify the select list 1 is required
        cy.xpath("(//div[text()='Field is required'])[3]").should('be.visible');
        //click on select list 2
        cy.xpath("(//div[@class='multiselect__select'])[2]").click();
        //add backspace
        cy.xpath("(//div[@class='multiselect__spinner']/following-sibling::input)[2]").type('{backspace}');
        //verify the select 2 field is required
        cy.xpath("(//div[@class='invalid-feedback d-block']//div)[2]").should('be.visible');

        //click on selectlist1,2
        cy.xpath("(//div[@class='multiselect__select'])[3]").click();

        //addback space
        cy.xpath("(//div[@class='multiselect__spinner']/following-sibling::input)[3]").type('{backspace}');

        //verify the select 2 field is required
        cy.xpath("(//div[@class='invalid-feedback d-block']//div)[3]").should('be.visible');

        //click on selectlist2,2
        cy.xpath("(//div[@class='multiselect__select'])[4]").click();
        //add backspace
        cy.xpath("(//div[@class='multiselect__spinner']/following-sibling::input)[4]").type('{backspace}');

        //verify the select1 field is required
        cy.xpath("(//div[@class='invalid-feedback d-block']//div)[3]")
            .should('be.visible');
        //click the minus
        cy.xpath("(//i[@class='fas fa-minus'])[1]").click();
        //click confirm
        cy.xpath("//button[text()='Confirm']").click();
        cy.xpath("(//label[text()='varA'])[2]").should('not.exist');
        cy.xpath("(//label[text()='varB'])[2]").should('not.exist');
        //click on minus
        cy.xpath("(//i[@class='fas fa-minus'])[1]").click();
        //click confirm
        cy.xpath("//button[text()='Confirm']").click();
        cy.xpath("(//label[text()='varA'])[1]").should('not.exist');
        cy.xpath("(//label[text()='varB'])[1]").should('not.exist');
        //click the record list minus
        cy.xpath("//button[@data-cy='loop-loop_3-remove']").click();
        //click on confirm
        cy.xpath("//button[text()='Confirm']").click();
        cy.xpath("(//label[text()='Select List 1'])[2]").should('not.exist');
        cy.xpath("(//label[text()='Select List 2'])[2]").should('not.exist');
        //click the record list minus
        cy.xpath("//button[@data-cy='loop-loop_3-remove']").click();
        //click confirm button
        cy.xpath("//button[text()='Confirm']").click();
        cy.xpath("(//label[text()='Select List 1'])[1]").should('not.exist');
        cy.xpath("(//label[text()='Select List 2'])[1]").should('not.exist');
        //click plus button
        cy.xpath("//button[@data-cy='loop-loop_1-add']//i[1]").click();
        cy.xpath("(//label[text()='varA'])[1]").should('be.visible');
        cy.xpath("(//label[text()='varB'])[1]").should('be.visible');
        //click plus button
        cy.xpath("//button[@data-cy='add-row']").click();

        //enter the varc value
        cy.xpath("(//input[@data-cy='screen-field-varC'])[1]").type('varc');
        //click ok button
        cy.xpath("//button[text()='Ok']").click();
        //click plus button in record list
        cy.xpath("//button[@data-cy='loop-loop_3-add']").click();
        cy.xpath("(//label[text()='Select List 1'])[1]").should('be.visible');
        cy.xpath("(//label[text()='Select List 2'])[1]").should('be.visible');
        //new input
        cy.xpath("//input[@data-cy='screen-field-form_input_1']").type('new input');
        //enter the vara value
        cy.xpath("(//input[@data-cy='screen-field-varA'])[1]").type('vara');
        //enter the varb value
        cy.xpath("(//input[@data-cy='screen-field-varB'])[1]").type('varb');
        //click record list select option

        //verify Select File 1 field is required
        cy.xpath("(//div[text()='Field is required'])[3]").should('be.visible');
        //select option
        cy.xpath("(//div[@data-cy='screen-field-form_select_list_1']//div)[1]").click();
        cy.xpath("(//span[text()='Option 3'])[1]").click();
        //click record list select option

        //verify Select File 2 field is required
        cy.xpath("(//div[text()='Field is required'])[3]").should('be.visible');
        //select the option
        cy.xpath("(//div[@data-cy='screen-field-form_select_list_2']//div)[1]").click();
        cy.xpath("(//span[text()='Option 1'])[2]").click();
        //click on submit button
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        // request.verifyTaskIsCompleted();
        request.verifyRequestisCompleted(requestId);

    }
    actionsAndAssertionsOfTCP42192(requestId, name, screen) {
        cy.xpath('(//input[@name="form_input_1"])[1]').type('Form');
        cy.xpath('(//input[@name="form_input_1"])[1]').type('Nested Screen');
        cy.get('[type="checkbox"]').click();
        cy.get('[name="form_text_area_1"]').type('text area nested');
        cy.get('[class="multiselect__select"]').click();
        cy.get('[aria-label="One. "]').click();
        cy.get(':nth-child(3) > .form-group > .btn').click();

        request.verifytaskiscompleted();
        request.verifyRequestisCompleted(requestId);
        request.clickonfilemanager();
        var file = "//span[text()='name']";
        cy.xpath(file.replace('name', screen)).should('be.visible');
        cy.xpath("(//div[@id='fileManager']//tr)[2]//td[2]").should('be.visible');
        // cy.get('#tcp4-2175-display1653045946823-qtgcmbkn').should('contain',name);

    }
    actionsAndAssertionsOfTCP42422(requestId) {
        cy.xpath("//button[text()[normalize-space()='Add']]").should('be.visible').click();
        cy.xpath("(//input[@name='text'])[1]").type("check enabled");
        cy.xpath("(//input[@name='Check'])[1]").click();
        cy.xpath("//button[text()='Ok']").click();
        cy.xpath("(//td[@class='table-column']/following-sibling::td)[1]").should('contain', 'true');

        //click on add button of record list
        cy.xpath("//button[text()[normalize-space()='Add']]").click();
        cy.xpath("(//input[@name='text'])[1]").type("check disabled");
        cy.xpath("//button[text()='Ok']").click();
        cy.xpath("(//td[@class='table-column']/following-sibling::td)[3]").should('contain', 'false');
        //cy.wait(4000);
        //click on new submit
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();


        request.verifytaskiscompleted();
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        //cy.wait(2000);
        cy.xpath("(//td[@role='cell'])[2]").should('be.visible').should('contain', 'true');
        cy.xpath("(//td[@class='table-column']/following-sibling::td)[3]").should('contain', 'false');
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifytaskiscompleted();
        request.verifyRequestisCompleted(requestId);
    }

    actionsAndAssertionsOfTCP42441(requestId) {
        cy.xpath("(//div[text()='Field must be accepted'])[1]").should('be.visible');
        cy.xpath("(//input[@class='form-check-input is-invalid'])[1]").click();
        //cy.wait(2000);
        cy.xpath("(//div[@class='invalid-feedback']//div)[1]").should('not.have.value', "Field must be accepted");

        //date picker 1
        //cy.wait(3000);
        cy.xpath("//label[text()='picker_1']/following::input[1]").should('be.visible').click().type('06/03/2022');
        cy.xpath("//div[text()='Field must be accepted'][1]").should('be.visible');
        cy.xpath("//label[text()='input_1']/following::input[1]").type("yes");
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', "Field must be accepted");
        //check box 2
        //cy.wait(3000);
        cy.xpath("(//div[text()='Field is required'])[1]").should('be.visible');
        cy.xpath("(//input[@type='checkbox'])[2]").click();
        cy.xpath("(//div[@class='invalid-feedback']//div)[1]").should('not.have.value', "Field is required");
        cy.xpath("//div[text()='Field is required'][1]").should('be.visible');
        //datepicker 2
        //cy.wait(3000);
        cy.xpath("(//div[text()='Must be after 2020-02-20'])[1]").should('be.visible');
        cy.xpath("//label[text()='picker_2']/following::input[1]").type("2021-07-01");
        cy.xpath("(//div[@class='invalid-feedback d-block']//div)[1]").should('not.have.value', "Must be after 2020-02-20");
        //input 2
        //cy.wait(3000);
        cy.xpath("(//div[text()='Must be after 2020-02-20'])[1]").should('be.visible');
        cy.xpath("//label[text()='input_2']/following::input[1]").type("2022-02-20");
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', "Must be after 2020-02-20");
        //checkbox 3
        //cy.wait(3000);
        cy.xpath("//div[text()='Field is required'][1]").should('be.visible');
        cy.xpath("(//input[@type='checkbox'])[3]").click();
        cy.xpath("(//div[@class='invalid-feedback']//div)[1]").should('not.have.value', "Field is required");
        //datepicker 3
        //cy.wait(3000);
        cy.xpath("//div[text()='Must be equal or after 2020-02-20']").should('be.visible')
        cy.xpath("//label[text()='date_picker_3']/following::input[1]").type("2020-02-20");
        cy.xpath("(//div[@class='invalid-feedback d-block']//div)[1]").should('not.have.value', "Must be equal or after 2020-02-20");
        // input 3
        //cy.wait(3000);
        cy.xpath("(//div[text()='Field is required'])[1]").should('be.visible');
        cy.xpath("//label[text()='input_3']/following::input[1]").type("234");
        cy.xpath("//div[text()='Accepts only alphabet characters']").should('be.visible');
        cy.xpath("(//div[text()='Field is required'])[1]").should('be.visible');
        cy.xpath("//label[text()='input_3']/following::input[1]").clear().type("test");
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', "Accepts only alphabet characters");
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', "Field is required");
        //checkbox 4
        //cy.wait(3000);
        cy.xpath("//label[text()='checkbox_4']").click();
        //cy.xpath("(//div[text()='Field is required'])[1]").should('not.have.value',"Field is required");
        cy.xpath("//div[text()='Must be same as form_checkbox_4']").should('be.visible');
        //datepicker4
        //cy.wait(3000);
        cy.xpath("//div[text()='Must be before 2020-02-20']").should('be.visible');
        cy.xpath("//label[text()='date_picker_4']/following-sibling::input").type("2019-03-28");
        cy.xpath("(//div[@class='invalid-feedback d-block']//div)[1]").should('not.have.value', "Must be before 2020-02-20");
        //input 4
        //cy.wait(3000);
        cy.xpath("//label[text()='input_4']/following-sibling::input").type("@!");
        cy.xpath("//div[text()='Accepts only alphanumerics']").should("be.visible");
        cy.xpath("//label[text()='input_4']/following-sibling::input").clear().type("test");
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', "Accepts only alphanumerics");
        //check box 5
        //cy.wait(3000);
        cy.xpath("//div[text()='Must be same as form_checkbox_4']").should('be.visible');
        cy.xpath("//label[text()='checkbox_5']").click();
        cy.xpath("//div[@class='invalid-feedback']//div[1]").should('not.exist');
        //datepicker 5
        //cy.wait(3000);
        cy.xpath("//div[text()='Must be equal or before 2020-02-20']").should('be.visible');
        cy.xpath("//label[text()='date_picker_5']/following-sibling::input").type("2020-02-20");
        cy.xpath("//div[@class='invalid-feedback d-block']//div[1]").should('not.have.value', "Must be equal or before 2020-02-20");
        //input 5
        //cy.wait(3000);
        cy.xpath("//label[text()='input_5']/following-sibling::input").type("test");
        cy.xpath("//div[text()='Must be a valid email address']").should('be.visible');
        cy.xpath("//label[text()='input_5']/following-sibling::input").clear().type("test@test.com");
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', "Must be a valid email address");
        //input 6
        //cy.wait(3000);
        cy.xpath("(//div[text()='Invalid value'])[1]").should('be.visible');
        cy.xpath("//label[text()='input_6']/following-sibling::input").type("20");
        cy.xpath("(//div[text()='Invalid value'])[1]").should('not.have.value', "Invalid value");
        //input 7
        //cy.wait(3000);
        cy.xpath("//label[text()='input_7']/following-sibling::input").type(1234567);
        cy.xpath("//div[text()='Must have at most 5']").should('be.visible');
        cy.xpath("//label[text()='input_7']/following-sibling::input").clear().type('test');
        cy.xpath("(//div[@class='invalid-feedback'])[2]").should('not.have.value', "Must have at most 5");
        //input 8
        //cy.wait(3000);
        cy.xpath("//label[text()='input_8']/following-sibling::input").type("123");
        cy.xpath("//div[text()='Must have at least 4']").should('be.visible');
        cy.xpath("//label[text()='input_8']/following-sibling::input").clear().type("test");
        cy.xpath("(//div[@class='invalid-feedback'])[2]").should('not.have.value', "Must have at least 4");
        //input 9
        //cy.wait(3000);
        cy.xpath("//label[text()='nput_9']/following-sibling::input").type("20");
        cy.xpath("(//div[text()='Invalid value'])[1]").should('be.visible');
        cy.xpath("//label[text()='nput_9']/following-sibling::input").clear().type("21");
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', 'Invalid value');
        //input 10
        //cy.wait(3000);
        cy.xpath("//div[text()='Invalid value']").should("be.visible");
        cy.xpath("//label[text()='input_10']/following-sibling::input").type("test");
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', "Invalid value");
        //input 11
        //cy.wait(3000);
        cy.xpath("(//div[text()='Field is required'])[1]").should('be.visible');
        cy.xpath("//label[text()='input_11']/following-sibling::input").type('test');
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.have.value', "Field is required");
        cy.xpath("//input[@name='form_input_12']/following-sibling::div[1]").should('be.visible');
        //cy.wait(3000);
        //input 12
        cy.xpath("(//div[text()='Field is required'])[1]").should('be.visible');
        //cy.wait(3000);
        cy.xpath("(//div[text()='Field is required'])[2]").should('be.visible');
        //cy.wait(5000);
        cy.xpath("//label[text()='input_12']/following-sibling::input").type("test");
        //cy.wait(3000);
        cy.xpath("(//div[@class='invalid-feedback'])[1]").should('not.exist');
        //cy.wait(3000);
        cy.xpath("(//div[@class='invalid-feedback'])[2]").should('not.exist');
        //cy.wait(3000);
        //input 13
        cy.xpath("//label[text()='input_13']/following-sibling::input").type("test");
        //cy.wait(3000);
        cy.xpath("//div[text()='Must be same as form_input_13']").should('be.visible');

        //input 14
        cy.xpath("//div[text()='Must be same as form_input_13']").should('be.visible');
        //cy.wait(3000);
        cy.xpath("//label[text()='input_14']/following-sibling::input").type('test');
        cy.xpath("//div[text()='Must be same as form_input_13']").should('not.exist');
        //input 15
        cy.xpath("//label[text()='input_15']/following-sibling::input").type("yuopkjmn");
        //cy.wait(3000);
        cy.xpath("//div[text()='Must be a valid URL']").should('be.visible');
        //cy.wait(3000);
        cy.xpath("//label[text()='input_15']/following-sibling::input").clear().type("https://qualitlabs-qa.processmaker.net/");
        //cy.wait(3000);
        cy.xpath("//div[text()='Must be a valid URL']").should('not.exist');
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifyRequestisCompleted(requestId);
    }

    actionsAndAssertionsOfTCP42211(requestId) {
        cy.xpath("//input[@data-cy='screen-field-checkbox1']").click();
        cy.xpath("(//div[@class='page'])[2]").should('be.visible');
        cy.xpath("(//label[text()='New Date Picker'])[1]/following::input[1]").type('2022-5-10{enter}');
        cy.xpath("//p[text()='シラニカトナ']").should('contain', 'シラニカトナ');
        cy.xpath("//input[@data-cy='screen-field-checkbox']").click();
        cy.xpath("//p[text()='ASSAM is ASSAM KERELA is KERELA ORRISA is ORRISA']").should('be.visible')
        cy.wait(3000);
        cy.xpath("//button[text()[normalize-space()='Add']]").click();
        cy.wait(1000);
        cy.xpath("(//span[text()='Administrators'])[1]").click();
        cy.xpath("//button[text()='Ok']").click();
        cy.xpath("(//button[@class='btn btn-primary'])[2]").should('be.visible');
        cy.xpath("(//button[text()[normalize-space()='New Submit']])[2]").click();
        request.verifyTaskIsCompleted();
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        cy.xpath("(//button[text()[normalize-space()='New Submit']])[1]").click();
        request.verifyTaskIsCompleted();
        request.verifyRequestisCompleted(requestId);

    }
    actionsAndAssertionsOfTCP42288(requestId){
        const addRecordBTn = "[data-cy='add-row']";
        const selectListXpath = "//label[text()='Select List']/parent::div//div[@class='multiselect__tags']";
        const inputLineXpath = "//label[text()='Select List']/parent::div//input";
        const okBtnXPath = "//button[text()='Ok']";

        //First Record List

        //Add a record list 1
        cy.get(addRecordBTn).should('be.visible').click();
        cy.xpath(selectListXpath).first().should('be.visible').click();
        cy.wait(2000);
        cy.xpath(inputLineXpath).first().type('title_1').should('have.value','title_1');
        cy.xpath(inputLineXpath).first().type('{enter}');
        //add file
        cy.get("[type='file']").attachFile("drone.jpg");
        //add signature
        cy.xpath("(//div[@class='signature pl-0']//canvas)[1]").click();
        cy.xpath("//span[text()='success']").should('be.visible');
        //click on ok
        cy.xpath(okBtnXPath).click();

        //Add a record list 2
        cy.get(addRecordBTn).should('be.visible').click();
        cy.xpath(selectListXpath).first().should('be.visible').click();
        cy.wait(3000);
        cy.xpath(inputLineXpath).first().type('title_2').should('have.value','title_2');
        cy.xpath(inputLineXpath).first().type('{enter}');
        //add file
        cy.get("[type='file']").attachFile("data.json");
        //add signature
        cy.xpath("(//div[@class='signature pl-0']//canvas)[1]").click();
        cy.xpath("//span[text()='success']").should('be.visible');
        //click on ok
        cy.xpath(okBtnXPath).click();

        //Add a loop 1
        cy.get('[data-cy="loop-loop-add"]').should('be.visible').click();

        //Second Record list

        //Add a record list 1
        cy.get(addRecordBTn).eq(1).should('be.visible').click();
        cy.xpath(selectListXpath).eq(2).should('be.visible').click();
        cy.wait(3000);
        cy.xpath(inputLineXpath).eq(2).type('title_2').should('have.value','title_2');
        cy.xpath(inputLineXpath).eq(2).type('{enter}');
        //add file
        cy.get("[type='file']").eq(2).attachFile("drone.jpg");
        cy.xpath("//span[text()='success']").should('be.visible');
        //add signature
        cy.xpath("(//div[@class='signature pl-0']//canvas)[3]").click();
        //click on ok
        cy.xpath(okBtnXPath).eq(1).click();

        //Add a record list 2
        cy.get(addRecordBTn).eq(1).should('be.visible').click();
        cy.xpath(selectListXpath).eq(2).should('be.visible').click();
        cy.wait(5000);
        cy.xpath(inputLineXpath).eq(2).type('title_3').should('have.value','title_3');
        cy.xpath(inputLineXpath).eq(2).type('{enter}');
        //add file
        cy.get("[type='file']").eq(2).attachFile("data.json");
        cy.xpath("//span[text()='success']").should('be.visible');
        //add signature
        cy.xpath("(//div[@class='signature pl-0']//canvas)[3]").click();
        //click on ok
        cy.xpath(okBtnXPath).eq(1).click();


        //Add a loop 2
        cy.xpath('(//*[@data-cy="loop-loop-add"])[1]').should('be.visible');
        cy.xpath('(//*[@data-cy="loop-loop-add"])[1]').click();

        // Third Record List

        //Add a record list 1
        cy.get(addRecordBTn).eq(2).should('be.visible').click();
        cy.xpath(selectListXpath).eq(4).should('be.visible').click();
        cy.wait(4000);
        cy.xpath(inputLineXpath).eq(4).type('title_3').should('have.value','title_3');
        cy.xpath(inputLineXpath).eq(4).type('{enter}');
        //add file
        cy.get("[type='file']").eq(4).attachFile("drone.jpg");
        cy.xpath("//span[text()='success']").should('be.visible');
        //add signature
        cy.xpath("(//div[@class='signature pl-0']//canvas)[5]").click();
        //click on ok
        cy.xpath(okBtnXPath).eq(2).click();

        //Add a record list 2
        cy.get(addRecordBTn).eq(2).should('be.visible').click();
        cy.xpath(selectListXpath).eq(4).should('be.visible').click();
        cy.wait(4000);
        cy.xpath(inputLineXpath).eq(4).type('title_4').should('have.value','title_4');
        cy.xpath(inputLineXpath).eq(4).type('{enter}');
        //add file
        cy.get("[type='file']").eq(4).attachFile("drone.jpg");
        cy.xpath("//span[text()='success']").should('be.visible');
        //add signature
        cy.xpath("(//div[@class='signature pl-0']//canvas)[5]").click();
        //click on ok
        cy.xpath(okBtnXPath).eq(2).click();

        //click on submit button
        cy.get('[id="main"]').scrollTo('bottom');
        cy.xpath('//button[text()[normalize-space()="New Submit"]]').should('be.visible');
        cy.wait(1000);
        cy.xpath('//button[text()[normalize-space()="New Submit"]]').click();

        //verify  task is completed
        request.verifyTaskIsCompleted();
        //open request by id
        request.openRequestById(requestId);
        //open manual task
        request.clickOnTaskName(1, 1);
        cy.xpath("//td[contains(text(),'title_1')]").should('be.visible');
        //verify the author1 is showing
        cy.xpath('//td[normalize-space(text())="tester"]').should('be.visible');
        //verify the value 2 in loop1
        cy.xpath('//td[normalize-space(text())="title_2"]').eq(0).should('be.visible');
        //verify the author2 is showing
        cy.xpath('//td[normalize-space(text())="tester_2"]').eq(0).should('be.visible');


        cy.get('[id="main"]').scrollTo('bottom');
        //verify the value 2 in loop1
        cy.xpath('//td[normalize-space(text())="title_2"]').eq(1).should('be.visible');
        //verify the author2 is showing
        cy.xpath('//td[normalize-space(text())="tester_2"]').eq(1).should('be.visible');


        cy.xpath("//td[contains(text(),'title_3')]").eq(1).should('be.visible');
        //verify the author1 is showing
        cy.xpath('//td[normalize-space(text())="tester_3"]').eq(1).should('be.visible');
        //verify the value 2 in loop1
        cy.xpath('//td[normalize-space(text())="title_4"]').eq(0).should('be.visible');
        //verify the author2 is showing
        cy.xpath('//td[normalize-space(text())="tester_4"]').eq(0).should('be.visible');

        cy.xpath("//button[contains(text(),'Complete Task')]").click();

    }

    actionsAndAssertionsOfTCP42154(requestId, name1, name2) {
        cy.xpath("//input[@data-cy='screen-field-form_input_1']").type("qwert");
        cy.xpath("//textarea[@data-cy='screen-field-form_text_area_1']").type("abcdefghjjbffnwfewyfwh");
        cy.xpath("//div[@data-cy='screen-field-form_date_picker_1']//input[1]").type('2022-06-08');
        cy.xpath("(//div[@data-cy='screen-field-form_select_list_1']//div[1])[1]").click();
        cy.xpath("//span[text()='test2']").click();
        cy.xpath("//button[@class='btn btn-primary']").click();
        request.verifyRequestisCompleted(requestId);

        //Task page
        navHelper.navigateToTasksPage();
        request.openProcessInTaskPage(name2, "Signal Manual Task");
        cy.xpath("//li[text()[normalize-space()='Signal Manual Task']]").should('be.visible');
        cy.xpath("//button[text()[normalize-space()='Complete Task']]").click();
        const requestId2 = parseInt(requestId) + 1;
        request.verifyRequestisCompleted(requestId2);
    }

    actionsAndAssertionsOfTCP42152(requestId, name, timeStamp) {
        //request part 1
        cy.xpath("//input[@class='form-control']").type("input11");
        cy.xpath("//button[@class='btn btn-primary']").click();
        request.verifyTaskIsCompleted();
        cy.wait(5000);

        //requestpart 2
        header.clickOnAddRequest();
        cy.wait(4000);
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            cy.xpath("//input[@class='form-control']").type("input12");
            cy.xpath("//button[@class='btn btn-primary']").click();
            request.verifyTaskIsCompleted();
            cy.wait(5000);
        });
        //requestpart 3
        header.clickOnAddRequest();
        cy.wait(4000);
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            cy.xpath("//input[@class='form-control']").type("input13");
            cy.xpath("//button[@class='btn btn-primary']").click();
            request.verifyTaskIsCompleted();
            cy.wait(5000);
        });
        //requestpart 4
        header.clickOnAddRequest();
        cy.wait(4000);
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            cy.xpath("//input[@class='form-control']").type("input14");
            cy.xpath("//button[@class='btn btn-primary']").click();
            request.verifyTaskIsCompleted();
            cy.wait(5000);
        });

        //requestpart 5
        header.clickOnAddRequest();
        cy.wait(4000);
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            cy.xpath("//input[@class='form-control']").type("input15");
            cy.xpath("//button[@class='btn btn-primary']").click();
            request.verifyTaskIsCompleted();
            cy.wait(5000);

            const testname1 = 'Automation-Username' + timeStamp;
            const testname2 = 'Automation-Firstname' + timeStamp;
            const testname3 = 'Automation-Lastname' + timeStamp;
            const testname4 = 'Automation-Groupname' + timeStamp;
            //create user
            navHelper.navigateToAdminUserPage();
            adminP.createUser(testname1, testname2, testname3, "QA","Active","abcd7890@gmail.com","H12345678");
            navHelper.navigateToAdminGroupPage();
            adminP.createGroupAddingUsers(testname4, testname2, testname1);

            //request page
            navHelper.navigateToRequestsPage();
            cy.wait(3000);
            cy.xpath("(//div[@class='multiselect__tags'])[1]").type(name);
            cy.xpath("(//div[@class='multiselect__tags'])[1]").type('{enter}');
            cy.wait(2000);
            cy.xpath("//i[@class='fas fa-search']").click();
            cy.xpath("//button[contains(@class,'btn btn-save-search')]").click();
            cy.xpath("//h5[text()='Save Search']").should('be.visible');
            const Savescreen = 'Automation-saveScreenName' + timeStamp
            cy.xpath("//label[text()='Name']/following::input[1]").type(Savescreen);
            cy.wait(3000);
            cy.xpath("//legend[text()[normalize-space()='Share With Groups']]//parent::fieldset//div[@class='multiselect__tags']").click();
            cy.xpath("//input[@placeholder='Select Groups']").type(timeStamp);
            cy.xpath("//input[@placeholder='Select Groups']").type('{enter}');
            cy.xpath("//button[text()='Save']").click();
            cy.wait(2000);
            cy.get('[class="d-print-none"]').scrollTo('bottom');
            var val3 = "//a[contains(@aria-label,'name')]";
            cy.xpath(val3.replace('name', Savescreen)).should('be.visible');
            cy.xpath(val3.replace('name', Savescreen)).click();
            cy.xpath("//li[@role='heading']").should('be.visible');
            cy.xpath("//a[@class='nav-link']//i[@class='fas fa-fw fa-chart-line']").click();
            const val2 = 'A2152-chart' + timeStamp;
            cy.xpath("//button[@class='btn w-100 btn-secondary']").should('be.visible');
            cy.xpath("//button[@class='btn w-100 btn-secondary']").click();
            cy.wait(2000);
            cy.xpath("(//input[@class='form-control'])[1]").type(val2);
            cy.xpath("(//p[@class='m-0 p-0'])[1]").click();
            cy.xpath("(//a[@data-toggle='tab'])[2]").click();
            cy.xpath("(//span[text()[normalize-space()='Column']])[1]").click();
            cy.xpath("(//div[text()='Status '])[1]").click();
            cy.xpath("(//div[@class='multiselect__select'])[2]").click();
            cy.xpath("(//div[text()='Started '])[2]").click();
            cy.xpath("(//div[@class='multiselect__select'])[3]").click();
            cy.xpath("//div[text()='Count of Records ']").click();
            cy.xpath("//button[text()[normalize-space()='Save']]").click();
            cy.xpath("//button[contains(@class,'btn card-header-button')]/following-sibling::div[1]").should('be.visible');
        });
    }

    actionsAndAssertionsOfTCP42172(coverstaion_screen_1, name, processId) {
        cy.wait(2000);
        //go to url
        cy.visit('/webentry/' + processId + '/node_1');
        //verify screen name
        cy.get['[name="form_screen"]'.replace('form_screen', coverstaion_screen_1)];
        cy.get('[name="CommentType"]').type('test web entry');
        cy.get('[data-cy="screen-field-Enable"]').click();
        cy.get('[class="btn btn-primary"]').click();
        cy.wait(2000);
        cy.xpath("//strong[text()='Completed!!!!!!']").should('be.visible');
        navHelper.navigateToAllRequests();
        request.openInPogressProcessInAllRequests(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            cy.get('[class="form-control"]').should('have.value', 'test web entry');
            cy.get('[class="comment-area"]').type('test web entry comments');
            cy.get('[class="btn text-uppercase btn-secondary btn-sm"]').click();
            cy.xpath('//p[text()="test web entry comments"]').should('be.visible');
            cy.xpath("//div[@contenteditable='true']").type('https://www.ecosia.org/');
            cy.get('[class="btn text-uppercase btn-secondary btn-sm"]').click();
            cy.wait(4000);
            cy.get('#main').scrollTo('bottom');
            cy.xpath("//a[text()='https://www.ecosia.org/']").should('be.visible');
            cy.get('#main').scrollTo(0, 300);
            cy.xpath('(//i[@class="fas fa-thumbs-down"])[1]').click();
            cy.get('#main').scrollTo(0, 500);
            cy.xpath("(//button[@class='btn btn-outline-secondary btn-sm'])[1]").click();
            cy.wait(2000);
            cy.get('#main').scrollTo(0, 500);
            cy.xpath('(//i[@class="fas fa-thumbs-down"])[1]').should('be.visible');
            cy.xpath("(//i[contains(@class,'far fa-smile')])[1]").click();
            cy.xpath("//input[@placeholder='Search']").type('Smile');
            cy.xpath("(//div[@class='emoji-mart-category']//span)[2]").click();
            cy.wait(2000);
            cy.xpath("(//button[@class='btn btn-outline-secondary btn-sm'])[1]").click();
            cy.get('[class="emoji-mart-emoji"]').should('be.visible');
            cy.xpath("(//button[@class='btn btn-info btn-sm'])[1]").click();
            cy.xpath("(//div[@placeholder='Add a comment...'])[1]").clear();
            cy.xpath('(//div[@placeholder="Add a comment..."])[1]').type('test web entry comments Edited');
            cy.xpath('(//button[@class="btn text-uppercase btn-secondary btn-sm"])[1]').click();
            cy.xpath("//p[text()='test web entry comments Edited']").should('be.visible');
            cy.xpath('(//button[@class="btn btn-danger btn-sm"])[1]').click();
            cy.xpath("//button[text()='Confirm']").click();
            cy.xpath('//div[@role="alert"]').should('be.visible');
            cy.get('#main').scrollTo('top');
            cy.xpath("//button[normalize-space(text())='New Submit']").click();
            request.verifyRequestisCompleted(requestId, 0);
        })
    }

    actionsAndAssertionsOfTCP42171(requestId){
        cy.get('[data-cy="screen-field-CommentType"]').type("comment Type");
        // cy.xpath("//label[text()='Comment Type']/following::input[1]").type('comment Type');
        cy.xpath("//label[text()='Enable']").click();
        cy.get('.comment-area').type("testcase comments");
        cy.get('.comment-area').type('{selectAll}');
        cy.get('[title="Bold"] > .fas').click();
        cy.get('.comment-area').should('contain','**testcase comments**');
        cy.xpath("(//a[@href='#'])[3]").click();
        cy.xpath("//div[@class='card-body']//strong[1]").should('be.visible');
        cy.xpath("(//a[@href='#'])[2]").click();
        cy.get('.comment-area').should('contain','**testcase comments**');
        cy.xpath("//button[contains(@class,'btn text-uppercase')]").click();
        cy.xpath("(//div[contains(@class,'card mt-3')]//div)[1]").should('contain','testcase comments');
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifyTaskIsCompleted();
        cy.wait(2000);

        //request part 2 reaction
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        cy.xpath("//div[@contenteditable='true']").type("Test Reactions");
        cy.xpath("//button[contains(@class,'btn text-uppercase')]").click();
        cy.get('.comment-editor > :nth-child(1) > p').should('contain','Test Reactions');
        cy.xpath("//button[text()[normalize-space()='+']]").click();
        cy.xpath("//input[@placeholder='Search']").type("Thumbs Up Sign");
        cy.get('.emoji-mart-scroll > :nth-child(1) > .emoji-mart-emoji').click();
        cy.get('.card-body > .btn').click();
        cy.xpath("//span[@class='emoji-mart-emoji']").should('be.visible');
        cy.get('.form-group > .btn').click();
        request.verifyTaskIsCompleted();
        cy.wait(2000);
        //request part 3 voting
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        cy.xpath("(//a[@class='nav-link active'])[3]").click();
        cy.xpath("//div[@contenteditable='true']").type("Test Voting");
        cy.xpath("//button[contains(@class,'btn text-uppercase')]").click();
        cy.xpath("(//div[contains(@class,'card mt-3')]//div)[1]").should('contain','Test Voting');
        cy.xpath("//i[@class='fas fa-thumbs-up']").click();
        cy.xpath("//button[text()='Load Replies (1)']").click();
        cy.xpath("//span[contains(@class,'btn btn-sm')]//i[1]").should('be.visible');
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifyTaskIsCompleted();
        cy.wait(2000);
        //request part 4 Edit
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        cy.xpath("(//a[@class='nav-link active'])[3]").click();
        cy.xpath("//div[@contenteditable='true']").type("Test Edit");
        cy.xpath("//button[contains(@class,'btn text-uppercase')]").click();
        cy.xpath("(//div[contains(@class,'card mt-3')]//div)[1]").should('be.visible');
        cy.xpath("//button[@title='Edit Comment']").click();
        cy.xpath("(//div[@contenteditable='true'])[1]").clear();
        cy.xpath("(//div[@contenteditable='true'])[1]").type("test edit edited");
        cy.xpath("//button[text()=' Update Comment']").click();
        cy.get('.comment-editor > :nth-child(1) > p').should('contain','test edit edited');
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        request.verifyTaskIsCompleted();
        cy.wait(2000);
        //request part 5 delete
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);
        cy.xpath("(//a[@class='nav-link active'])[3]").click();
        cy.xpath("//div[@contenteditable='true']").type("test delete");
        cy.xpath("//button[contains(@class,'btn text-uppercase')]").click();
        cy.xpath("(//div[contains(@class,'card mt-3')]//div)[1]").should('contain','test delete');
        cy.xpath("//button[@title='Remove Comment']").click();
        cy.xpath("//button[text()='Confirm']").click();
        cy.get('.comment-area').should('not.contain','test delete');
        //cy.xpath("(//div[contains(@class,'card mt-3')]//div)[1]").should('not.contain',);
        cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
        cy.xpath("//td[text()='true']").should('be.visible');
        cy.xpath("//td[text()='comment Type']").should('be.visible');
        request.verifyRequestisCompleted(requestId);
    }

    actionsAndAssertionsOfTCP42404(requestId){
        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("1");
        cy.get('input[type="file"]').attachFile('images/1.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("2");
        cy.get('input[type="file"]').attachFile('images/2.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("3");
        cy.get('input[type="file"]').attachFile('images/3.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("4");
        cy.get('input[type="file"]').attachFile('images/4.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("5");
        cy.get('input[type="file"]').attachFile('images/5.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("6");
        cy.get('input[type="file"]').attachFile('images/6.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("7");
        cy.get('input[type="file"]').attachFile('images/7.png');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("8");
        cy.get('input[type="file"]').attachFile('images/8.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("9");
        cy.get('input[type="file"]').attachFile('images/9.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("10");
        cy.get('input[type="file"]').attachFile('images/10.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("11");
        cy.get('input[type="file"]').attachFile('images/11.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("12");
        cy.get('input[type="file"]').attachFile('images/12.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("13");
        cy.get('input[type="file"]').attachFile('images/13.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("14");
        cy.get('input[type="file"]').attachFile('images/14.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("15");
        cy.get('input[type="file"]').attachFile('images/15.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("16");
        cy.get('input[type="file"]').attachFile('images/16.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("17");
        cy.get('input[type="file"]').attachFile('images/17.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("18");
        cy.get('input[type="file"]').attachFile('images/18.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("19");
        cy.get('input[type="file"]').attachFile('images/19.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("20");
        cy.get('input[type="file"]').attachFile('images/20.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("21");
        cy.get('input[type="file"]').attachFile('images/21.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("22");
        cy.get('input[type="file"]').attachFile('images/22.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("23");
        cy.get('input[type="file"]').attachFile('images/23.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("24");
        cy.get('input[type="file"]').attachFile('images/24.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("25");
        cy.get('input[type="file"]').attachFile('images/25.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("26");
        cy.get('input[type="file"]').attachFile('images/26.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("27");
        cy.get('input[type="file"]').attachFile('images/27.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("28");
        cy.get('input[type="file"]').attachFile('images/28.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("29");
        cy.get('input[type="file"]').attachFile('images/29.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@data-cy = 'add-row']").click();
        cy.xpath("(//input[@aria-label = 'Name'])[1]").type("30");
        cy.get('input[type="file"]').attachFile('images/30.jfif');
        cy.wait(2000);
        cy.xpath("//button[text()[normalize-space() = 'Ok']]").click();

        cy.xpath("//button[@name='submit']").click();

        request.verifyTaskIsCompleted();

        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);

        cy.xpath("//button[@name='submit']").click();

        request.verifyRequestisCompleted(requestId);

        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.0.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.1.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.2.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.3.name']").should('be.visible');
        cy.get('#main').scrollTo(0, 1000);
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.4.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.5.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.6.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.7.name']").should('be.visible');
        cy.get('#main').scrollTo(0, 2000);
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.8.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.9.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.10.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.11.name']").should('be.visible');
        cy.get('#main').scrollTo(0, 3000);
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.12.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.13.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.14.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.15.name']").should('be.visible');
        cy.get('#main').scrollTo(0, 4000);
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.16.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.17.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.18.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.19.name']").should('be.visible');
        cy.get('#main').scrollTo(0, 5000);
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.20.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.21.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.22.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.23.name']").should('be.visible');
        cy.get('#main').scrollTo(0, 6000);
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.24.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.25.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.26.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.27.name']").should('be.visible');
        cy.get('#main').scrollTo(0, 7000);
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.28.name']").should('be.visible');
        cy.xpath("//td[text()='upload_documents_grid_cash_drawer_setup.29.name']").should('be.visible');

        cy.xpath("//div[text()[normalize-space() = 'Admin User has completed the task AA']]").should('be.visible');
        cy.xpath("//div[text()[normalize-space() = 'Admin User has completed the task BB']]").should('be.visible');
    }

    actionsAndAssertionsOfTCP42138(screen_name1,name,processId,screen_name2) {
        cy.wait(2000);
        //go to url
        cy.visit('/webentry/' + processId + '/node_2');
        //verify screen name
        cy.get('[name="form_screen"]'.replace('form_screen', screen_name1)).should('be.visible');
        cy.xpath("//button[text()[normalize-space()='Add']]").click();
        cy.xpath('(//input[@data-cy="screen-field-input1"])[1]').type('Recordlist1 input1');
        cy.xpath('(//textarea[@name="textArea1"])[1]').type('Recordlist1 textarea1');
        cy.xpath('(//input[@aria-label="datePicker1"])[1]').type('2022-07-12{enter}');
        cy.xpath('(//input[@aria-label="datePicker2"])[1]').type('2022-07-13 13:49{enter}');
        cy.xpath("//button[text()='Ok']").click();
        //second recordlist
        cy.xpath("//button[text()[normalize-space()='Add']]").click();
        cy.xpath('(//input[@data-cy="screen-field-input1"])[1]').type('Recordlist2 input1');
        cy.xpath('(//textarea[@name="textArea1"])[1]').type('Recordlist2 textarea1');
        cy.xpath('(//input[@aria-label="datePicker1"])[1]').type('2022-07-12{enter}');
        cy.xpath('(//input[@aria-label="datePicker2"])[1]').type('2022-07-13 13:49{enter}');
        cy.xpath("//button[text()='Ok']").click();
        //third recordlist
        cy.xpath("//button[text()[normalize-space()='Add']]").click();
        cy.xpath('(//input[@data-cy="screen-field-input1"])[1]').type('Recordlist3 input1');
        cy.xpath('(//textarea[@name="textArea1"])[1]').type('Recordlist3 textarea1');
        cy.xpath('(//input[@aria-label="datePicker1"])[1]').type('2022-07-12{enter}');
        cy.xpath('(//input[@aria-label="datePicker2"])[1]').type('2022-07-13 13:49{enter}');
        cy.xpath("//button[text()='Ok']").click();
        //first loop
        cy.get('[name="input2"]').type('loop1 input2');
        cy.get('[name="textArea2"]').type('loop1 input2');
        cy.xpath('//input[@aria-label="Date Picker 3"]').type('2022-07-13');
        cy.xpath('//input[@aria-label="Date Picker 4"]').type("2022-07-14 16:18");
        cy.get('[class="fas fa-plus"]').click();
        //second loop
        cy.xpath('(//input[@name="input2"])[2]').type('loop2 input2')
        cy.xpath('(//textarea[@name="textArea2"])[2]').type('loop2 input2');
        cy.xpath('(//input[@aria-label="Date Picker 3"])[2]').type('2022-07-01');
        cy.xpath('(//input[@aria-label="Date Picker 4"])[2]').type('2022-07-13 16:31');
        cy.get('[class="fas fa-plus"]').click();
        //third loop
        cy.xpath('(//input[@name="input2"])[3]').type('loop3 input2')
        cy.xpath('(//textarea[@name="textArea2"])[3]').type('loop3 input2');
        cy.xpath('(//input[@aria-label="Date Picker 3"])[3]').type('2022-07-01');
        cy.xpath('(//input[@aria-label="Date Picker 4"])[3]').type('2022-07-13 16:31');
        cy.get('[class="fas fa-plus"]').click();
        //fourth loop
        cy.xpath('(//input[@name="input2"])[4]').type('loop4 input2')
        cy.xpath('(//textarea[@name="textArea2"])[4]').type('loop4 input2');
        cy.xpath('(//input[@aria-label="Date Picker 3"])[4]').type('2022-07-01');
        cy.xpath('(//input[@aria-label="Date Picker 4"])[4]').type('2022-07-13 16:31');
        cy.xpath("//button[normalize-space(text())='New Submit']").click();
        cy.wait(2000);
        cy.url().should('eq', 'https://www.ecosia.org/');
        navHelper.navigateToRequestsPage();
        request.openRequestByName(name);
        cy.url().then(url => {
            var requestId = url.split('/')[4].trim();
            request.clickOnTaskName(1, 1);
            cy.get('[name="form_screen"]'.replace('form_screen', screen_name2)).should('be.visible');
            cy.xpath('(//div[@class="multiselect__select"])[1]').click();
            cy.xpath("//li[@id='option-76-0']//span[text()='Recordlist1 input1']").should('be.visible');
            cy.xpath("//li[@id='option-76-1']//span[text()='Recordlist2 input1']").should('be.visible');
            cy.xpath("//li[@id='option-76-2']//span[text()='Recordlist3 input1']").should('be.visible');
            cy.xpath("//li[@id='option-76-1']//span[text()='Recordlist2 input1']").click();
            cy.xpath('(//div[@class="multiselect__select"])[2]').click();
            cy.xpath("//li[@id='option-77-0']//span[text()='Recordlist1 textarea1']").should('be.visible');
            cy.xpath("//li[@id='option-77-1']//span[text()='Recordlist2 textarea1']").should('be.visible');
            cy.xpath("//li[@id='option-77-2']//span[text()='Recordlist3 textarea1']").should('be.visible');
            cy.xpath("//li[@id='option-77-1']//span[text()='Recordlist2 textarea1']").click();
            cy.xpath('(//div[@class="multiselect__select"])[3]').click();
            cy.xpath("//li[@id='option-78-0']//span[text()='2022-07-12']").should('be.visible');
            cy.xpath("//li[@id='option-78-1']//span[text()='2022-07-12']").should('be.visible');
            cy.xpath("//li[@id='option-78-2']//span[text()='2022-07-12']").should('be.visible');
            cy.xpath("//li[@id='option-78-0']//span[text()='2022-07-12']").click();
            cy.xpath('(//div[@class="multiselect__select"])[4]').click();
            cy.xpath("//li[@id='option-79-0']//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li[@id='option-79-1']//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li[@id='option-79-2']//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li[@id='option-79-2']//span[contains(text(),'2022-07-13T')]").click();
            cy.xpath('(//div[@class="multiselect__select"])[5]').click();
            cy.xpath("//li[@id='option-60-0']//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li[@id='option-60-1']//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li[@id='option-60-2']//span[text()='loop3 input2']").should('be.visible');
            cy.xpath("//li[@id='option-60-3']//span[text()='loop4 input2']").should('be.visible');
            cy.xpath("//li[@id='option-60-3']//span[text()='loop4 input2']").click();
            cy.xpath('(//div[@class="multiselect__select"])[6]').click();
            cy.xpath("//li[@id='option-61-0']//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li[@id='option-61-1']//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li[@id='option-61-2']//span[text()='loop3 input2']").should('be.visible');
            cy.xpath("//li[@id='option-61-3']//span[text()='loop4 input2']").should('be.visible');
            cy.xpath("//li[@id='option-61-3']//span[text()='loop4 input2']").click();
            cy.xpath('(//div[@class="multiselect__select"])[7]').click();
            cy.xpath('//li[@id="option-62-0"]//span[text()="2022-07-13"]').should('be.visible');
            cy.xpath('//li[@id="option-62-1"]//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li[@id="option-62-2"]//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li[@id="option-62-3"]//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li[@id="option-62-3"]//span[text()="2022-07-01"]').click();
            cy.xpath('(//div[@class="multiselect__select"])[8]').click();
            cy.xpath('//li[@id="option-63-0"]//span[contains(text(),"2022-07-14T")]').should('be.visible');
            cy.xpath("//li[@id='option-63-1']//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li[@id='option-63-2']//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li[@id='option-63-3']//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li[@id='option-63-3']//span[contains(text(),'2022-07-13T')]").click();
            cy.xpath('(//div[@class="multiselect__select"])[9]').click();
            cy.xpath("//li[@id='option-64-0']//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li[@id='option-64-1']//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li[@id='option-64-2']//span[text()='loop3 input2']").should('be.visible');
            cy.xpath("//li[@id='option-64-3']//span[text()='loop4 input2']").should('be.visible');
            cy.xpath("//li[@id='option-64-1']//span[text()='loop2 input2']").click();
            cy.xpath('(//div[@class="multiselect__select"])[10]').click();
            cy.xpath("//li[@id='option-65-0']//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li[@id='option-65-1']//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li[@id='option-65-2']//span[text()='loop3 input2']").should('be.visible');
            cy.xpath("//li[@id='option-65-3']//span[text()='loop4 input2']").should('be.visible');
            cy.xpath("//li[@id='option-65-3']//span[text()='loop4 input2']").click();
            cy.xpath('(//div[@class="multiselect__select"])[11]').click();
            cy.xpath('//li[@id="option-66-0"]//span[text()="2022-07-13"]').should('be.visible');
            cy.xpath('//li[@id="option-66-1"]//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li[@id="option-66-2"]//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li[@id="option-66-3"]//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li[@id="option-66-3"]//span[text()="2022-07-01"]').click();
            cy.xpath('(//div[@class="multiselect__select"])[12]').click();
            cy.xpath('//li[@id="option-67-0"]//span[contains(text(),"2022-07-14T")]').should('be.visible');
            cy.xpath("//li[@id='option-67-1']//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li[@id='option-67-2']//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li[@id='option-67-3']//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li[@id='option-67-3']//span[contains(text(),'2022-07-13T')]").click();
            cy.xpath('(//div[@class="multiselect__select"])[13]').click();
            cy.xpath("//li[@id='option-68-0']//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li[@id='option-68-1']//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li[@id='option-68-2']//span[text()='loop3 input2']").should('be.visible');
            cy.xpath("//li[@id='option-68-3']//span[text()='loop4 input2']").should('be.visible');
            cy.xpath("//li[@id='option-68-1']//span[text()='loop2 input2']").click();
            cy.xpath('(//div[@class="multiselect__select"])[14]').click();
            cy.xpath("//li[@id='option-69-0']//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li[@id='option-69-1']//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li[@id='option-69-2']//span[text()='loop3 input2']").should('be.visible');
            cy.xpath("//li[@id='option-69-3']//span[text()='loop4 input2']").should('be.visible');
            cy.xpath("//li[@id='option-69-3']//span[text()='loop4 input2']").click();
            cy.xpath('(//div[@class="multiselect__select"])[15]').click();
            cy.xpath('//li[@id="option-70-0"]//span[text()="2022-07-13"]').should('be.visible');
            cy.xpath('//li[@id="option-70-1"]//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li[@id="option-70-2"]//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li[@id="option-70-3"]//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li[@id="option-70-3"]//span[text()="2022-07-01"]').click();
            cy.xpath('(//div[@class="multiselect__select"])[16]').click();
            cy.xpath('//li[@id="option-71-0"]//span[contains(text(),"2022-07-14T")]').should('be.visible');
            cy.xpath("//li[@id='option-71-1']//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li[@id='option-71-2']//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li[@id='option-71-3']//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li[@id='option-71-3']//span[contains(text(),'2022-07-13T')]").click();
            //last loop
            cy.xpath('(//div[@class="multiselect__select"])[17]').click();
            cy.xpath("//li[@id='option-72-0']//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li[@id='option-72-1']//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li[@id='option-72-2']//span[text()='loop3 input2']").should('be.visible');
            cy.xpath("//li[@id='option-72-3']//span[text()='loop4 input2']").should('be.visible');
            cy.xpath("//li[@id='option-72-1']//span[text()='loop2 input2']").click();
            cy.xpath('(//div[@class="multiselect__select"])[18]').click();
            cy.xpath("//li[@id='option-73-0']//span[text()='loop1 input2']").should('be.visible');
            cy.xpath("//li[@id='option-73-1']//span[text()='loop2 input2']").should('be.visible');
            cy.xpath("//li[@id='option-73-2']//span[text()='loop3 input2']").should('be.visible');
            cy.xpath("//li[@id='option-73-3']//span[text()='loop4 input2']").should('be.visible');
            cy.xpath("//li[@id='option-73-3']//span[text()='loop4 input2']").click();
            cy.xpath('(//div[@class="multiselect__select"])[19]').click();
            cy.xpath('//li[@id="option-74-0"]//span[text()="2022-07-13"]').should('be.visible');
            cy.xpath('//li[@id="option-74-1"]//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li[@id="option-74-2"]//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li[@id="option-74-3"]//span[text()="2022-07-01"]').should('be.visible');
            cy.xpath('//li[@id="option-74-3"]//span[text()="2022-07-01"]').click();
            cy.xpath('(//div[@class="multiselect__select"])[20]').click();
            cy.xpath('//li[@id="option-75-0"]//span[contains(text(),"2022-07-14T")]').should('be.visible');
            cy.xpath("//li[@id='option-75-1']//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li[@id='option-75-2']//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li[@id='option-75-3']//span[contains(text(),'2022-07-13T')]").should('be.visible');
            cy.xpath("//li[@id='option-75-3']//span[contains(text(),'2022-07-13T')]").click();
            cy.xpath("//button[text()[normalize-space()='New Submit']]").click();
            request.verifyRequestisCompleted(requestId);
        })
    }
}
