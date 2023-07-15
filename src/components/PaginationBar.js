import { Pagination } from "@mui/material";
import React from "react";

function PaginationBar() {
  const handlePageChange = (event, page) => {
    // Handle page change here
    console.log(`Navigating to page ${page}`);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: "5px"}}>
      <Pagination
        count={10} // Total number of pages
        page={1} // Currently active page
        onChange={handlePageChange} // Event handler for page change
        color="primary" // Change color if desired
        size="large" // Change size if desired
      />
    </div>
  );
}

export default PaginationBar;
