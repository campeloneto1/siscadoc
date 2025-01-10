"use client";

import * as React from "react";
import { Home, Users, Cog } from "lucide-react";

import { NavProjects } from "@/components/NacProjects/NavProjects";
import { NavUser } from "@/components/NavUser/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/UseAuth";
import { NavMain } from "@/components/NavMain/NavMain";
import { ROUTES } from "@/router/router";

// This is sample data.

export function SdcSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const data = {
    user: {
      name: user.nome,
      email: user.email,
      avatar: `https://ui-avatars.com/api/?name=${user.nome}`,
    },
    projects: [
      {
        name: "Início",
        url: ROUTES.HOME,
        icon: Home,
      },
      {
        name: "Usuários",
        url: ROUTES.USUARIOS,
        icon: Users,
      },
    ],
    navMain: [
      {
        title: "Administrador",
        url: "#",
        icon: Cog,
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
