import { Login} from "../../pages/login";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Process } from "../../pages/process";
import { Admin } from "../../pages/admin";
import {Screens} from "../../pages/screens";
import {Execution} from "../../pages/execution";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const admin = new Admin();
const screen = new Screens();
const execution = new Execution();



describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    it("TCP4 - 2340", () => {
        var processName = "TCP4-2340 Verify loop";
        var filePath = "processes/TCP4-2340 Verify loop.json";

        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);

        //Step 2: Execution of the process
        navHelper.navigateToRequestsPage();
        execution.actionsAndAssertionsOfNoLoopsTCP42340();

        //Step 3: Execution of the process
        navHelper.navigateToRequestsPage();
        execution.actionsAndAssertionsOfLoopsTCP42340();
    });
});
