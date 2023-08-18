import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import "./Reviews.css";
import * as Yup from "yup";
import Roll from 'react-reveal/Roll';
import { Formik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addReviews, updateReviews } from "./ReviewsDataService";

const ReviewsSchema = Yup.object().shape({
  reviewTitle: Yup.string().required("Required"),
  reviewText: Yup.string().required("Required"),
  userId: Yup.string().required("Required"),
  rating: Yup.string(),
});

const ReviewsForm = () => {
  const { state } = useLocation();
  let navigate = useNavigate();

  const initialValues = {
    reviewTitle: state?.editObj ? state?.editObj?.reviewTitle : "",
    reviewText: state?.editObj ? state?.editObj?.reviewText : "",
    userId: state?.editObj ? state?.editObj?.userId : "",
    rating: state?.editObj ? state?.editObj?.rating : "",
  };
  console.log(initialValues, "Init");

  const handleFormSubmit = (values, { setSubmitting }) => {
    let addButton = document.getElementsByName("add-review-btn");
    console.log("addButton", addButton[0]?.name);

    if (addButton[0]?.name == "add-review-btn") {
      // Perform add action
      addReviews(values).then((res) => {
        console.log(124,res)
        if (res.status == 201) {
          toast.success("Created SuccessFully");
          navigate("/");
          setSubmitting(false);
        }
      });
    } else {
      let id = state?.editObj?.id;
      updateReviews(id, values).then((res) => {
        if (res?.status == 200) {
          toast.success("Updated SuccessFully");
          navigate("/");
          setSubmitting(false);
        }
      });
    }
  };

  return (
    <div className="main-div">
      <h1 className="form-heading">Let Gives Reviews</h1>

      <Grid container sx={{ margin: "auto", width: "30%" }}>
        <Grid sm={12} md={12} lg={12}>
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
                    error={errors.reviewTitle}
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
                  <Roll  bottom collapse ><div className="err">{errors.reviewTitle &&
                    touched.reviewTitle &&
                    errors.reviewTitle}
                    </div></Roll >
                  <TextField
                    error={errors.reviewText}
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
                  <Roll  bottom collapse ><div className="err"> {errors.reviewText && touched.reviewText && errors.reviewText}</div></Roll >

                  <TextField
                    error={errors.userId}
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
                  <Roll  bottom collapse ><div className="err">{errors.userId && touched.userId && errors.userId}</div></Roll >

                  <Rating
                    precision={0.5}
                    name="rating"
                    fullWidth
                    className="Text-input"
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
      </Grid>
    </div>
  );
};

export default ReviewsForm;
