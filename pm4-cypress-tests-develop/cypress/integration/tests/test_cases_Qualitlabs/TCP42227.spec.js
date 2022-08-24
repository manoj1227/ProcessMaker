import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Dataconnectors } from "../../pages/dataConnectors";
import testData from "../../../fixtures/test_data/TCP42227.json";
import EnvData from "../../../../cypress.json";

const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens = new Screens();
const dataconnector = new Dataconnectors();

describe("ProcessMaker Test Cases", () => {

  before(() => {
    login.navigateToUrl();
    login.login();
    login.changeLanguageToEnglishAndDateType();
  })

  it('TCP4 - 2227', () => {
    var name = "QA-Process-" + new Date().getTime();
    var timeStamp = new Date().getTime();
    var description = "Created for testing purpose";
    var coverstaion_screen = timeStamp + testData.screens[0].name;
    var displayScreen = timeStamp + testData.screens[1].name;
    var seletListName = "selectlistmultiple";
    var loopMode = "Multi-Instance (Sequential)";
    var dataConnectorName = testData.screens[0].controlls[1].datasource.data_connector + timeStamp;
    var dataConnectorType = "Bearer Token";
    var token = Cypress.env('token');
    var resourceMethod = "GET";
    var resourceURL = EnvData.baseUrl + '/api/1.0/groups';

    // Create a data connector
    navHelper.navigateToDataConnectorPage();
    dataconnector.createADataConnector(dataConnectorName, description, dataConnectorType);
    dataconnector.OpenConfigurationTab();
    dataconnector.AddAToken(token);
    dataconnector.OpenResourcesTab();
    dataconnector.AddAListResource(description, resourceMethod, resourceURL);

    // Create screens
    navHelper.navigateToScreensPage();
    for (var i = 0; i < testData.screens.length; i++) {
      screens.addScreen(testData.screens[i], timeStamp);
      navHelper.navigateToScreensPage();
    }

    // Creating Process
    navHelper.navigateToProcessPage();
    process.createProcess(name, description);
    //cy.wait(5000); // Will remove later

    process.dragEvent('start', 400, 200);
    process.getId("start").then(start_event_id => {

      process.dragEvent('pdf generator', 500, 400);
      process.getId("pdf generator").then(pdf_event_id => {

        process.dragEvent('task', 650, 200);
        process.getId("task").then(task_event_id => {

          process.dragEvent('end', 500, 550);
          process.getId("end").then(end_event_id => {

            process.connectToEvents(start_event_id, task_event_id);
            process.connectToEvents(task_event_id, pdf_event_id);
            process.connectToEvents(pdf_event_id, end_event_id);

            // cy.wait(5000);
            process.addScreenToFormTask(task_event_id, coverstaion_screen);
            process.addDisplayScreenToPDFGenrator(pdf_event_id, displayScreen);
            process.addLoopActivity(loopMode, seletListName);
            process.saveTheProcess(name);

            // Create request
            header.clickOnAddRequest();
            header.searchWithProcessName(name);
            header.clickOnStart(name);
            cy.url().then(url => {
              var requestId = url.split('/')[4].trim();
              request.clickOnTaskName(1, 1);
              specific.actionsAndAssertionsOfTCP42227(requestId);
            })
          })
        })
      })
    })
  })
})