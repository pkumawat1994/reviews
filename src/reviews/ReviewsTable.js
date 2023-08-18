import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import "./Reviews.css";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Jello from 'react-reveal/Jello';
import { deleteReviews, getReviews, getReviewsById } from "./ReviewsDataService";

export default function ReviewsTable() {
  const [row, setRow] = React.useState([]);
  console.log(row, "rows");
  let navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getAllReviews = () => {
    getReviews()
      .then((res) => setRow(res.data))
      .catch((er) => console.log(er));
  };

  const handleAction = async (action) => {
    if (action === "Delete") {
      const res = await deleteReviews(editId);
      if (res.status == 200) {
        toast.error("Deleted Successdfully");
        getAllReviews();
        handleClose();
      }
    }

    if (action === "Edit") {
      getReviewsById(editId).then((re) => {
        if (re.status == 200) {
          navigate("/reviews-form", { state: { editObj: re.data } });
        }
      });
    }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "reviewTitle", headerName: "Review Title", width: 130 },
    { field: "reviewText", headerName: "Review Text", width: 200 },
    { field: "userId", headerName: "User ID", width: 170 },
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
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={(e) => handleClick(e, params?.id)}
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
           
          >
            <MenuItem onClick={() => handleAction("Edit")}>Edit</MenuItem>
            <MenuItem onClick={() => handleAction("Delete")}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    getAllReviews();
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
    <div className="table-main">
      <div className="reviews-btn">
        <Link to="/reviews-form">
          <Button variant="contained">Give Reviews</Button>
        </Link>
      </div>

      <Jello><Box className="table-wrapper">
    <DataGrid
          rows={row}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          
          getRowId={(row) => row?.id}
        />
         
      </Box></Jello>
    </div>
  );
}
