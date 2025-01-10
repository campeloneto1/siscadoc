import { Outlet, useNavigate } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SdcSidebar } from "@/containers/SdcSidebar/SdcSidebar";
import { useBreadcrumb } from "@/hooks/UseBreadcrumb";

export const MainLayout = () => {
  const { breadcrumb } = useBreadcrumb();
  const navigate = useNavigate();

  const changeRoute = (url: string) => {
    navigate(url);
  };
  return (
    <SidebarProvider>
      <SdcSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumb.map((item, index) => {
                  return (
                    <>
                      {index > 0 ? (
                        <BreadcrumbSeparator className="hidden md:block" />
                      ) : undefined}
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink
                          className="cursor-pointer"
                          onClick={() => changeRoute(item.path)}
                        >
                          {item.label}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
