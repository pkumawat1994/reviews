import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import "./Reviews.css";
import axios from "axios";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import dataService, { API_ENDPOINT } from "../config/DataService";
import { Api } from "../config/Api";

export default function ReviewsTable() {
  const [row, setRow] = React.useState([]);
  console.log(row, "rows");
  let navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getReviews = () => {
    // axios.get("http://localhost:5000/reviews").then((re) => setRow(re.data));
    dataService()
      .then((res) => setRow(res.data))
      .catch((er) => console.log(er));
  };

  const handleAction = async (action) => {
    if (action === "Delete") {
      const res = await dataService.delete(`/${editId}`);
      if (res.status == 200) {
        toast.error("Deleted Successdfully");
        getReviews();
        handleClose();
      }
      console.log(res, "resId");
    }

    if (action === "Edit") {
      dataService.get(`/${editId}`).then((re)=>{
        if(re.status==200){
          navigate("/reviews-form", { state: { editObj: re.data } });
        }
      })
    }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "reviewTitle", headerName: "Review Title", width: 130 },
    { field: "reviewText", headerName: "Review Text", width: 130 },
    { field: "userId", headerName: "User ID", width: 130 },
    {
      field: "rating",
      headerName: "Rating",
      width: 150,
      renderCell: (params) => (
        <Box component="span">
          <Rating
            precision={0.5}
            name="read-only"
            value={params.value}
            readOnly
          />
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={(e) => handleClick(e, params.id)}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: "10ch",
              },
            }}
          >
            <MenuItem onClick={() => handleAction("Edit")}>Edit</MenuItem>
            <MenuItem onClick={() => handleAction("Delete")}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    getReviews();
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [editId, setEditId] = React.useState();

  const open = Boolean(anchorEl);
  const handleClick = (event, id) => {
    console.log("idd", id);
    setEditId(id);
    setAnchorEl(event.currentTarget);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Link to="/reviews-form">
        <Button variant="contained">Give Reviews</Button>
      </Link>
      <Box className="table-wrapper">
        <DataGrid
          rows={row}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
          getRowId={(row) => row.id}
        />
      </Box>
    </div>
  );
}
