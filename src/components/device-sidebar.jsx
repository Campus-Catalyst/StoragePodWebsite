import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  FolderOpen,
  Frame,
  GalleryVerticalEnd,
  Heart,
  Map,
  MonitorSpeaker,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
  Trash2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  
   
  fileexplorer: [
    {
      name: "Devices",
      url: "#",
      icon: MonitorSpeaker,
    },
    {
      name: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      name: "Trash Bin",
      url: "#",
      icon: Trash2,
    },
  ],
}

export function DeviceSideBar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.fileexplorer} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
