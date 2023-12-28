"use client";

import { cn } from "../../../../../lib/utils";
import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface PaginationProps {
    page: number;
    totalPages: number;
    pageSize: number; 
    pathname?: string;
  }

const Pagination = ({ page, totalPages, pageSize }: PaginationProps) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
  
    const setPageParam = useCallback(
      (name: string, value: number) => {
        const currentPage = searchParams.get("_page");
        if (Number(currentPage) === value) return;
  
        const params = new URLSearchParams();
        params.set(name, value.toString());
  
        router.replace(pathname + "?" + params.toString(), { scroll: false });
      },
      [searchParams, pathname, router]
    );

  
    return (
        <div className="flex items-baseline gap-8 pb-10">
            <div className="flex gap-4">
          <div className="flex gap-4">
            <Link
              href={{
                pathname: "/blogs",
                query: { _page: 1, _limit: pageSize },
              }}
              className={cn(
                "rounded-3xl border bg-[#065E35] lg:px-10 md:px-10 py-2 sm:px-18 text-green-100 hover:bg-[#B3E0CA] hover:text-[#065E33]",
                page === 1 && "pointer-events-none opacity-50"
              )}
              onClick={() => setPageParam("_page", 1)}
            >
              First
            </Link>
            <Link
              href={{
                pathname: "/blogs",
                query: { _page: page > 1 ? page - 1 : 1, _limit: pageSize },
              }}
              className={cn(
                "rounded-3xl border bg-[#065E35] lg:px-10 md:px-10 py-2 sm:px-18 text-green-100 hover:bg-[#B3E0CA] hover:text-[#065E33]",
                page === 1 && "pointer-events-none opacity-50"
              )}
              onClick={() => setPageParam("_page", page > 1 ? page - 1 : 1)}
            >
              Previous
            </Link>
            <Link
              href={{
                pathname: "/blogs",
                query: { _page: page + 1, _limit: pageSize },
              }}
              className={cn(
                "rounded-3xl border bg-[#065E35] lg:px-10 md:px-10 py-2 sm:px-18 text-green-100 hover:bg-[#B3E0CA] hover:text-[#065E33]",
                page >= totalPages && "pointer-events-none opacity-50"
              )}
              onClick={() => setPageParam("_page", page < totalPages ? page + 1 : totalPages)}
            >
              Next
            </Link>
            <Link
              href={{
                pathname: "/blogs",
                query: { _page: totalPages, _limit: pageSize },
              }}
              className={cn(
                "rounded-3xl border bg-[#065E35] lg:px-10 md:px-10 py-2 sm:px-18 text-green-100 hover:bg-[#B3E0CA] hover:text-[#065E33]",
                page === totalPages && "pointer-events-none opacity-50"
              )}
              onClick={() => setPageParam("_page", totalPages)}
            >
              Last
            </Link>
            </div>
            </div>
        </div>
      );
  };
  
  export default Pagination;
  