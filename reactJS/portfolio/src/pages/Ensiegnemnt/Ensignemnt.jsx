import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import TopBar from "../../compenents/Etudinet/topBar/topBar";
import Calendrie from "../../compenents/Etudinet/Calendrie/Calendrie";
import Profil from "../../compenents/Etudinet/Setting/profil/Profil";
import HelpCenter from "../../compenents/Etudinet/Setting/HelpConter/HelpCenter";
import EmailManagement from "../../compenents/Ensiegnemnt/EmailManagement";
import SideBarEnsignemet from "../../compenents/Ensiegnemnt/SideBar/SideBarEnsignemet";
import TeamDashboard from "../../compenents/Ensiegnemnt/TeamDashboard";
import TasksGroups from "../../compenents/Ensiegnemnt/TasksGroups";
import TasksdetaillesGroup from "../../compenents/Ensiegnemnt/tasksdetaillesGroup";
import GroupDashboard from "../../compenents/Ensiegnemnt/GroupDashboard";



function Ensignemnt() {

  return (
    <div className="flex flex-row h-screen">
      <div className="bg-red-600 ">
        <SideBarEnsignemet />
      </div>

      <div className="flex flex-col w-full">
        <div className="bg-red-200">
          <TopBar />
        </div>

        <div className="overflow-hidden flex-grow">
          <div className="overflow-auto h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ensignemnt;