import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import About from "../pages/Home/About.jsx";
import Contact from "../pages/Home/Contact.jsx";
import NotFound from "../pages/Home/NotFound.jsx";
import Login from "../compenents/CopHome/signLog/login.jsx";
import Signin from "../compenents/CopHome/signLog/Signin/signin.jsx";
import EmailPass from "../compenents/CopHome/signLog/forgetPassword/emailPass.jsx";
import CodeSend from "../compenents/CopHome/signLog/forgetPassword/codeSend.jsx";
import Reset from "../compenents/CopHome/signLog/forgetPassword/Reset.jsx";
import Etudinet from "../pages/Etudient/Etudinet.jsx";
import Ensignemnt from "../pages/Ensiegnemnt/Ensignemnt.jsx";
import Overview from "../compenents/Etudinet/Overview/Overview.jsx";
import OverviewGroup from "../compenents/Etudinet/Overview/OverviewGroup/OverviewGroup.jsx";
import OverviewPersonel from "../compenents/Etudinet/Overview/OverviewPersonel/OverviewPersonel.jsx";
import Calendrie from "../compenents/Etudinet/Calendrie/Calendrie.jsx";
import EmailManagement from "../compenents/Ensiegnemnt/EmailManagement.jsx";
import MembersInfo from "../compenents/Members/MembersInfo";
import Chat from "../compenents/Etudinet/Workspace/chat/Chat.jsx";
import ChatRoom from "../compenents/Etudinet/Workspace/ChatRoom.jsx";
import Mytasks from "../compenents/tasks/mytask/mytasks";
import TaskProjet from "../compenents/tasks/tasksProjet/taskProjet";
import Alltasks from "../compenents/tasks/tasksProjet/alltasks";
import Addtasks from "../compenents/tasks/tasksProjet/addtasks";
import TaksStatus from "../compenents/tasks/tasksProjet/taksStatus";
import TaskDetails from "../compenents/tasks/tasksProjet/TaskDetails";
import HelpCenter from "../compenents/Etudinet/Setting/HelpConter/HelpCenter.jsx";
import Profil from "../compenents/Etudinet/Setting/profil/Profil.jsx";

import GroupDashboard from "../compenents/Ensiegnemnt/GroupDashboard.jsx";
import TeamDashboard from "../compenents/Ensiegnemnt/TeamDashboard.jsx";
import TasksdetaillesGroup from "../compenents/Ensiegnemnt/tasksdetaillesGroup.jsx";
import TasksGroups from "../compenents/Ensiegnemnt/TasksGroups"
import All from "../compenents/CopHome/BanniereAccueil/All.jsx";
import EmailEnsignemnt from "../compenents/Ensiegnemnt/emailEnsignemnt.jsx";

import Admin from "../pages/Admin/Admin.jsx";
import Dashbord from "../compenents/Admine/Dashbord.jsx";
import Ensiegnments from "../compenents/Admine/Ensiegnments.jsx";
import Etudinets from "../compenents/Admine/Etudinets.jsx";
import Groups from "../compenents/Admine/Groups.jsx";


function Router() {
 const [tasks, setTasks] =( [
    { id: 1, group: "group1", status: "Not Started", title: "Brand Colors", description: "Define brand color palette for marketing materials.", owner: "Alice", deadline: "2025-02-10", priority: "High", comments: [] },
    { id: 2, group: "group1", status: "Not Started", title: "Help Center Redesign", description: "Revamp the help center layout and design.", owner: "Bob", deadline: "2025-02-15", priority: "Medium", comments: [] },
    { id: 3, group: "group2", status: "Completed", title: "Illustrated Portraits", description: "Create illustrated portraits for team profiles.", owner: "Charlie", deadline: "2025-02-20", priority: "High", comments: [] },
    { id: 4, group: "group3", status: "Completed", title: "Email Signature", description: "Create a professional email signature template.", owner: "Frank", deadline: "2025-02-25", priority: "Low", comments: [] },
  ]);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetPassword" element={<EmailPass />} />
          <Route path="/codeSend" element={<CodeSend email="@email.com" />} />
          <Route path="/changePass" element={<Reset />} />
          <Route path="/BanniereAccueil" element={<All />}></Route>
          <Route path="/Signin" element={<Signin />} />

          {/* Pour Etduient */}

          <Route path="/etudiant/:id" element={<Etudinet />}>
            <Route path="dashbord">
              <Route path="Overview" element={<Overview />}>
                <Route path="OverviewPersonel" element={<OverviewPersonel />} />
                <Route path="OverviewGroup" element={<OverviewGroup />} />
              </Route>
              <Route path="calendrie" element={<Calendrie />} />
              <Route path="EmailManagement" element={<EmailManagement />} />
            </Route>
            <Route path="wokspace">
              <Route path="MembersInfo" element={<MembersInfo />} />
              <Route path="Chat" element={<ChatRoom />} />
            </Route>

            <Route path="tasks">
              <Route path="Mytasks" element={<Mytasks />} />
              <Route path="TaskProjet" element={<TaskProjet />}>
                <Route path="Alltask" element={<Alltasks />} />
                <Route path="bystatus" element={<TaksStatus />} />
                <Route path="addtasks" element={<Addtasks />} />
                <Route path="TaskDetails/:taskId" element={<TaskDetails />} />
              </Route>
            </Route>

            <Route path="Settings">
              <Route path="HelpCenter" element={<HelpCenter />} />
              <Route path="Profil" element={<Profil />} />
            </Route>
          </Route>

          {/* Pour Ensiegnemnt */}
          <Route path="/ensignemnt/:id" element={<Ensignemnt />}>
            <Route path="dashboard">
              <Route path="GroupDashboard" element={<GroupDashboard />} />
              <Route path="calendrie" element={<Calendrie />} />
            </Route>

            <Route path="workspace">
              <Route path="MembersInfo" element={<TeamDashboard />} />
              <Route path="EmailManagement" element={<EmailEnsignemnt />} />
            </Route>
              {/* element={<Outlet context={{ tasks, setTasks }} />} */}
            <Route path="tasks"   >
              <Route path="TaskProjet" element={<TasksGroups />} />
              <Route path="tasksdetaillesGroup/:taskId" element={<TasksdetaillesGroup />} />
            </Route>

            <Route path="Settings">
              <Route path="HelpCenter" element={<HelpCenter />} />
              <Route path="Profil" element={<Profil />} />
            </Route>
          </Route>

          {/* Pour Admine */}
          <Route path="/Admin" element={<Admin/>}>
            <Route path="dashboard" element={<Dashbord/>} />  {/* Suppression du "/" initial */}
            <Route path="etudiants" element={<Etudinets/>}/>   {/* Correction orthographe + suppression "/" */}
            <Route path="enseignants" element={<Ensiegnments/>}/>  {/* Correction orthographe + suppression "/" */}
            <Route path="groups" element={<Groups/>}/>         {/* Suppression du "/" initial */}
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
