import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper} from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Dataconnectors} from "../../pages/dataConnectors";
import { Scripts } from "../../pages/scripts";
import testData2212 from "../../../fixtures/test_data/TCP42212.json";




const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens = new Screens();
const dataconnector = new Dataconnectors();
const scripts = new Scripts();
describe("ProcessMaker Test Cases", () => {

  before(() => {
    login.navigateToUrl();
    login.login();
    login.changeLanguageToEnglishAndDateType();
  })

it('TCP4 - 2212', async () =>{
    var name = "QA-Process-"+new Date().getTime();
    var timeStamp= new Date().getTime();
    var description = "Created for testing purpose";
    var coverstaion_screen1 = timeStamp+testData2212.screens[0].name;
    var scriptName = timeStamp + "2212Script";
    var userName = Cypress.env("username");
    var listName="GET: list";
    var source="data";
    var requestVariable="information";
    var token = Cypress.env("token");

    var scriptValue='$state = array("AS"=>"ASSAM", "OR"=>"ORRISA", "KR"=>"KERELA"); extract($state);$text = "$AS is $AS $KR is $KR $OR is $OR";$array_implode = ["Israel", "Japan", "Germany"];$array_text_implode = implode(" ", $array_implode);return ["text"=> $text, "text_imploded" => $array_text_implode];?>';
    navHelper.navigateToScriptPage();
    scripts.createScript(scriptName, description, userName);
    scripts.addPhpTOScript(scriptValue);

    
    var dataConnectorName = "GroupsDC"+ timeStamp;
    var groupsDataConnectorName= dataConnectorName;
    var dataconnectorType = "Bearer Token";
    var resourceName ="list";
    var resourceUrl= Cypress.env('URL')+"/api/1.0/groups";
    var resourceMethod= "GET";
    navHelper.navigateToDataConnectorPage();
    dataconnector.createADataConnector(dataConnectorName, description, dataconnectorType);
    dataconnector.addResourceForBearerToken(resourceName, description, resourceMethod, resourceUrl, token);


    //var dataConnectorName = "QA-UsersDataConnector-"+timeStamp;
    var dataConnectorName = testData2212.screens[0].controlls[0].datasource.data_connector + timeStamp;
    var dataconnectorType = "Bearer Token";
    var resourceName ="list";
    var resourceUrl= Cypress.env('URL')+"/api/1.0/users";
    var resourceMethod= "GET";
    navHelper.navigateToDataConnectorPage();
    dataconnector.createADataConnector(dataConnectorName, description, dataconnectorType);
    dataconnector.addResourceForBearerToken(resourceName, description, resourceMethod, resourceUrl, token);

   navHelper.navigateToScreensPage();
    for(var i=0; i<testData2212.screens.length;i++){
      screens.addScreen(testData2212.screens[i], timeStamp);
      navHelper.navigateToScreensPage();
    }

    navHelper.navigateToProcessPage();
    process.createProcess(name, description);
    //cy.wait(5000); // Will remove later

    process.dragEvent('pool',400,70);
   
    process.dragEvent('start', 440, 200);
    const start_event_id = await process.getId("start");

    process.dragEvent('Data Connector', 590, 200);
    const dataConnector_id = await process.getId("task");
    process.selectdataconnector(dataConnector_id, groupsDataConnectorName, listName);
    process.addResponseMapping(source,requestVariable);
    //process.changetaskname('Groups');

    process.dragEvent('task', 790, 200);
    const task_event_id1 = await process.getId("task");

    process.dragEvent('task', 990, 200);
    process.changetoscripttask();
    const task_event_id2 = await process.getId("task");
    //process.changetaskname('A');
   

    process.dragEvent('task', 990, 400);
    process.changetoscripttask();
    const task_event_id3 = await process.getId("task");
    //process.changetaskname('B');

    process.dragEvent('task', 790, 400);
    process.changetoscripttask();
    const task_event_id4 = await process.getId("task");
    //process.changetaskname('C');

    process.dragEvent('end', 500, 400);
    const end_event_id = await process.getId("end");

    process.connectToEvents(start_event_id, dataConnector_id);
    process.connectToEvents(dataConnector_id, task_event_id1);
    process.connectToEvents(task_event_id1, task_event_id2 );
    process.connectToEvents(task_event_id2, task_event_id3);
    process.connectToEvents(task_event_id3, task_event_id4 );
    process.connectToEvents(task_event_id4, end_event_id );

    process.addScreenToFormTask(task_event_id1, coverstaion_screen1)
    process.addScreenToscriptTask(task_event_id2, scriptName);
    process.addScreenToscriptTask(task_event_id3, scriptName);
    process.addScreenToscriptTask(task_event_id4, scriptName);
    
    process.addassignmentRules(task_event_id1, userName);
    process.saveTheProcess(name);
    
    header.clickOnAddRequest();
    header.searchWithProcessName(name);
    var requestId = await header.clickOnStart(name);
    request.clickOnTaskName(1, 1);
    specific.actionsAndAssertionsOfTCP42212(requestId);
  })
})
