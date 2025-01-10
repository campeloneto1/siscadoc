import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface SdcPaginationProps {
  previos: string | null;
  pages: any;
  next: string | null;
  changePage: (url: string) => void;
}

const SdcPagination = ({
  previos,
  pages,
  next,
  changePage,
}: SdcPaginationProps) => {
  return (
    <Pagination>
      <PaginationContent>
        {previos && (
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => changePage(previos)}
            />
          </PaginationItem>
        )}

        {pages &&
          pages.map((item, index) => {
            // Renderiza os itens que não são o primeiro ou o último
            if (index !== 0 && index !== pages.length - 1) {
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
        {next && (
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() => changePage(next)}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default SdcPagination;
