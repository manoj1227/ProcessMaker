import selectors from "../selectors/saveSearch"
export class SaveSearchs {
    clickOnProcessesName(namesave) {
        //select one process
        cy.get('div[class="multiselect__select"]').first().click()
        cy.get('#option-0-3 > .multiselect__option > span').should("be.visible").click()
        cy.get('.btn-search-run > .fas').click();
        //create save search
        cy.get('.search-bar-additions > :nth-child(1) > div > .btn').click();
        cy.get('[name="title"]').click().type(namesave).should('have.value', namesave);
        cy.wait(2000);
        cy.get('#save-search-modal___BV_modal_footer_ > .btn-secondary').click();
    }
    //search view save search
    viewSaveSearch(namesave) {
        cy.xpath("//input[@type='text'][@placeholder='Search']").should('be.visible');
        cy.xpath("//input[@type='text'][@placeholder='Search']").first().click().type(namesave).should("have.value",namesave);
        cy.get(selectors.viewsearch).first().click();
    }
    //send report
    sendReportSaveSearch(email,subject,body) {
        cy.wait(3000);
        cy.get(selectors.sendreport).click();
        cy.get(selectors.sendto).type(email).should("have.value",email);
        cy.get(selectors.emailsubject).type(subject).should("have.value",subject);
        cy.get(selectors.emailbody).type(body).should("have.value",body);
        cy.get(selectors.send).click();
        cy.wait(3000);
    }
    //scheduled reports
    scheduledReports(email,subject,body) {
        cy.get(selectors.scheduled).click();
        cy.wait(2000);
        cy.get(selectors.addscheduled).click();
        cy.get(selectors.selectday).click();
        cy.get(selectors.selecttime).first().click();
        cy.get(selectors.selecthour).first().click();
        cy.get(selectors.closehour).first().click();
        cy.wait(2000);
        cy.get(selectors.addscheduled).click();
        cy.get('[class="bv-no-focus-ring col-form-label pt-0"]').should("be.visible");
        cy.get(selectors.sendto2).eq(1).type(email).should("have.value",email);
        cy.get(selectors.subject).eq(2).type(subject).should("have.value",subject);
        cy.get(selectors.body).eq(3).type(body).should("have.value",body);
        cy.wait(5000);
        cy.get(selectors.saveschedule).should("be.visible").click();
        //back to the save search
        cy.get('.breadcrumb > :nth-child(3) > a').click();
        cy.wait(2000);
        cy.get(':nth-child(3) > .btn').click();
    }
    //Configurations
    configurationsSaveSearch() {
        cy.wait(2000);
        cy.xpath(selectors.configure).click().should("be.visible");
        cy.wait(2000);
        cy.get(selectors.sharedwithgroups).click().should("be.visible");
        cy.get(selectors.saveconfiguration).click();
    }

   /*
    This method creates a Save Search from Request > Save Search
     * @param name: Assign a name for the Save Search
     * @param iconName: the correct name must be assigned. E.g. iconName: clipboard because the class="fas fa-fw fa-clipboard"
     * @param userName: this field searches by username
     * @param groupName: group name
     * @param completeUserName: this name is needed because the user will be selected in the User list 
     * @return: nothing value
    */
    createSaveSearch(name,iconName, userName="", groupName="", completeUserName=""){
        cy.get('button[title="Save Search"]').should('be.visible');
        cy.get('button[title="Save Search"]').click();
        cy.xpath('//div[@class="modal-content"]//label[text()="Name"]//following-sibling::input').type(name)
        cy.xpath('//div[@class="modal-content"]//label[text()="Icon"]//following-sibling::div//div[@class="multiselect__select"]').click();
        cy.xpath('//div[@class="modal-content"]//label[text()="Icon"]//following-sibling::div/div/div/div[@class="multiselect__content-wrapper"]/ul/li/span/div/i[@class="fas fa-fw fa-'+iconName+'"]').click();
        cy.xpath('//div[@class="modal-content"]//label[text()="Icon"]//following-sibling::div//div[@class="multiselect__tags"]//span/i').should('have.class','fas fa-fw fa-'+iconName);
        if(userName != ""){
            cy.xpath('//div[@class="modal-content"]//label[text()="Share With Users"]//following-sibling::div/div/input').type(userName,{force:true});
            cy.xpath('//div[@class="modal-content"]//label[text()="Share With Users"]//following-sibling::div/div[@class="multiselect__content-wrapper"]/ul/li/span/span').should('have.text',completeUserName);
            cy.xpath('//div[@class="modal-content"]//label[text()="Share With Users"]//following-sibling::div/div[@class="multiselect__content-wrapper"]/ul/li/span/span').click();
        }
        if(groupName != ""){
            cy.xpath('//div[@class="modal-content"]//label[text()="Share With Groups"]//following-sibling::div/div/input').type(groupName,{force:true});
            cy.xpath('//div[@class="modal-content"]//label[text()="Share With Groups"]//following-sibling::div/div[@class="multiselect__content-wrapper"]/ul/li/span/span').should('have.text',groupName);
            cy.xpath('//div[@class="modal-content"]//label[text()="Share With Groups"]//following-sibling::div/div[@class="multiselect__content-wrapper"]/ul/li/span/span').click();
        }
        cy.xpath('//footer[@id="save-search-modal___BV_modal_footer_"]/button[text()="Save"]').click();
    }
}