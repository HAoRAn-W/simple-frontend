import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadpage } from "../app/slices/page";

function PaginationBar() {
  const handlePageChange = (event, page) => {
    // Handle page change here
    setCurrentPage(page);
    console.log(`Navigating to page ${page}`);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const pageInfo = useSelector((state) => state.page);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(currentPage);
    dispatch(loadpage({ page: currentPage - 1 }));
  }, [currentPage, dispatch]);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", paddingTop: "5px" }}
    >
      <Pagination
        count={pageInfo.total} // Total number of pages
        page={currentPage} // Currently active page
        onChange={handlePageChange} // Event handler for page change
        color="primary" // Change color if desired
        size="large" // Change size if desired
      />
    </div>
  );
}

export default PaginationBar;
