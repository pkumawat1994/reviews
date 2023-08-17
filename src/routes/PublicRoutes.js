import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Reviews from '../reviews/Reviews';
import ReviewsForm from '../reviews/ReviewsForm';
import ReviewsTable from '../reviews/ReviewsTable';

const PublicRoutes = () => {
  return (
    <div>
      <Routes>
        <Route  path="/"  element={<ReviewsTable/>}  />
        <Route  path="/reviews-form"  element={<ReviewsForm/>}  />
      </Routes>
    </div>
  );
}

export default PublicRoutes;
