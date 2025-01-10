import { UsuariosAPI } from "@/api";
import { useBreadcrumb } from "@/hooks/UseBreadcrumb";
import { UsuariosResponse } from "@/interfaces/Usuario";
import { ROUTES } from "@/router/router";
import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";

import { Plus } from "lucide-react";

const Usuarios = () => {
  const { updateBreadcrumb } = useBreadcrumb();
  const [usuariosresponse, setUSuariosResponse] = useState<
    UsuariosResponse | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);

  const getUsuarios = async (page?: string) => {
    setLoading(true);
    const response = await UsuariosAPI.index(page);
    if (response) {
      setUSuariosResponse(response);
      setLoading(false);
    }
  };

  const changePage = (url: string | null) => {
    const page = url?.split("page=");
    getUsuarios(page![1]);
  };

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
    if (!usuariosresponse) {
      getUsuarios();
    }
  });

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <Button variant="outline">
          Cadastrar
          <Plus />
        </Button>

        <Input className="w-96" type="search" placeholder="Pesquisar..." />
      </div>
      <Table>
        <TableCaption>Lista dos usuários do sistema.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>CPF</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Telefone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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
          {loading && (
            <>
              <TableRow>
                <TableCell colSpan={5}>
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5}>
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5}>
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5}>
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={5}>
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>
              {`Exibindo de ${usuariosresponse?.meta.from} à ${usuariosresponse?.meta.to} de ${usuariosresponse?.meta.total}, ${usuariosresponse?.meta.per_page} por página`}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Pagination>
        <PaginationContent>
          {usuariosresponse && (
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => changePage(usuariosresponse.links.prev)}
              />
            </PaginationItem>
          )}

          {usuariosresponse &&
            usuariosresponse?.meta.links.map((item, index) => {
              // Renderiza os itens que não são o primeiro ou o último
              if (
                index !== 0 &&
                index !== usuariosresponse.meta.links.length - 1
              ) {
                return (
                  <PaginationItem key={index}>
                    <PaginationLink
                      className="cursor-pointer"
                      isActive={item.active}
                      onClick={() => changePage(item.url)}
                    >
                      {item.label}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              return null; // Retorna null se não for o item válido para renderizar
            })}
          {usuariosresponse && (
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() => changePage(usuariosresponse.links.next)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Usuarios;
