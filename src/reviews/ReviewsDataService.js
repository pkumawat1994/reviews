import { Api } from "../config/Api";
import dataService from "../config/DataService";

const postReviews = (data) => {
    return dataService.post(data)
      .then((e) => "Created Success")
      .catch((e) => console.log(e));
  };

  const getReviews = () => {
    return dataService.get()
      .then((e) => e.data)
      .catch((e) => console.log(e));
  };
  export {postReviews,getReviews}