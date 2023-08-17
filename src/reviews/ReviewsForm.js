import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import "./Reviews.css";
import * as Yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import dataService from "../config/DataService";
import { postReviews } from "./ReviewsDataService";

const ReviewsSchema = Yup.object().shape({
  reviewTitle: Yup.string().required("Required"),
  reviewText: Yup.string().required("Required"),
  userId: Yup.string().required("Required"),
  rating: Yup.string(),
});

const ReviewsForm = () => {
  const { state } = useLocation();
  let navigate = useNavigate();
  console.log(147, state);

  const initialValues = {
    reviewTitle: state?.editObj ? state?.editObj?.reviewTitle : "",
    reviewText: state?.editObj ? state?.editObj?.reviewText : "",
    userId: state?.editObj ? state?.editObj?.userId : "",
    rating: state?.editObj ? state?.editObj?.rating : "",
  };
  console.log(initialValues, "Init");

  const handleFormSubmit = (values, { setSubmitting}) => {

    let updateButton = document.getElementsByName("update-review-btn");
    let addButton = document.getElementsByName("add-review-btn");
      console.log("addButton",addButton[0]?.name);
    if (addButton[0]?.name == "add-review-btn") {
      // Perform add action
      axios.post("https://e-shop-com.onrender.com/reviews", values).then((res) => {
        if (res.status == 201) {
          toast.success("Created SuccessFully");
          navigate("/");
        }
      });

      // dataService.post(values).then((res)=>{
      //   console.log("rrre",res)
      //   if (res?.status == 201) {
      //         toast.success("Created SuccessFully");
      //         navigate("/");
      //       }
      // })
    } else {
      let id = state?.editObj?.id;
      dataService.put(`${id}`, values).then((res) => {
        if (res?.status == 200) {
         
          toast.success("Updated SuccessFully");
          navigate("/");
          setSubmitting(false)
        }
      });
    }
  };

  return (
    <div className="main-div" >
      <h1>Let Gives Reviews</h1>

      <Grid container sx={{ margin: "auto", width: "50%" }}>
        <Grid sm={12} md={6} lg={6}>
          <Box className="form-box">
            <Formik
              initialValues={initialValues}
              validationSchema={ReviewsSchema}
              onSubmit={handleFormSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <TextField
                error={errors.reviewTitle }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.reviewTitle}
                    fullWidth
                    className="Text-input"
                    type="text"
                    label="Review Title"
                    variant="outlined"
                    id="review-title"
                    name="reviewTitle"
                  />
                  <br />
                  {errors.reviewTitle &&
                    touched.reviewTitle &&
                    errors.reviewTitle}
                  <TextField
                error={errors.reviewText }

                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.reviewText}
                    fullWidth
                    className="Text-input"
                    multiline
                    label="Review Text"
                    rows={4}
                    id="review-text"
                    name="reviewText"
                    cols={50}
                  ></TextField>
                  <br />
                  {errors.reviewText && touched.reviewText && errors.reviewText}

                  <TextField
                error={errors.userId }

                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.userId}
                    fullWidth
                    className="Text-input"
                    type="text"
                    label="userId"
                    variant="outlined"
                    id="user-id"
                    name="userId"
                  />
                  <br />
                  {errors.userId && touched.userId && errors.userId}

                  <Rating
                    precision={0.5}
                    name="rating"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.rating}
                  />
                  <br />
              

                  {state?.editObj ? (
                    <Button
                      type="submit"
                      fullWidth
                      value="update-review-btn"
                      name="update-review-btn"
                      className="Text-input"
                      disabled={isSubmitting}
                      variant="contained"
                    >
                      Update Review
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      fullWidth
                      value="add-review-btn"
                      name="add-review-btn"
                      className="Text-input"
                      disabled={isSubmitting}
                      variant="contained"
                    >
                      Submit Review
                    </Button>
                  )}
                </form>
              )}
            </Formik>
          </Box>
        </Grid>
        <Grid sm={12} md={6} lg={6}></Grid>
      </Grid>
    </div>
  );
};

export default ReviewsForm;
