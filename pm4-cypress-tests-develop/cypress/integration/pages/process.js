import selectors from "../selectors/process"
import pageConstants from "../helpers/pageConstants";
import promisify from 'cypress-promise'
import { NavigationHelper } from "../helpers/navigationHelper";
import { isThisWeek } from "date-fns";
import '../../support/commands';
export class Process {

    getId(eventName) {
        cy.wait(1000);
        var locator;
        switch (eventName) {
            case 'start':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.start_event);
                break;
            case 'pdf generator':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.pdf_generator_event);
                break;
            case 'task':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.task_event);
                break;
            case 'end':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.end_event);
                break;
            case 'data connector':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.data_connector_event);
                break;
            case 'Gateway':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.gateway_event);
                break;
            case 'Intermediate Event':
                locator = selectors.recentlyDropedEvent.replace('eventName', pageConstants.processDropedElements.intermediate_event);
                break;
        }
        // const id = await promisify(cy.get(locator).then($elems => {
        const id = cy.get(locator).then($elems => {
            var index = 0;
            var max_id = 0;
            for (let i = 0; i < $elems.length; i++) {
                let id = $elems[i].id;
                let ids = id.split('_');
                if ((parseInt(ids[1]) % 2) == 1) {
                    if (max_id < parseInt(ids[1])) {
                        max_id = parseInt(ids[1]);
                        index = i;
                    }
                }
            }
            return $elems[index].id;
        });

        return id;
    }

    async getRecentElementId() {
        return await promisify(cy
            .get('[title="Start Event"]')
            .then($el => $el.text())
        )
    }

    dragEvent(type, offsetX, offsetY) {
        switch (type) {
            case 'start':
                this.dragStartEvent(selectors.prrocessEvent.replace('eventName', pageConstants.process.start_event), offsetX, offsetY);
                break;
            case 'pool':
                this.dragEventByOffSet(selectors.prrocessEvent.replace('eventName', pageConstants.process.pool_event), offsetX, offsetY);
                // cy.xpath('(//*[@button-id="bottom-right-resize-button"])[1]').trigger('mousedown', 'bottomRight',{force: true});
                break;
            case 'task':
                this.dragEventByOffSet(selectors.prrocessEvent.replace('eventName', pageConstants.process.task_event), offsetX, offsetY);
                break;
            case 'pdf generator':
                this.dragPdfGeneratorEvent(selectors.prrocessEvent.replace('eventName', pageConstants.process.pdf_generator_event), offsetX, offsetY);
                break;
            case 'end':
                this.dragEndEvent(selectors.prrocessEvent.replace('eventName', pageConstants.process.end_event), offsetX, offsetY);
                break;
            case 'Data Connector':
                this.dragdataConnectorEvent(selectors.prrocessEvent.replace('eventName', pageConstants.process.data_connector_event), offsetX, offsetY);
                break;
            case 'Gateway':
                this.draggatewayEvent(selectors.prrocessEvent.replace('eventName', pageConstants.process.gateway_event), offsetX, offsetY);
                break;
            case 'Intermediate Event':
                this.dragintermediateEvent(selectors.prrocessEvent.replace('eventName', pageConstants.process.intermediate_event), offsetX, offsetY);
                break;

        }
    }

    dragStartEvent(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            })
        cy.xpath("(//span[text()='Start Event'])[2]")
            .trigger('mouseup');
    }

    dragEndEvent(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            })
        cy.xpath("(//span[text()='End Event'])[2]")
            .trigger('mouseup');
    }

    dragPdfGeneratorEvent(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            })
        cy.xpath("(//span[text()='PDF Generator'])[2]")
            .trigger('mouseup');
    }

    dragdataConnectorEvent(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            })
        cy.xpath("(//span[text()='Data Connector'])[2]")
            .trigger('mouseup');
    }

    draggatewayEvent(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            })
        cy.xpath("(//span[text()='Gateway'])[2]")
            .trigger('mouseup');
    }

    dragintermediateEvent(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY,
                force: true
            })
        cy.xpath("(//span[text()='Intermediate Event'])[2]")
            .trigger('mouseup');
    }

    dragEventByOffSet(selector, offsetX, offsetY) {
        cy.xpath(selector.replace('index', 1)).trigger('mousedown')
            .trigger('mousemove', {
                pageX: offsetX,
                pageY: offsetY
            })
        cy.xpath(selector.replace('index', 2))
            .trigger('mouseup', {
                pageX: offsetX,
                pageY: offsetY
            });
    }

    clickOnZoomOut() {
        cy.get(selectors.zoomOutBtn).click();
    }

    connectToEvents(event1Locator, event2Locator) {
        cy.get('#' + event1Locator).click();
        cy.get('#generic-flow-button').click();
        cy.get('#' + event2Locator).click();
    }

    clickOnSave() {
        cy.get(selectors.saveBtn).click();
    }

    saveTheProcess(name) {
        this.clickOnSave();
        cy.xpath(selectors.saveBtnInPopUp).click();
        cy.xpath(selectors.saveChangesModal).should('not.exist');
        cy.get(selectors.clickonProcess).click();
        cy.get(selectors.ProcessPgVerify).should('be.visible');
        cy.get(selectors.processIndex).should('be.not.visible');
        cy.get(selectors.activeIcon).should('be.visible');
        cy.xpath(selectors.ProcessSearchBx).type(name);
        cy.xpath(selectors.clickOnSearchBtn).click();
        cy.xpath(selectors.processNameVerify.replace('name', name)).should('be.visible');
        cy.xpath(selectors.clickOnSetting.replace('processName', name)).should('be.visible').click();
        cy.get(selectors.configurationTab).should('be.visible');
        //cy.wait(2000);
        cy.xpath(selectors.clickOnPrcsMngrOpt).click();
        cy.xpath(selectors.clickonPrcsMngrInpt).type("Admin");
        //cy.wait(2000);
        cy.xpath(selectors.selectAdminOption).should('be.visible').click();
        cy.xpath(selectors.saveProcessMngr).click();
        /*cy.xpath(selectors.sucessToast).should('be.visible');
        cy.xpath(selectors.sucessToast).should('not.exist');*/
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
        //cy.wait(4000);
    }

    createProcess(name, description) {
        this.clickOnAddProcess();
        this.enterProcessName(name);
        this.enterProcessDescription(description);
        cy.xpath("//div[@name='category']//span[text()='Uncategorized']").should('be.visible');
        this.clickOnSaveInAddProcessModal();
        cy.get('[title="Start Event"]').should('be.visible');
    }

    searchForProcess(processName) {
        /*cy.wait(5000);
        cy.get(selectors.searchInputBox).type(processName).should('have.value', processName);
        cy.wait(3000);
        cy.get("[title='Edit'] > .fas").first().click();*/
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get(selectors.searchInputBox).type(processName).should('have.value', processName);
        cy.get(selectors.loadingSpinnerProcess).should('be.visible');
        cy.get(editBtn).first().click();
    }

    clickOnSaveInAddProcessModal() {
        cy.xpath(selectors.saveBtnInPopUp).click();
    }

    clickOnAddProcess() {
        cy.get(selectors.addProcessBtn).click();
    }

    enterProcessName(name) {
        cy.get(selectors.nameTxtBx).type(name).should('have.value', name);
    }

    enterProcessDescription(description) {
        cy.get(selectors.descriptionTxtBx).type(description).should('have.value', description);
    }

    addScreenToFormTask(eventLocator, screenName) {
        //cy.wait(2000);
        cy.get('#' + eventLocator).click();
        //cy.wait(1000);
        cy.xpath(selectors.screenForInputDropdown).should('be.visible');
        cy.xpath(selectors.screenForInputDropdown).click();
        cy.get(selectors.screenInputTxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click({ force: true });
        // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }

    addDisplayScreenToPDFGenrator(eventLocator, screenName) {
        cy.get('#' + eventLocator).click();
        //cy.wait(2000);
        cy.xpath(selectors.screenForDisplayDropdown).should('be.visible');
        cy.xpath(selectors.screenForDisplayDropdown).click();
        cy.get(selectors.screenInputTxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click();
        // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }

    addDisplayScreenToManualTask(eventLocator, screenName) {
        cy.get('#' + eventLocator).click();
        cy.wait(2000);
        cy.xpath(selectors.screenForManualTask).click();
        cy.get(selectors.screenInputTxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click();
        // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }

    clickOnLoopActivity() {
        cy.get(selectors.expandLoopActivityBtn).click();
    }

    selectLoopMode(loopMode) {
        cy.xpath(selectors.loopModeDropdown).select(loopMode);
    }

    enterRequestVarArrayName(selectListName) {
        cy.xpath(selectors.requestVarArrayTxtBx).type(selectListName).should('have.value', selectListName);
    }

    enterLoopIterations(selectListName) {
        cy.xpath(selectors.iterationTextBox).type(selectListName).should('have.value', selectListName);
    }

    enterExitCondition(exitConditionName) {
        cy.xpath(selectors.conditionTextBox).type(exitConditionName).should('have.value', exitConditionName);
    }

    addLoopActivity(loopMode, selectListName, exitConditionName) {
        this.clickOnLoopActivity();
        this.selectLoopMode(loopMode);
        switch (loopMode) {
            case 'Multi-Instance (Sequential)':
                this.enterRequestVarArrayName(selectListName);
                break;
            case 'Loop':
                this.enterLoopIterations(selectListName);
                this.enterExitCondition(exitConditionName);
                break;
            case 'Multi-Instance (Parallel)':
                this.enterRequestVarArrayName(selectListName);
                break;
        }
    }


    changeToManualTask() {
        cy.get(selectors.addManualTask).click();
    }


    changetoscripttask() {
        cy.get(selectors.scripttaskBtn).click();
    }


    addScreenToscriptTask(eventLocator, screenName) {
        cy.get('#' + eventLocator).click();
        cy.wait(2000);
        cy.get(selectors.screenForScriptDropdown).click();
        cy.get(selectors.screenInputTxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click();
        // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }

    addUserToProcessManager(processName) {
        cy.xpath('(//button[@title="Edit"])[1]').should('be.visible');
        cy.xpath(selectors.searchInputProcess).type(processName).should('have.value', processName);
        cy.xpath(selectors.searchBox).click();
        cy.wait(2000);
        cy.xpath(selectors.processNameInputTxt.replace('processName', processName)).should('be.visible');
        cy.xpath(selectors.configureBtn).click();
        cy.wait(2000);
        cy.xpath(selectors.processManagerDropdown).click();
        cy.xpath(selectors.processInputTxt).type("admin");
        cy.xpath(selectors.processManagerDropdownOption).click();
        cy.xpath(selectors.processManagerEditSaveBtn).click();
        // cy.wait(12000);
        //cy.xpath("//span[text()='Designer']").click();
    }

    selectdataconnector(eventLocator, screenName, listName) {
        cy.get('#' + eventLocator).click();
        //cy.wait(2000);
        cy.xpath(selectors.dataConnectorDropdown).click();
        cy.get(selectors.dataConnectorInputtxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click();
        cy.xpath(selectors.dataconnectorListDropdown).click();
        cy.get(selectors.dataConnectorListInputtxtBx).type(listName).should('have.value', listName);
        cy.xpath(selectors.listInputoption.replace('listName', listName)).click({ multiple: true });
        //cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }
    changetaskname(rename) {
        cy.get(selectors.nameInput).clear();
        cy.get(selectors.nameInput).type(rename).should('have.value', rename);
    }

    changeToeventBasedGateway() {
        cy.get(selectors.eventBasedGatewayBtn).click();
    }

    changeTointermediateSignalCatchEvent() {
        cy.get(selectors.intermediateSignalCatchEvent).click();
    }

    addsignal(eventLocator, signalName) {
        cy.get('#' + eventLocator).click();
        cy.wait(2000);
        cy.xpath(selectors.signalForInputDropdown).click();
        cy.get(selectors.signalInputTxtBx).type(signalName).should('have.value', signalName);
        cy.xpath(selectors.signalDropdownOption.replace('signalName', signalName)).first().click();
        // cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
    }

    addassignmentRules(eventLocator, userName) {
        cy.get('#' + eventLocator).click();
        cy.wait(2000);
        cy.xpath(selectors.configDropDown).click();
        cy.xpath(selectors.assignRules).click();
        cy.get(selectors.userDropDown).select("user_group");
        cy.xpath(selectors.assignedUsersOption).click();
        cy.xpath(selectors.usertxtInput).type(userName).should('have.value', userName);
        cy.xpath(selectors.useroption.replace('userName', userName)).click({ multiple: true, force: true });
    }
    addResponseMapping(source, requestVariable) {
        cy.xpath(selectors.responseMappingbtn).click();
        cy.get(selectors.responseMappingSrcInput).type(source).should('have.value', source);
        cy.get(selectors.responseMappingVarInput).type(requestVariable).should('have.value', requestVariable);
        cy.get(selectors.resMappingSaveBtn).click();
        cy.xpath(selectors.resMappingEditOption).should('be.visible');
    }
    changeToterminateEndEvent() {
        cy.get(selectors.terminateEndEventBtn).click();
    }
    changepdfFileName(pdffilename) {
        cy.get(selectors.pdfFileNameInput).clear();
        cy.get(selectors.pdfFileNameInput).type(pdffilename).should('have.value', pdffilename);
    }

    /**
     * This method is responsible to import and config a process if this is not exists
     * @param processName: Name of the process
     * @param filePath: Path of the process
     * @param parametersMapList: object list with config to process
     * Ej. var
     * let parameterList = [
     *      **To Start Event 1
     *      {elemName: "Start Event", label:"startEvent1",user:"admin",firstName:"Admin", lastName:"User"},
     *      **To Start Status
     *      {elemName: "Status", label:"Status",state:"INACTIVE"},
     *   ];
     * @return nothing returns
     */
    verifyPresenceOfProcessAndImportProcess(processName, filePath, parametersMapList = []) {
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get(selectors.searchInputBox).type(processName).should('have.value', processName);
        cy.get(selectors.loadingSpinnerProcess).should('be.visible');
        cy.get(selectors.loadingSpinnerProcess).should('not.be.visible');

        cy.xpath(selectors.processTable, { timeout: 10000 })
            .find('td')
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    this.importProcess(filePath);
                    if (parametersMapList.length > 0)
                        this.configProcessImported(parametersMapList);
                }
                else return;
            });
    }
    importProcess(filePath) {
        cy.get(selectors.importProcessBtn).click();
        cy.get(selectors.importBtn).should('be.visible');
        cy.get(selectors.inputToFileUpload).attachFile(filePath);
        cy.get(selectors.importBtn).click();
        cy.get(selectors.loadingProcessSpinner).should('not.exist');
    }

    clickOnImportButton() {
        cy.get(selectors.importProcessBtn).click();
        cy.get(selectors.browseBtn).should('be.visible');
    }

    goToWebEntry() {
        cy.get('[data-type="processmaker.components.nodes.startEvent.Shape"]').first().click({ force: true });
        this.clickOnWeTabSettign();
        this.openWe();
    }

    clickOnWeTabSettign() {
        cy.get(selectors.webEntryTab).click();
    }

    openWe() {
        cy.get(selectors.webEntryUrl).invoke('val')
            .then(val => {
                const url = val;
                cy.visit('/logout');
                cy.title().should('eq', 'Login - ProcessMaker');
                cy.visit(url);
            });
    }


    addassignmentRulesAsSelfService(eventLocator) {
        cy.get('#' + eventLocator).click();
        cy.wait(2000);
        cy.xpath(selectors.configDropDown).click();
        cy.xpath(selectors.assignRules).click();
        cy.get(selectors.userDropDown).select("self_service");
    }

    changeTosignalStartEvent() {
        cy.get(selectors.signalStartEventBtn).click();
    }

    addassignmentRulesAsByUserID(eventLocator, variableName) {
        cy.get('#' + eventLocator).click();
        cy.wait(2000);
        cy.xpath(selectors.configDropDown).click();
        cy.xpath(selectors.assignRules).click();
        cy.get(selectors.userDropDown).select("user_by_id");
        cy.xpath(selectors.variableNameTxtBx).type(variableName).should('have.value', variableName);
    }


    async getRecentIdOfLink() {
        cy.wait(2000);
        var locator = '//*[@data-type="standard.Link"]';
        const id = await promisify(cy.xpath(locator).then($elems => {
            var index = 0;
            var max_id = 0;
            for (let i = 0; i < $elems.length; i++) {
                let id = $elems[i].id;
                let ids = id.split('_');
                if ((parseInt(ids[1]) % 2) == 1) {
                    if (max_id < parseInt(ids[1])) {
                        max_id = parseInt(ids[1]);
                        index = i;
                    }
                }
            }
            return $elems[index].id;
        }));

        return id;
    }


    addlineExpression(name, expression) {
        const line_Id = this.getRecentIdOfLink();
        cy.get('#' + line_Id);
        cy.get('[name="name"]').type(name).should('have.value', name);
        cy.get('[name="conditionExpression"]').type(expression).should('have.value', expression);
    }

    changeToInclusiveGateway() {
        cy.get(selectors.inclusiveGatewayBtn).click();

    }

    changeToParallelGateway() {
        cy.get(selectors.parallelGatewayBtn).click();
    }

    configureTimingControlOption(type, timeinterval) {
        cy.get(selectors.configTimeBtn).click();
        cy.get(selectors.typeTimeControlDrpDwn).select(type);
        cy.get(selectors.timeIntervalBtn).clear();
        cy.get(selectors.timeIntervalBtn).type(timeinterval).should('have.value', timeinterval);
        cy.xpath(selectors.timeIntervalDrpDwn).select("minute");

    }

    clickOnWebEntry() {
        cy.get(selectors.webEntryDrpDwn).click();
    }

    SetWebEntryDetailsForAStartEventWithoutEnablePassword(formScreen, displayScreen) {
        this.clickOnWebEntry();
        cy.get(selectors.webEntrySelectListBtn).select("ANONYMOUS");
        this.addScreenToScreenAssociatedFieldInWebEntry(formScreen);
        cy.xpath(selectors.completeActionSelectList).select("SCREEN");
        this.addScreenToCompletedActionFieldInWebEntry(displayScreen);
    }

    addScreenToScreenAssociatedFieldInWebEntry(screenName) {
        cy.xpath(selectors.associatedScreenForInput).click();
        cy.xpath(selectors.associatedScreenInputTxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click({ force: true });
    }

    addScreenToCompletedActionFieldInWebEntry(screenName) {
        cy.xpath(selectors.completedScreenForInput).click();
        cy.xpath(selectors.completedScreenInputTxtBx).type(screenName).should('have.value', screenName);
        cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click({ force: true });
    }
    async getURLOfWebEntry() {
        return (await promisify(cy.get('[id="webentry-entry-url"]')
            .invoke('val').then((val) => {
                const url = val;
                cy.log("URL WE", url).then(() => {
                    return url;
                });
            })));
    }

    async getProcessIDFromURL() {
        const processId = await promisify(cy.url().then(url => {
            return url.split('/')[4].trim();
        }))
        return processId;
    }

    AddABoundaryConditionalEventToTask() {
        cy.get(selectors.boundaryEventBtn).click();
        cy.get(selectors.boundaryCondOptn).click();
    }

    setConditionForBoundaryEvent(condition) {
        cy.get(selectors.conditionInputBx).clear();
        cy.get(selectors.conditionInputBx).type(condition).should('have.value', condition);
    }

    getBoundaryId() {
        //cy.wait(2000);
        var locator = '[data-type="processmaker.components.nodes.boundaryEvent.Shape"]';
        const id = cy.get(locator).then($elems => {
            var index = 0;
            var max_id = 0;
            for (let i = 0; i < $elems.length; i++) {
                let id = $elems[i].id;
                let ids = id.split('_');
                if ((parseInt(ids[1]) % 2) == 1) {
                    if (max_id < parseInt(ids[1])) {
                        max_id = parseInt(ids[1]);
                        index = i;
                    }
                }
            }
            return $elems[index].id;
        });
        return id;
    }

    addOutBoundConfig(type, property, varValue) {
        cy.xpath(selectors.outBoundplusBtn).click();
        cy.xpath(selectors.propertyTypeDrpDwn).click();
        cy.xpath(selectors.propertTypeValueInput.replace('type', type)).click();
        cy.xpath(selectors.propertyDrpDwn).click();
        cy.xpath(selectors.propertValueInput.replace('property', property)).click();
        cy.wait(2000);
        cy.get(selectors.requestVarInputBx).type(varValue);
        cy.get(selectors.outBoundSaveBtn).click();
    }

    verifyTitlePage(title) {
        cy.visit('/processes');
        cy.title().should('eq', title);
    }
    verifySidebarMenuOption(num, option) {
        cy.get('.nav-item.filter-bar.justify-content-between.py-2.sidebar-expansion').click();
        cy.get('.nav-item.filter-bar.justify-content-between').eq(num).should('contain', option);
    }

    saveVersionProcess(version, description) {
        this.clickOnSave();
        cy.xpath("//input[@id='name']").type(version).should('have.value', version);
        cy.xpath("//textarea[@id='additional-details']").type(description).should('have.value', description);
        cy.xpath('//button[text()="Save"]').click();
        cy.xpath('//h5[text()="Commit Changes"]').should('not.exist');
    }
    saveProcessWithoutVersion() {
        this.clickOnSave();
        cy.xpath('//button[text()="Save"]').click();
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
    }

    searchProcessAndSelectOptions(processName, option = "config") {
        var editBtn = "[title='Edit'] > .fas";
        var exportBtn = "[title='Export'] > .fas";

        cy.get(editBtn).should("be.visible");
        cy.get(exportBtn).should("be.visible");

        cy.get(selectors.searchInputBox)
            .type(processName)
            .should("have.value", processName);
        cy.get(selectors.loadingSpinnerProcess).should("be.visible");
        switch (option) {
            case "edit":
                this.editProcess();
                break;
            case "config":
                this.goToConfigProcess();
                break;
            case "export":
                this.downloadProcess(processName);
                break;
            case "delete":
                break;
        }
    }
    editProcess() {
        cy.xpath(selectors.editctrlBtn).click();
    }
    saveProcessWithoutName() {
        cy.get(selectors.saveButton1).should("be.visible").click();
        cy.xpath(selectors.saveBtnToAddProcess).should("be.visible").click();
    }
    saveProcessWithNameAndDescription(version, description) {
        cy.get(selectors.saveButton1).should("be.visible").click();
        cy.get(selectors.nameVersionInput).type(version);
        cy.get(selectors.descriptionVersionInput).type(description);
        cy.xpath(selectors.saveBtnToAddProcess).should("be.visible").click();
    }
    goToConfigProcess() {
        cy.xpath(selectors.configctrlBtn).click();
    }
    versionHistory() {
        cy.get(selectors.versionHistoryTab).should("be.visible").click();
    }
    showVersioningOnly() {
        cy.get(selectors.onlyShowNamedVersion).eq(0).check({ force: true });
        cy.get(selectors.onlyShowVersionLabel).click();
    }

    verifyVersioningWithoutNameNotAppear() {
        cy.get(selectors.container)
            .find(selectors.rowsVersion)
            .its("length")
            .should("be.gte", 2);
    }

    checkSavedAllVersions() {
        cy.get(selectors.container)
            .find(selectors.rowsVersion)
            .its("length")
            .should("be.gte", 3);
    }

    checkCopyToLatest() {
        cy.get(selectors.rowsVersion).last().should("contain", "version1");
        cy.get(selectors.copyToLatests).last().click();
        cy.get(selectors.confirmAndSave).click();
        cy.get(selectors.rowsVersion).first().should("contain", "version1");
    }

    /*
    params
    connector = name of the data connector (unique)
    methodName = name of the data connector's method (unique)
    myTimeW = Time to wait for .type() to resolve before timing out, by default is 10000
    */
    configDataConnector(connectorName, methodName, myTimeW = 10000) {
        //config Data Connector field
        cy.get('div[name="basic_config"] > div > div').eq(0).click();
        cy.get('div[name="basic_config"]').eq(0).find('div[role="combobox"]').should('have.attr', 'aria-expanded', 'true')
        cy.get('div[name="basic_config"] > div > div > div > input').eq(0).type(connectorName, { timeout: myTimeW })
        cy.get('div[name="basic_config"] > div > div > div > input').eq(0).type('{enter}');
        cy.get('div[name="basic_config"]').eq(0).find('div[role="combobox"]').should('have.attr', 'aria-expanded', 'false')
        cy.get('div[name="basic_config"] > div > div > div > span').eq(0).should('contain.text', connectorName)

        //Config a resource
        cy.get('div[name="basic_config"] > div > div').eq(1).click();
        cy.get('div[role="combobox"]').eq(1).should('have.attr', 'aria-expanded', 'true')
        cy.get('div[name="basic_config"] > div > div > div > input').eq(1).type(methodName, { timeout: myTimeW })
        cy.get('div[name="basic_config"] > div > div > div > input').eq(1).type('{enter}');
        cy.get('div[role="combobox"]').eq(1).should('have.attr', 'aria-expanded', 'false')
        cy.get('div[name="basic_config"] > div > div > div > span').eq(1).should('contain.text', methodName);
    }

    /**
     * This method is responsible configuration of the process imported
     * @param parametersMapList: object list of option + users
     * Ej. var parameterList = [ {elemName: "Start Event", label:"startEvent1",user:"admin",firstName:"Admin", lastName:"User"},
     *                           {elemName: "Status", label:"Status",state:"INACTIVE"}
     *                         ];
     * @return nothing returns
     */
    configProcessImported(parametersMapList) {
        let len = parametersMapList.length;
        for (var i = 0; i < len; i++) {
            let key = parametersMapList[i].label;
            if (key !== "Status") {
                let value = parametersMapList[i].user;
                let firstName = parametersMapList[i].firstName;
                let lastName = parametersMapList[i].lastName;
                let elemName = parametersMapList[i].elemName;
                this.configRowProcess(key, value, firstName, lastName, elemName);
            } else {
                let state = parametersMapList[i].state;
                this.configRowSatusProcess(key, state);
            }
        }
        this.saveChangesConfigProcess();
    }

    /**
     * This method is responsible for set values in a row of process imported config
     * @param key: label of the option
     * @param value: user of user
     * @param firstName: firstName of the user
     * @param lastName: lastName of the user
     * @param elemName: name of the element to assignation like: "Start Event, Script"
     * @return nothing returns
     */
    configRowProcess(key, value, firstName, lastName, elemName) {
        let selectListScriptXpath;
        let inputScriptXpath;
        let fullName;
        switch (elemName) {
            case 'Script':
            case 'Process Manager':
                fullName = firstName + ' ' + lastName + '. ';
                selectListScriptXpath = "//strong[contains(text(),'labelName')]/ancestor::tr/td[2]//div[@class='multiselect__tags']";
                inputScriptXpath = "//strong[contains(text(),'labelName')]/ancestor::tr/td[2]//input";
                cy.xpath(selectListScriptXpath.replace('labelName', key)).should('be.visible').click();
                cy.xpath(inputScriptXpath.replace('labelName', key)).type(value).should('have.value', value);
                cy.xpath("//ancestor::strong[contains(text(),'scriptName')]/ancestor::tr/td[2]//div[@class='multiselect__content-wrapper']//li[1]"
                    .replace('scriptName', key))
                    .should('have.attr', 'aria-label')
                    .and('equal', fullName);
                cy.xpath(inputScriptXpath.replace('labelName', key)).type('{enter}');
                break;
            case 'SubProcess':
                fullName = firstName;
                selectListScriptXpath = "//strong[contains(text(),'labelName')]/ancestor::tr/td[2]//div[@class='multiselect__tags']";
                inputScriptXpath = "//strong[contains(text(),'labelName')]/ancestor::tr/td[2]//input";
                cy.xpath(selectListScriptXpath.replace('labelName', key)).should('be.visible').click();
                cy.xpath(inputScriptXpath.replace('labelName', key)).type(value).should('have.value', value);
                cy.xpath("//ancestor::strong[contains(text(),'scriptName')]/ancestor::tr/td[2]//div[@class='multiselect__content-wrapper']//li[1]"
                    .replace('scriptName', key))
                    .should('have.attr', 'aria-label')
                    .and('contain', fullName);
                cy.xpath(inputScriptXpath.replace('labelName', key)).type('{enter}');
                break;
            default:
                fullName = firstName + ' ' + lastName + '. ';
                let selectListXpath = "//strong[text()='labelName']/ancestor::tr/td[2]//div[@class='multiselect__tags']";
                let inputXpath = "//strong[text()='labelName']/ancestor::tr/td[2]//input";
                let liXpath = "//strong[text()='labelName']/ancestor::tr//div[@class='multiselect__content-wrapper']//li[@aria-label='fullName']";

                cy.xpath(selectListXpath.replace('labelName', key)).should('be.visible').click();
                cy.xpath(inputXpath.replace('labelName', key)).type(value).should('have.value', value);
                var li;
                if (elemName === 'Cancel Request')
                    li = "//ancestor::strong[text()='labelName']/ancestor::tr/td[2]//div[@class='multiselect__content-wrapper']//li[3]";
                else
                    li = "//ancestor::strong[text()='labelName']/ancestor::tr/td[2]//div[@class='multiselect__content-wrapper']//li[2]";

                cy.xpath(li
                    .replace('labelName', key))
                    .should('have.attr', 'aria-label')
                    .and('equal', fullName);
                cy.xpath(inputXpath.replace('labelName', key)).type('{enter}');
        }
    }

    /**
     * This method is responsible for set values in a row of process imported config
     * @param key: label of the option
     * @param state: state of the status "ACTIVE/INACTIVE"
     * @return nothing returns
     */
    configRowSatusProcess(key, state) {
        const selectListXpath = "//strong[text()='labelName']/ancestor::tr/td[2]//div[@class='multiselect__tags']";
        const liXpath = "//strong[text()='Status']/ancestor::tr//div[@class='multiselect__content-wrapper']//li[@aria-label='state. ']"


        cy.xpath(selectListXpath.replace('labelName', key)).should('be.visible').click();
        cy.xpath(liXpath.replace('labelName', key).replace('state', state)).should('be.visible').click();

    }

    /**
     * This method is responsible to save process configruation of process imported
     * @return nothing returns
     */
    saveChangesConfigProcess() {
        const saveBtnConfig = "//button[contains(text(),'Save')]";
        cy.xpath(saveBtnConfig).click();

    }

    /**
     * This method is responsible configuration of the process in modeler with data connector
     * @param elementName: name of data connector in the modeler. Ej: connector1
     * @param dataConnectorName: name of data connector in Data Connectors. Ej: Doctor Collection
     * @param resource: method of data connector: Ej: GET: ListAll
     * @return nothing returns
     */
    verifyConfigOfDataConnectorAndConfig(elementName, dataConnectorName, resource) {
        const elementTaskXapth = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        const dataConnectorSelected = "//label[text()='Select a Data Connector']/parent::div//div[@class='multiselect__tags']//span";
        const resourceSelected = "//label[text()='Select a Resource']/parent::div//div[@class='multiselect__tags']//span";

        cy.xpath(elementTaskXapth.replace('nameElem', elementName)).first().should('be.visible').click();
        cy.wait(2000);
        cy.xpath(dataConnectorSelected).invoke('text')
            .then(text => {
                if (text !== dataConnectorName) {
                    // Set data connector
                    cy.xpath('//label[text()="Select a Data Connector"]/parent::div//div[@class="multiselect__tags"]').click();
                    cy.xpath('//label[text()="Select a Data Connector"]/parent::div//input').type(dataConnectorName).should('have.value', dataConnectorName);
                    cy.xpath('//label[text()="Select a Data Connector"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
                        .should('have.attr', 'aria-label') // yields the "href" attribute
                        .and('equal', dataConnectorName + ". ");
                    cy.xpath('//label[text()="Select a Data Connector"]/parent::div//input').type('{enter}');
                }
            });
        cy.xpath(resourceSelected).invoke('text')
            .then(text => {
                if (text !== resource) {
                    // Set data connector
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//div[@class="multiselect__tags"]').click();
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//input').type(resource).should('have.value', resource);
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
                        .should('have.attr', 'aria-label') // yields the "href" attribute
                        .and('equal', resource + ". ");
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//input').type('{enter}');
                }
            });

    }

    /**
     * This method is responsible configuration of the process in modeler with start event
     * @param elementName: name of sart event in the modeler. Ej: startEvent1
     * @param permissionObject: name of data connector in Data Connectors. Ej: Doctor Collection
     * @return nothing returns
     */
    // to users: permissionObject = {type="User", user="admin", firstName="Admin", lastName="User"}
    // to group: permissionObject = {type="Group", groupName="group 1"}
    // to process manager: permissionObject = {type="Process Manager"}
    verifyConfigOfStartEventAndConfig(elementName, permissionObject) {
        const elementStartEventXpath = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.startEvent.Shape']";
        const startPemrissionsBtnSelector = "[id='accordion-button-permissions-accordion']";
        const startPemrissions_typeSelector = "[id='select_type']";
        const startPemrissions_opSelectListSelector = "//label[text()='nameType']/parent::div//div[@class='multiselect__tags']";
        const startPemrissions_opInputSelector = "//label[text()='nameType']/parent::div//input";
        const OptionSelected = "//label[text()='nameType']/parent::div//div[@class='multiselect__tags']//span";


        cy.xpath(elementStartEventXpath.replace('nameElem', elementName)).first().should('be.visible').click();
        cy.wait(2000);
        cy.get(startPemrissionsBtnSelector).click();
        cy.get(startPemrissions_typeSelector).should('be.visible');

        let type = permissionObject.type;
        switch (type) {
            case 'User':
                let userName = permissionObject.user;
                let firstName = permissionObject.firstName;
                let lastName = permissionObject.lastName;
                let fullName = firstName + ' ' + lastName;
                let liuser = "//li[@aria-label='" + fullName + ". ']";

                cy.get(startPemrissions_typeSelector).select('User').should('have.value', 'user');
                // Verify if the start event was configured with the correct user
                cy.xpath(OptionSelected.replace('nameType', 'user')).should('be.visible');
                cy.xpath(OptionSelected.replace('nameType', 'user')).invoke('text')
                    .then(text => {
                        if (text !== fullName) {
                            cy.xpath(startPemrissions_opSelectListSelector.replace('nameType', 'user')).click();
                            cy.xpath(startPemrissions_opInputSelector.replace('nameType', 'user')).type(userName).should('have.value', userName);
                            cy.xpath('//div[@class="multiselect__content-wrapper"]//li[1]')
                                .should('have.attr', 'aria-label') // yields the "href" attribute
                                .and('equal', fullName + ". ");
                            cy.xpath(startPemrissions_opInputSelector.replace('nameType', 'user')).type('{enter}');

                        }
                    });
                break;
            case 'Group':
                let groupName = permissionObject.groupName;
                let ligroup = "//li[@aria-label='" + groupName + ". ']";
                cy.get(startPemrissions_typeSelector).select('Group').should('have.value', 'group');
                // Verify if the start event was configured with the correct group
                cy.xpath(OptionSelected.replace('nameType', 'group')).should('be.visible');
                cy.xpath(OptionSelected.replace('nameType', 'group')).invoke('text')
                    .then(text => {
                        if (text !== groupName) {
                            cy.xpath(startPemrissions_opSelectListSelector.replace('nameType', 'group')).click();
                            cy.xpath(startPemrissions_opInputSelector.replace('nameType', 'group')).type(groupName + " ")
                            cy.xpath('//div[@class="multiselect__content-wrapper"]//li[1]')
                                .should('have.attr', 'aria-label') // yields the "href" attribute
                                .and('equal', groupName + ". ");
                            cy.xpath(ligroup).click();
                        }
                    });
                break;
            case 'Process Manager':
                cy.get(startPemrissions_typeSelector).select('Process Manager').should('have.value', 'process_manager');
                break;
        }

    }

    changepdfFileNameToDynamicVariable(input) {
        cy.get(selectors.pdfFileNameInput).clear();
        cy.get(selectors.pdfFileNameInput).type("{{}{{}" + input + "}}").should('have.value', "{{" + input + "}}");
    }

    changeToSignalEndEvent() {
        cy.xpath(selectors.signalEndevent).click();
        cy.xpath(selectors.signalpayloadBtn).click();
        cy.xpath(selectors.clickOnAllRequestBtn).click();
    }

    addSignalToStartEventOrEndEvent(name) {
        cy.xpath(selectors.clickonSignalOption).click();
        cy.wait(3000);
        cy.xpath(selectors.signalInputTxtBtn).type(name);
        cy.wait(7000);
        cy.xpath(selectors.signalDrpDownOption.replace('signalName', name)).should('be.visible').click();
        cy.wait(2000);
        cy.xpath(selectors.verifySignalIsSelected).should('contain', name);
    }

    changeToSignalStartEvent() {
        cy.xpath(selectors.signalStartevent).click();
    }

    clickOnFormTaskComments() {
        cy.get(selectors.clickOnCommentsBtn).click();
    }

    enableTheComments() {
        cy.xpath(selectors.enableTheComments).click();
    }

    enableTheReactions() {
        cy.xpath(selectors.enableTheReaction).click();
    }

    enableTheVoting() {
        cy.xpath(selectors.enableTheVoting).click();
    }

    enableTheEdit() {
        cy.xpath(selectors.enableTheEdit).click();
    }

    enableTheDelete() {
        cy.xpath(selectors.enableTheDelete).click();
    }

    createProcessWithBPMNFile(nameProcess, descriptionProcess, category, path) {
        cy.get(selectors.addProcessBtn).click();
        cy.get(selectors.nameTxtBx).click().type(nameProcess);
        cy.get(selectors.descriptionTxtBx).click().type(descriptionProcess);
        cy.xpath(selectors.labelCategory).should("be.visible");
        cy.get(selectors.categoryInput).click();
        cy.get(selectors.categoryInput)
            .type(category)
            .should("contain", category);
        cy.xpath(selectors.optionCategory)
            .should("have.attr", "aria-label")
            .and("equal", category + ". ");
        cy.get(selectors.categoryInput).type("{enter}");
        cy.get(selectors.uploadBPMNBrowseButton).attachFile(path);
        cy.get(selectors.saveBtnBPMN).click();
    }
    verifyNameProcess(nameProcess) {
        cy.xpath(selectors.nameProcessInModeler).should("contain", nameProcess);
    }
    downloadProcess() {
        cy.get(selectors.exportBtn).first().click();
        cy.get(selectors.menuSidebar).should("be.visible");
        cy.get(selectors.expandBtn).should("be.visible").click();
        cy.xpath(selectors.optionFirstInMenuSidebar).should(
            "contain",
            "Processes"
        );
        cy.xpath(selectors.downloadBtn).click();
    }
    verifyProcessInDownloadsFolder(path, nameProcess) {
        cy.readFile(path).should("exist");
        cy.readFile(path).its("process").its("name").should("eq", nameProcess);
    }
    openScreenofElementFromModeler(typeName, elementName) {
        const elementStartEventXpath = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.startEvent.Shape']";
        const elementTaskEventXpath = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.startEvent.Shape']";
        const weBtnSelector = "[id='accordion-button-webentry']";
        const linkScreenAssociatedXpath = "//label[text()='Screen Associated']/parent::div//a";

        switch (typeName) {
            case 'Start Event':
                cy.xpath(elementStartEventXpath.replace('nameElem', elementName)).first().should('be.visible').click();
                //click on WE
                cy.get(weBtnSelector).click();
                //Open screen Associate
                cy.xpath(linkScreenAssociatedXpath)
                    .should('have.attr', 'href')
                    .then((href) => {
                        cy.visit(href)
                    });
                break;
            case 'Form Task': break;
        }

    }

    /*This method is responsible to search for a data connector and create if there is no such data connector
     This is applied for Admin User only
    @param processName: name of the process name
    @param processManager: description of the process manager
    @return nothing returns*/
    verifyProcessManagerAndAddItifNecessary(processName, processManager) {
        cy.xpath('(//button[@title="Edit"])[1]').should('be.visible');
        cy.xpath(selectors.searchInputProcess).type(processName).should('have.value', processName);
        cy.xpath(selectors.searchBox).click();
        cy.wait(2000);
        cy.xpath(selectors.processNameInputTxt.replace('processName', processName)).should('be.visible');
        cy.xpath(selectors.configureBtn).click();
        cy.wait(2000);
        cy.get('div[aria-labelledby="nav-config-tab"]').find('.multiselect__single').then(($manager) => {
            if ($manager.length === 1) {
                cy.xpath(selectors.processManagerDropdown).click();
                cy.xpath(selectors.processInputTxt).type(processManager);
                cy.xpath(selectors.processManagerAdmin).should('be.visible').click();
                cy.xpath(selectors.processManagerEditSaveBtn).click();
            } else return;
        });
    }

    /**
     * This method is responsible to configure a sub-process in the sub-process elenebt in modeler
     * @param elementName: name of sub-process in the modeler.
     * @param subProcessName: name of Sub-process to configure.
     * @param startEventName: name for the start event related to sub-process selected
     * @return nothing returns
     */
    verifyConfigOfSubProcessAndConfig(elementName, subProcessName, startEventName) {
        const elementTaskXapth = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        const subProcessSelected = "//label[text()='Process']/following-sibling::div/div[@class='multiselect__tags']//span";
        const resourceSelected = "//label[text()='Start Event']/parent::div//div[@class='multiselect__tags']//span";

        cy.xpath(elementTaskXapth.replace('nameElem', elementName)).first().should('be.visible').click();
        cy.wait(2000);
        cy.xpath(subProcessSelected).invoke('text')
            .then(text => {
                if (text !== subProcessName) {
                    // Set sub-process
                    cy.xpath('//label[text()="Process"]/following-sibling::div/div[@class="multiselect__tags"]').click();
                    cy.xpath('//label[text()="Process"]/following-sibling::div/div[@class="multiselect__tags"]/input').type(subProcessName).should('have.value', subProcessName);
                    cy.xpath('//label[text()="Process"]/following-sibling::div/div[@class="multiselect__content-wrapper"]//li[1]')
                        .should('have.attr', 'aria-label') // yields the "href" attribute
                        .and('contain', subProcessName);
                    cy.xpath('//label[text()="Process"]/following-sibling::div/div[@class="multiselect__tags"]/input').type('{enter}');
                }
            });
        cy.xpath(resourceSelected).invoke('text')
            .then(text => {
                if (text !== startEventName) {
                    // Set data connector
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//div[@class="multiselect__tags"]').click();
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//input').type(startEventName).should('have.value', startEventName);
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
                        .should('have.attr', 'aria-label') // yields the "href" attribute
                        .and('equal', startEventName + ". ");
                    cy.xpath('//label[text()="Select a Resource"]/parent::div//input').type('{enter}');
                }
            });

    }
}