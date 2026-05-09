import { DefineApp } from "../Utils/DefineApp";

import appAdminIcon from "../../../assets/icons/admin-alt-solid.svg";
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children
}) => { 
  return (
    <DefineApp appIcon={appAdminIcon} appTitle="Ace Schedules - Painel administrativo">
      <main>
        {children}
      </main>
    </DefineApp>
  );
};
