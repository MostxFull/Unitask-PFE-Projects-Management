import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

function Overview() {
  const { id } = useParams();
  return (
      <div className="flex flex-col h-full">
        <div className=" space-y-5 p-3">
          <div className="flex space-x-4">
            <div>
              <NavLink
                  className={({ isActive }) =>
                      isActive ? "border-b border-b-black border-b-2 p-1  " : ""
                  }
                  to={`/etudiant/${id}/dashbord/Overview/OverviewPersonel`}
              >
                OverviewPersonel
              </NavLink>
            </div>
            <div>
              <NavLink
                  className={({ isActive }) =>
                      isActive ? "border-b border-b-black border-b-2 p-1 " : ""
                  }
                  to={`/etudiant/${id}/dashbord/Overview/OverviewGroup`}
              >
                OverviewGroup
              </NavLink>
            </div>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
  );
}

export default Overview;