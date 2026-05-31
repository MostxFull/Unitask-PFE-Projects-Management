import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiActivity, FiUsers, FiMessageSquare } from "react-icons/fi";
import { CiCalendar, CiSettings } from "react-icons/ci";
import { MdOutlineMail, MdOutlineTask } from "react-icons/md";
import { IoHelpCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import Logo from "../../Etudinet/sidebar/Logo";
import SummerUser from "../../Etudinet/sidebar/summerUser";
import { useParams } from "react-router-dom";

function SideBarEnsignemet() {
  const { id } = useParams();
  const [openSections, setOpenSections] = useState({
    dashboard: true,
    workspace: true,
    tasks: true,
    settings: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
      <div className="h-screen bg-gradient-to-b from-blue-50 to-purple-50 text-gray-800 flex flex-col justify-between p-6 shadow-xl overflow-auto">
        <div className="space-y-6">
          <Logo />

          <nav className="space-y-4">
            {/* Dashboard Section */}
            <div>
              <div
                  className="flex justify-between items-center cursor-pointer p-2 rounded-lg hover:bg-blue-100 transition-colors"
                  onClick={() => toggleSection("dashboard")}
              >
                <h1 className="text-lg font-semibold flex items-center gap-2">
                  <FiActivity className="text-blue-500" />
                  Dashboard
                </h1>
                {openSections.dashboard ? (
                    <FiChevronUp className="text-gray-500" />
                ) : (
                    <FiChevronDown className="text-gray-500" />
                )}
              </div>
              {openSections.dashboard && (
                  <div className="ml-6 space-y-2 mt-2">
                    <NavLink
                        to={`/ensignemnt/${id}/dashboard/GroupDashboard`}
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-blue-50'
                            }`
                        }
                    >
                      <FiActivity className="text-lg" />
                      Overview
                    </NavLink>
                    <NavLink
                        to={`/ensignemnt/${id}/dashboard/calendrie`}
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                isActive ? 'bg-blue-100 text-blue-600' : 'hover:bg-blue-50'
                            }`
                        }
                    >
                      <CiCalendar className="text-lg" />
                      Calendar
                    </NavLink>
                  </div>
              )}
            </div>

            {/* Workspace Section */}
            <div>
              <div
                  className="flex justify-between items-center cursor-pointer p-2 rounded-lg hover:bg-purple-100 transition-colors"
                  onClick={() => toggleSection("workspace")}
              >
                <h1 className="text-lg font-semibold flex items-center gap-2">
                  <FiUsers className="text-purple-500" />
                  Workspace
                </h1>
                {openSections.workspace ? (
                    <FiChevronUp className="text-gray-500" />
                ) : (
                    <FiChevronDown className="text-gray-500" />
                )}
              </div>
              {openSections.workspace && (
                  <div className="ml-6 space-y-2 mt-2">
                    <NavLink
                        to={`/ensignemnt/${id}/workspace/MembersInfo`}
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                isActive ? 'bg-purple-100 text-purple-600' : 'hover:bg-purple-50'
                            }`
                        }
                    >
                      <FiUsers className="text-lg" />
                      Members
                    </NavLink>
                    <NavLink
                        to={`/ensignemnt/${id}/workspace/EmailManagement`}
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                isActive ? 'bg-purple-100 text-purple-600' : 'hover:bg-purple-50'
                            }`
                        }
                    >
                      <MdOutlineMail className="text-lg" />
                      Inbox
                    </NavLink>
                  </div>
              )}
            </div>

            {/* Tasks Section */}
            <div>
              <div
                  className="flex justify-between items-center cursor-pointer p-2 rounded-lg hover:bg-green-100 transition-colors"
                  onClick={() => toggleSection("tasks")}
              >
                <h1 className="text-lg font-semibold flex items-center gap-2">
                  <MdOutlineTask className="text-green-500" />
                  Tasks
                </h1>
                {openSections.tasks ? (
                    <FiChevronUp className="text-gray-500" />
                ) : (
                    <FiChevronDown className="text-gray-500" />
                )}
              </div>
              {openSections.tasks && (
                  <div className="ml-6 space-y-2 mt-2">
                    <NavLink
                        to={`/ensignemnt/${id}/tasks/TaskProjet`}
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                isActive ? 'bg-green-100 text-green-600' : 'hover:bg-green-50'
                            }`
                        }
                    >
                      <MdOutlineTask className="text-lg" />
                      Project Tasks
                    </NavLink>
                  </div>
              )}
            </div>

            {/* Settings Section */}
            <div>
              <div
                  className="flex justify-between items-center cursor-pointer p-2 rounded-lg hover:bg-red-100 transition-colors"
                  onClick={() => toggleSection("settings")}
              >
                <h1 className="text-lg font-semibold flex items-center gap-2">
                  <CiSettings className="text-red-500" />
                  Settings
                </h1>
                {openSections.settings ? (
                    <FiChevronUp className="text-gray-500" />
                ) : (
                    <FiChevronDown className="text-gray-500" />
                )}
              </div>
              {openSections.settings && (
                  <div className="ml-6 space-y-2 mt-2">
                    {/*<NavLink*/}
                    {/*    to={`/ensignemnt/${id}/Settings/HelpCenter`}*/}
                    {/*    className={({ isActive }) =>*/}
                    {/*        `flex items-center gap-2 p-2 rounded-lg transition-colors ${*/}
                    {/*            isActive ? 'bg-red-100 text-red-600' : 'hover:bg-red-50'*/}
                    {/*        }`*/}
                    {/*    }*/}
                    {/*>*/}
                    {/*  <IoHelpCircleOutline className="text-lg" />*/}
                    {/*  Help Center*/}
                    {/*</NavLink>*/}
                    <NavLink
                        to={`/ensignemnt/${id}/Settings/Profil`}
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                isActive ? 'bg-red-100 text-red-600' : 'hover:bg-red-50'
                            }`
                        }
                    >
                      <CiSettings className="text-lg" />
                      Profile
                    </NavLink>
                  </div>
              )}
            </div>
          </nav>
        </div>

        {/* User Section */}
        <div className="pt-6">
          <SummerUser />
        </div>
      </div>
  );
}

export default SideBarEnsignemet;