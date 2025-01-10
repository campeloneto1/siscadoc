import {
  Table,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";
import { Skeleton } from "../ui/skeleton";

interface SdcTableProps {
  text: string;
  loading: boolean;
  header: Array<string>;
  children: ReactNode;
  infos: any;
}

const SdcTable = ({
  loading,
  header,
  children,
  infos,
  text,
}: SdcTableProps) => {
  return (
    <Table>
      <TableCaption>{text}</TableCaption>
      <TableHeader>
        <TableRow>
          {header.map((item) => {
            return <TableHead>{item}</TableHead>;
          })}
        </TableRow>
      </TableHeader>
      {!loading && children}
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
      <TableFooter>
        <TableRow>
          <TableCell colSpan={header.length}>
            {`Exibindo de ${infos.from} à ${infos.to} de ${infos.total}, ${infos.per_page} por página`}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default SdcTable;
