import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import PublicPetAdoptionHomepage from "pages/public-pet-adoption-homepage";
import AuthenticationLoginRegister from "pages/authentication-login-register";
import ShelterDashboard from "pages/shelter-dashboard";
import AddEditPetForm from "pages/add-edit-pet-form";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<PublicPetAdoptionHomepage />} />
          <Route path="/public-pet-adoption-homepage" element={<PublicPetAdoptionHomepage />} />
          <Route path="/authentication-login-register" element={<AuthenticationLoginRegister />} />
          <Route path="/shelter-dashboard" element={<ShelterDashboard />} />
          <Route path="/add-edit-pet-form" element={<AddEditPetForm />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;