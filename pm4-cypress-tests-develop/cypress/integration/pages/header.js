import selectors from "../selectors/header";
import promisify from 'cypress-promise'
export class Header {

    clickOnAddRequest() {
        cy.get(selectors.addRequestBtn).click();
        cy.xpath(selectors.loadingProcesses).should('not.exist');
        cy.wait(2000);
    }

    searchWithProcessName(processName) {
        cy.get(selectors.searchWithProceesNameTxtBx).type(processName).should('have.value', processName);
    }

    clickOnStart(processName) {
        cy.wait(2000);
        cy.xpath(selectors.startBtnBasedOnProcessName.replace('processName', processName)).click();
        cy.title().should('eq', 'Request Detail - ProcessMaker');
        // const requestId = await promisify(cy.url().then(url => {
        //     return url.split('/')[4].trim();
        // }))
        //cy.wait(2000);
        //return requestId;
    }

    logout() {
        cy.get(selectors.usercIconBtn).should('be.visible').click({ force: true });
        cy.xpath(selectors.logOutBtn).click();
        cy.get(selectors.userNameTxtBxL).should('be.visible');
    }

    async getRequestID() {
        const requestId = await promisify(cy.url().then(url => {
            return url.split('/')[4].trim();
        }))
        return requestId;
    }

    choseLanguage(language) {
        cy.get('#language').select(language).should('have.value', language);
        cy.get('.btn.btn-secondary.ml-3').click();
        cy.reload();
    }
    viewNotifications(){
        cy.wait(5000);
        cy.get(selectors.notification).click();
        cy.get(selectors.notificationList).should("be.visible");
    }
    openLastNotification(){
        cy.xpath(selectors.lastNotification).should("be.visible");
        cy.xpath(selectors.labelLastNotification).click({ force: true });
    }
}