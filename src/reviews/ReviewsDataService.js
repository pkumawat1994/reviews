import { Api } from "../config/Api";
import DataService from "../config/DataService";

const addReviews = (data) => {
    return DataService.post(Api.Reviews,data)
      .then((result) => result)
      .catch((er) => er);
  };

  const getReviews = () => {
    return DataService.get(Api.Reviews)
      .then((e) => e)
      .catch((e) => console.log(e));
  };

  const getReviewsById = (id) => {
    return DataService.get(`${Api.Reviews}/${id}`)
      .then((e) => e)
      .catch((e) => console.log(e));
  };

  const updateReviews = (id,data) => {
    return DataService.put(`${Api.Reviews}/${id}`,data)
      .then((e) => e)
      .catch((e) => console.log(e));
  };
  

  const deleteReviews = (id) => {
    return DataService.delete(`${Api.Reviews}/${id}`)
      .then((res) => res)
      .catch((e) => console.log(e));
  };
  export {getReviews,deleteReviews,getReviewsById,updateReviews,addReviews}