import { useBreadcrumb } from "@/hooks/UseBreadcrumb";
import { ROUTES } from "@/router/router";
import { useEffect } from "react";

const Home = () => {
  const { updateBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    updateBreadcrumb([
      {
        label: "Início",
        path: ROUTES.HOME,
      },
    ]);
  }, [window.location.pathname]);
  return <h1>Início</h1>;
};

export default Home;
