import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadpage, loadpagebycategory } from "../app/slices/page";

function PaginationBar({ pos = 0, id }) {
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const pageInfo = useSelector((state) => state.page);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pos === 0) {
      dispatch(loadpage({ page: currentPage - 1 }));
    } else if (pos === 1) {
      // from category
      dispatch(loadpagebycategory({ categoryId: id, page: currentPage - 1 }));
    } else if (pos === 2) {
      //from tag
    } else if (pos === 3) {
      // from favorite
      
    }
  }, [currentPage, dispatch, pos, id]);

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