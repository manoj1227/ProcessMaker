import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Admin } from "../../pages/admin";
import { Scripts } from "../../pages/scripts";
import selectors from "../../selectors/admin"
import testData2113 from "../../../fixtures/test_data/TCP42113.json";


const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const specific = new Specific();
const screens = new Screens();
const admin = new Admin();
const scripts = new Scripts();
describe("ProcessMaker Test Cases", () => {

  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    login.navigateToUrl();
    login.login();
    login.changeLanguageToEnglishAndDateType();
  })
  it('TCP4 - 2113', () => {
    var name = "QA-Process-" + new Date().getTime();
    var timeStamp = new Date().getTime();
    var description = "Created for testing purpose";
    var create_screen = timeStamp + testData2113.screens[0].name;
    var view_screen = timeStamp + testData2113.screens[1].name;
    var form_screen1 = timeStamp + testData2113.screens[2].name;
    var collectionName = timeStamp + "QA-Student";
    var scriptName = timeStamp + "QA-2113Script";
    var userName = Cypress.env("username");
    var variableName = "name";
    var userName1 = Cypress.env("TestUser3");


    navHelper.navigateToUserPage();
    admin.searchForUser(userName1);
    cy.xpath("//i[contains(@class,'fas fa-pen-square')]").first().click();
    cy.url().then(url => {
      var userid = url.split('/')[5].trim();
      cy.log(userid);


      var scriptValue = "$mivar = $api->users()->getUserById(" + userid + ")['id']; return ['name'=>$mivar];";
      navHelper.navigateToScriptPage();
      scripts.createScript(scriptName, description, userName);
      scripts.addPhpTOScript(scriptValue);
    })

    navHelper.navigateToScreensPage();
    for (var i = 0; i < testData2113.screens.length; i++) {
      screens.addScreen(testData2113.screens[i], timeStamp);
      navHelper.navigateToScreensPage();
    }


    navHelper.navigateToCollectionPage();
    admin.creatACollection(collectionName, description, create_screen, view_screen, create_screen);
    navHelper.navigateToCollectionPage();
    admin.searchForCollection(collectionName);
    admin.enableCollectionSignals();

    //create process
    navHelper.navigateToProcessPage();
    process.createProcess(name, description);


    process.dragEvent('pool', 400, 70);

    process.dragEvent('start', 460, 200);
    process.changeTosignalStartEvent();
    process.getId("start").then(start_event_id => {

      process.dragEvent('task', 600, 200);
      process.changetoscripttask();
      process.getId("task").then(scriptTask_event_id => {


        process.dragEvent('task', 800, 200);
        process.getId("task").then(task_event_id => {
          process.changetaskname("By user Id");

          process.dragEvent('end', 950, 200);
          process.getId("end").then(end_event_id => {

            process.connectToEvents(start_event_id, scriptTask_event_id);
            process.connectToEvents(scriptTask_event_id, task_event_id);
            process.connectToEvents(task_event_id, end_event_id);

            process.addsignal(start_event_id, collectionName + " create");
            process.addScreenToFormTask(task_event_id, form_screen1);
            process.addScreenToscriptTask(scriptTask_event_id, scriptName);
            process.addassignmentRulesAsByUserID(task_event_id, variableName);
          })
        })
      })
    })

    process.saveTheProcess(name);

    navHelper.navigateToCollectionPage();
    //search for collection
    admin.searchForCollection(collectionName);
    //add  a record
    admin.addingDataToStudentCollection(new Date().toLocaleDateString('en-GB'), "345678", "tester1", "user1", "9573616879");
    //Go to InProgress Requests
    navHelper.navigateToInprogressRequests();
    specific.actionsAndAssertionsOfTCP42113(name);
  })
})
