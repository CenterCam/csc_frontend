import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
import React from 'react'
import { useLocation } from "react-router-dom";

export default function MyPagination({links,total,current}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get("search") || "all";
  const sortBy = queryParams.get("sortBy") || "name";
  const sortDir = queryParams.get("sortDir") || "desc";
  const page =  queryParams.get("page") || 1;
  return (
    <>
        <div className="w-full">
          {
            <div className="flex gap-6">
              <p className="flex">Total: {current} items of {total}</p>
            </div>
          }
        </div>
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href={`/dashboard/user?search=${search}&&sortBy=${sortBy}&&sortDir=${sortDir}&&page=${1}`} />
                </PaginationItem>
                <PaginationItem>
                {
                  links?.map((item, i) => (
                    i > 0 && i < links.length-1 && ( 
                      <PaginationLink key={i}  href={`/dashboard/user?search=${search}&&sortBy=${sortBy}&&sortDir=${sortDir}&&page=${i.toFixed(0)}`} >{item.label}</PaginationLink>
                    )
                  ))
                }
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href={`/dashboard/user?search=${search}&&sortBy=${sortBy}&&sortDir=${sortDir}&&page=${links?.length-2}`}  />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </>
  )
}
