"use client";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";

const ShopAllOrders = ({ isDashboard,ordersData, sellerId }: { isDashboard: boolean,ordersData:any ; sellerId:any}) => {
 //  console.log("sellerId page" , sellerId)
 //  console.log("ordersData page" , ordersData[0]?.user?.email )
  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "email", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Prompt Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
              return (
                <a href={`mailto:${params.row.email}`}>
                  <AiOutlineMail
                    className="dark:text-white text-white"
                    size={20}
                  />
                </a>
              );
            },
          },
        ]),
  ];

  const rows: any = [];

  ordersData?.forEach((order: any) => {
 
  console.log("orders data" , order?.user?.email)
    rows.push({
      id: order?.id,
      name: order?.user?.firstName || "N/A", // Seller's name
      email: order?.user?.email  || "N/A", // Seller's email
      title: order?.Prompts?.name || "N/A",
      price: `RS ${order?.Prompts?.price || 0}`,
      created_at: format(order?.createdAt),
    });
  });
  return (
    <Box m={`${!isDashboard && "20px"}`}>
      <Box
        m={`${!isDashboard && "40px 0 0 0"}`}
        height={isDashboard ? "38vh" : "90vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            outline: "none",
          },
          "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
            color: "#fff",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "#fff",
          },
          "& .MuiDataGrid-row": {
            color: "#fff",
            borderBottom: "1px solid #ffffff30!important",
          },
          "& .MuiTablePagination-root": {
            color: "#fff",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none!important",
          },
          "& .name-column--cell": {
            color: "black",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "black",
            borderBottom: "none",
            color:"black",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "#1F2A40",
          },
          "& .MuiDataGrid-footerContainer": {
            color: "dark",
            borderTop: "none",
            backgroundColor: "#3e4396",
          },
          "& .MuiCheckbox-root": {
            color: `#b7ebde !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `#fff !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection={isDashboard ? false : true}
          rows={rows}
          columns={columns}
          slots={isDashboard ? {} : { toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ShopAllOrders;