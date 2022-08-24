import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Admin } from "../../pages/admin";
import 'cypress-file-upload';
import { Screens } from "../../pages/screens";
import testData from "../../../fixtures/test_data/TCP42175.json";
const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const admin =new Admin();
const screens= new Screens();

describe("ProcessMaker Test Cases", () => {

  before(()=>{
    login.navigateToUrl();
    login.login();
    login.changeLanguageToEnglishAndDateType();
  })

  it.only('TCP4 - 2175',() =>{

    var processName = "TCP4-2175-Verify the data of a screen conversational";
    var filePath = "processes/TCP4-2175.json";

    navHelper.navigateToProcessPage();
    process.verifyPresenceOfProcessAndImportProcess(processName, filePath);
    header.clickOnAddRequest();
    header.searchWithProcessName(processName);
    header.clickOnStart(processName);
    cy.url().then(url => {
    var requestId = url.split('/')[4].trim();
    request.clickOnTaskName(1, 1);
    specific.actionsAndAssertionsOfTCP42175(requestId);
    })

    // var name = "QA-Process-"+new Date().getTime();
    // var timeStamp = new Date().getTime();
    // var coverstaion_screen1 = timeStamp+testData.screens[0].name;
    // var coverstaion_screen2 = timeStamp+testData.screens[1].name;
    // var description = "Created for testing purpose";
    // //var coverstaion_screen = "cy_yjrsm-Click Button";
    // var seletListName = "selectlistmultiple";
    // var loopMode = "Multi-Instance (Sequential)";

    // navHelper.navigateToScreensPage();
    // for(var i=0; i<testData.screens.length;i++){
    //   screens.addScreen(testData.screens[i], timeStamp);
    //   navHelper.navigateToScreensPage();
    // }

    // navHelper.navigateToProcessPage();
    // process.createProcess(name, description);
    

    // process.dragEvent('start', 400, 200);
    // const start_event_id = await process.getId("start");

    // process.dragEvent('task', 650, 200);
    // const task_event_id1 = await process.getId("task");

    // process.dragEvent('task', 950, 200);
    // process.changeToManualTask();
    // const task_event_id2 = await process.getId("task");

    // process.dragEvent('end', 900, 550);
    // //process.changetoSignalEndevent();
    
    // const end_event_id = await process.getId("end");
    

    // process.connectToEvents(start_event_id, task_event_id1);
    // process.connectToEvents(task_event_id1,  task_event_id2);
    // process.connectToEvents(task_event_id2,  end_event_id);
   

    // // cy.wait(5000);
    // process.addScreenToFormTask(task_event_id1, coverstaion_screen1);
    // process.addScreenToFormTask(task_event_id2, coverstaion_screen2);
    // //process.addDisplayScreenToPDFGenrator(pdf_event_id, displayScreen);
    // //process.addLoopActivity(loopMode, seletListName);
    // process.saveTheProcess(name);
    // header.clickOnAddRequest();
    // header.searchWithProcessName(name);
    // var requestId = await header.clickOnStart(name);
    // request.clickOnTaskName(1, 1);
    // specific.actionsAndAssertionsOfTCP42175(requestId)
   
})
})