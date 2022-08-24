import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper} from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Scripts } from "../../pages/scripts";
import testData from "../../../fixtures/test_data/TCP4-2211.json";
import {
  Dataconnectors
} from "../../pages/dataConnectors";
import {
  Admin
} from "../../pages/admin";
import EnvData from "../../../../cypress.json";
const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens= new Screens();
const dataconnector = new Dataconnectors();
const admin = new Admin();
const scripts=new Scripts();
describe("ProcessMaker Test Cases", () => {

  before(()=>{
    login.navigateToUrl();
    login.login();
    login.changeLanguageToEnglishAndDateType();
  })

  it.only('TCP4 - 2211', async () =>{
    var name = "QA-Process-"+new Date().getTime();
    var description = "Created for testing purpose";
    var timeStamp = new Date().getTime();
    var coverstaion_screen1 = timeStamp+testData.screens[0].name;
    var coverstaion_screen2 = timeStamp+testData.screens[1].name;
    var dataConnectorName = testData.screens[0].controlls[0].datasource.data_connector + timeStamp;
    var dataConnectorType = "Bearer Token";
    var token = Cypress.env("token");
    var resourceMethod = "GET";
    var resourceURL = EnvData.baseUrl + '/api/1.0/groups';
    var seletListName = "selectlistmultiple";
    var loopMode = "Multi-Instance (Sequential)";
    var userName ="admin";

    navHelper.navigateToDataConnectorPage();
    dataconnector.createADataConnector(dataConnectorName, description, dataConnectorType);
    dataconnector.OpenConfigurationTab();
    dataconnector.AddAToken(token);
    dataconnector.OpenResourcesTab();
    dataconnector.AddAListResource(description, resourceMethod, resourceURL);
    
     //create scripts
     var scriptName= timeStamp + '2211-userfirst';
     var scriptValue='$state = array("AS"=>"ASSAM", "OR"=>"ORRISA", "KR"=>"KERELA");extract($state);$text = "$AS is $AS $KR is $KR $OR is $OR";$array_implode = ["Israel", "Japan", "Germany"];$array_text_implode = implode(" ", $array_implode);return ["text"=> $text, "text_imploded"=> $array_text_implode];?>';
     navHelper.navigateToScriptPage();
     scripts.createScript(scriptName, description, userName);
     scripts.addPhpTOScript(scriptValue);

     //script2
     var scriptName=timeStamp + '2211-usersecond';
     var scriptValue='$text = "シラニカトナ";$text_imploded = "פםךןלוט";return ["text"=> $text, "text_imploded"=> $text_implodeturn ];';
     navHelper.navigateToScriptPage();
     scripts.createScript(scriptName, description, userName);
     scripts.addPhpTOScript(scriptValue);

    //screen create
    navHelper.navigateToScreensPage();
    for(var i=0; i<testData.screens.length;i++){
      screens.addScreen(testData.screens[i], timeStamp);
      navHelper.navigateToScreensPage();
    }

    screens.searchScreen(coverstaion_screen1, "edit");
    screens.addInternalScreen(testData.internalScreen, timeStamp);
    screens.addPageToRecordList(testData.internalScreen.name+timeStamp,4);

    navHelper.navigateToProcessPage();
    process.createProcess(name, description);
    process.dragEvent('pool', 400, 200);

    process.dragEvent('start', 450, 300);
    const start_event_id = await process.getId("start");

    process.dragEvent('task', 570, 300);
    const task_event_id1 = await process.getId("task");
    process.changetaskname('A');
    process.addassignmentRules(task_event_id1,userName);
    
 

    process.dragEvent('task', 750, 300);
    const task_event_id2 = await process.getId("task");
    process.changetaskname('B');
    process.addassignmentRules(task_event_id2,userName);

    process.dragEvent('end', 900, 300);
    const end_event_id = await process.getId("end");

    process.connectToEvents(start_event_id, task_event_id1);
    process.connectToEvents(task_event_id1,  task_event_id2);
    process.connectToEvents(task_event_id2,  end_event_id);
   
    process.addScreenToFormTask(task_event_id1, coverstaion_screen2);
    process.addScreenToFormTask(task_event_id2, coverstaion_screen1);
   
  
    process.saveTheProcess(name);
    header.clickOnAddRequest();
    header.searchWithProcessName(name);
    var requestId = await header.clickOnStart(name);
    request.clickOnTaskName(1, 1);
    specific.actionsAndAssertionsOfTCP42211(requestId);
  })
})