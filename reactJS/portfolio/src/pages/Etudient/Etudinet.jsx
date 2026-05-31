import React from "react";
import { Outlet } from "react-router-dom";
import Sidebir from "../../compenents/Etudinet/sidebar/Sidebir";
// import Overview from "../../compenents/Etudinet/Overview/Overview";
// import OverviewGroup from "../../compenents/Etudinet/Overview/OverviewGroup/OverviewGroup";
// import OverviewPersonel from "../../compenents/Etudinet/Overview/OverviewPersonel/OverviewPersonel";
import TopBar from "../../compenents/Etudinet/topBar/topBar";
// import Calendrie from "../../compenents/Etudinet/Calendrie/Calendrie";
// import Chat from "../../compenents/Etudinet/Workspace/chat/Chat";
// import Profil from "../../compenents/Etudinet/Setting/profil/Profil";
// import Mytasks from "../../compenents/tasks/mytask/mytasks";
// import TaskProjet from "../../compenents/tasks/tasksProjet/taskProjet";
// import Addtasks from "../../compenents/tasks/tasksProjet/addtasks";
// import TaksStatus from "../../compenents/tasks/tasksProjet/taksStatus";
// import Alltasks from "../../compenents/tasks/tasksProjet/alltasks";
// import TaskDetails from "../../compenents/tasks/tasksProjet/TaskDetails";
// import Inbox from "../../compenents/Etudinet/Workspace/Inbox/inbox";
// import MembersInfo from "../../compenents/Members/MembersInfo";
// import HelpCenter from "../../compenents/Etudinet/Setting/HelpConter/HelpCenter";
// import EmailManagement from "../../compenents/Ensiegnemnt/EmailManagement";
function Etudinet() {
    return (
        <div className="flex flex-row h-screen">
            {/* Sidebar */}
            <div className="bg-primary ">
                <Sidebir />
            </div>

            {/* Content */}
            <div className="flex flex-col w-full h-full">
                <div className="bg-primary">
                    <TopBar />
                </div>

                {/* Outlet should take the full remaining space */}
                <div className="flex-grow overflow-hidden">
                    <div className="h-full overflow-auto">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Etudinet;
