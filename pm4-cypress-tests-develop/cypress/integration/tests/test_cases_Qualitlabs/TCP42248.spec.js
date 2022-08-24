import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Dataconnectors } from "../../pages/dataConnectors";
import { Admin } from "../../pages/admin";
import testData2248 from "../../../fixtures/test_data/TCP42248.json";




const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens = new Screens();
const dataconnector = new Dataconnectors();
const admin = new Admin();

describe("ProcessMaker Test Cases", () => {

  before(() => {
    login.navigateToUrl();
    login.login();
    login.changeLanguageToEnglishAndDateType();
  })

  it('TCP4 - 2248', () => {

    var name = "QA-Process-" + new Date().getTime();
    var description = "Created for testing purpose";
    var timeStamp = new Date().getTime();
    var form_screen1 = timeStamp + testData2248.screens[0].name;
    var form_screen2 = timeStamp + testData2248.screens[1].name;

    var dataConnectorName = "DC" + timeStamp;
    var dataconnectorType = "No Auth";
    var resourceUrl = "http://api.worldbank.org/v2/country?format=json";
    var resourceMethod = "GET";
    var listName = "GET: list";
    var userName = "admin";
    var collectionName = testData2248.screens[1].controlls[0].datasource.data_connector;
    var collectionFilePath = "collections/bookscollection.json";

    // Create data connector
    navHelper.navigateToDataConnectorPage();
    dataconnector.createADataConnector(dataConnectorName, description, dataconnectorType);
    dataconnector.AddAListResource(description, resourceMethod, resourceUrl);


    // Create collection using the two screens
    navHelper.navigateToCollectionPage();
    admin.verifyPresenceOfCollectionAndImportCollection(collectionName, collectionFilePath);


    // Create remaining screens
    navHelper.navigateToScreensPage();
    for (var i = 0; i < testData2248.screens.length; i++) {
      screens.addScreen(testData2248.screens[i], timeStamp);
      navHelper.navigateToScreensPage();
    }

    // Create process and add items
    navHelper.navigateToProcessPage();
    process.createProcess(name, description);
    process.dragEvent('pool', 400, 70);

    process.dragEvent('start', 420, 200);
    process.getId("start").then(start_event_id => {

      process.dragEvent('Data Connector', 480, 200);
      //process.selectdataconnector(dataconnector_name);
      process.getId("task").then(Dataconnector_event_id1 => {
        process.selectdataconnector(Dataconnector_event_id1, dataConnectorName, listName);
        //process.changetaskname("Data Connector A");

        process.dragEvent('task', 680, 200);
        process.getId("task").then(task_event_id1 => {
          //process.changetaskname('A');
          process.addScreenToFormTask(task_event_id1, form_screen1);
          process.addassignmentRules(task_event_id1, userName);

          process.dragEvent('task', 830, 200);
          process.getId("task").then(task_event_id2 => {
            //process.changetaskname('B');

            process.dragEvent('Data Connector', 800, 400);
            // process.selectdataconnector(dataconnector_name);
            process.getId("task").then(Dataconnector_event_id2 => {
              process.selectdataconnector(Dataconnector_event_id2, dataConnectorName, listName);
              //process.changetaskname('Data Connector B');

              process.dragEvent('task', 650, 400);
              process.getId("task").then(task_event_id3 => {
                //process.changetaskname('c');

                process.dragEvent('end', 480, 400);
                process.getId("end").then(end_event_id => {

                  // Adding screens to the form task
                  process.addScreenToFormTask(task_event_id2, form_screen2);
                  process.addScreenToFormTask(task_event_id3, form_screen2);

                  process.connectToEvents(start_event_id, Dataconnector_event_id1);
                  process.connectToEvents(Dataconnector_event_id1, task_event_id1);
                  process.connectToEvents(task_event_id1, task_event_id2);
                  process.connectToEvents(task_event_id2, Dataconnector_event_id2);
                  process.connectToEvents(Dataconnector_event_id2, task_event_id3);
                  process.connectToEvents(task_event_id3, end_event_id);

                  // Adding assignment rule as admin user
                  process.addassignmentRules(task_event_id2, userName);
                  process.addassignmentRules(task_event_id3, userName);
                })
              })
            })
          })
        })
      })
    })
    process.saveTheProcess(name);

    header.clickOnAddRequest();
    header.searchWithProcessName(name);
    header.clickOnStart(name);
    cy.url().then(url => {
      request.clickOnTaskName(1, 1);
      var requestId = url.split('/')[4].trim();
      specific.actionsAndAssertionsOfTCP42248(requestId);
    })
  })
})