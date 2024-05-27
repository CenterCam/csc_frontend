import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  
import React from 'react'
import { useLocation } from "react-router-dom";

export default function MyPagination({links,total,current,url}) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
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
                  <PaginationPrevious href={`${url}&&page=${1}`} />
                </PaginationItem>
                <PaginationItem>
                {
                  links?.map((item, i) => (
                    i > 0 && i < links.length-1 && ( 
                      <PaginationLink key={i}  href={`${url}&&page=${i.toFixed(0)}`} >{item.label}</PaginationLink>
                    )
                  ))
                }
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href={`${url}&&page=${links?.length-2}`}  />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    </>
  )
}
