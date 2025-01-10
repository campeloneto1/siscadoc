import { UsuariosAPI } from "@/api";
import { useBreadcrumb } from "@/hooks/UseBreadcrumb";
import { UsuariosResponse } from "@/interfaces/Usuario";
import { ROUTES } from "@/router/router";
import { useEffect, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SdcPagination from "@/components/SdcPagination/SdcPagination";
import SdcTable from "@/components/SdcTable/SdcTable";
import { debounce } from "lodash";

const Usuarios = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [usuariosresponse, setUSuariosResponse] = useState<
    UsuariosResponse | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const getUsuarios = async (page?: string) => {
    setLoading(true);
    const pagenumber = page ? page : "1";
    const response = await UsuariosAPI.index(pagenumber, search);
    if (response) {
      setUSuariosResponse(response);
      setLoading(false);
    }
  };

  const changePage = (url: string | null) => {
    const page = url?.split("page=");
    getUsuarios(page![1]);
  };

  const searching = (value: string) => {
    setSearch(value);
  };

  // Função de busca com debounce
  const debouncedSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      searching(event.target.value.toLocaleLowerCase());
    },
    300
  ); // 300ms de debounce

  const tableheader = ["#", "Nome", "CPF", "E-mail", "Telefone 1"];

  useEffect(() => {
    updateBreadcrumb([
      {
        label: "Início",
        path: ROUTES.HOME,
      },
      {
        label: "Usuários",
        path: ROUTES.USUARIOS,
      },
    ]);
  }, [window.location.pathname]);

  useEffect(() => {
    if (search) {
      getUsuarios("1"); // Chama a função de busca após o debounce
    }
  }, [search]); // Monitorando a mudança no search

  useEffect(() => {
    if (!usuariosresponse) {
      getUsuarios("1");
    }
  }, [usuariosresponse]);

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <Button variant="outline">
          Cadastrar
          <Plus />
        </Button>

        <Input
          onChange={debouncedSearch}
          className="w-96"
          type="search"
          placeholder="Pesquisar..."
        />
      </div>
      {!loading && usuariosresponse && (
        <SdcTable
          text="Lista dos usuários do sistema."
          header={tableheader}
          infos={{
            from: usuariosresponse.meta.from,
            to: usuariosresponse.meta.to,
            total: usuariosresponse.meta.total,
            per_page: usuariosresponse.meta.per_page,
          }}
          loading={loading}
        >
          {!loading &&
            usuariosresponse &&
            usuariosresponse.data.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell className="font-medium">{usuario.id}</TableCell>
                <TableCell>{usuario.nome}</TableCell>
                <TableCell>{usuario.cpf}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.telefone1}</TableCell>
              </TableRow>
            ))}
        </SdcTable>
      )}

      {usuariosresponse && (
        <SdcPagination
          changePage={changePage}
          next={usuariosresponse.links.next}
          previos={usuariosresponse.links.prev}
          pages={usuariosresponse.meta.links}
        />
      )}
    </div>
  );
};

export default Usuarios;
