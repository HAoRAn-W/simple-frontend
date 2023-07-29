import { Pagination } from "@mui/material";

function PaginationBar({ currentPage, setCurrentPage, total }) {
  
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", paddingTop: "5px" }}
    >
      <Pagination
        count={total} // Total number of pages
        page={currentPage} // Currently active page
        onChange={handlePageChange} // Event handler for page change
        color="primary" // Change color if desired
        size="large" // Change size if desired
      />
    </div>
  );
}

export default PaginationBar;