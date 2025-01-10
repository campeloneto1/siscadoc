import { ROUTES } from "@/router/router";
import { createContext, ReactNode, useContext, useState } from "react";

interface BreadcrumbContextType {
  breadcrumb: Array<any>;
  updateBreadcrumb: (breadcrumb: any) => void;
}

const UseBreadcrumb = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
  const [breadcrumb, setBreadcrumb] = useState<Array<any>>([
    {
      label: "Início",
      path: ROUTES.HOME,
    },
  ]);

  const updateBreadcrumb = (breadcrumb: any) => {
    setBreadcrumb(breadcrumb);
  };

  return (
    <UseBreadcrumb.Provider
      value={{
        breadcrumb,
        updateBreadcrumb,
      }}
    >
      {children}
    </UseBreadcrumb.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(UseBreadcrumb);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
