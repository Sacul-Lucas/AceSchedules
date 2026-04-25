import { PanelSidebar } from "../Sidebar/PanelSidebar";
import { DefineApp } from "../Utils/DefineApp";
import { Outlet } from "react-router-dom";

import appAdminIcon from "../../../assets/icons/admin-alt-solid.svg";

export const AdminLayout = () => {
  return (
    <DefineApp appIcon={appAdminIcon} appTitle="Ace Schedules - Painel administrativo">
      <PanelSidebar visible={true} isFixed canAnimate={false}>
        <main className="w-full">
          <Outlet />
        </main>
      </PanelSidebar>
    </DefineApp>
  );
};
