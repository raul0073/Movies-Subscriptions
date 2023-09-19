import { useState } from "react";
import EntryPage from "./Views/Entry/Entry";
import { Route, Routes } from "react-router-dom";
import AccessErrorPage from "./Views/403/AccessError";
import HomePage from "./Views/Home/Home";
import AllMoviesComp from "./Views/Movies/AllMovies";
import PrivateRoute, { verifyUser } from "./Utilities/Auth/routeProtector";
import EditMoviePage from "./Views/Movies/EditMovie";
import AddMoviePage from "./Views/Movies/AddMovie";
import AllMembersPage from "./Views/Members/AllMembers";
import AddMemberPage from "./Views/Members/AddMember";
import EditMemberPage from "./Views/Members/EditMember";

function App() {
  return (
    <>
      <Routes>
        {/* entry page */}
        <Route path="/" element={<EntryPage />} />
        {/* access denied */}
        <Route path="/403" element={<AccessErrorPage />} />
        {/* protected routes "/main" */}
        
        <Route
          path="/home"
          element={
            <PrivateRoute verifyUser={verifyUser}>
              <HomePage />
            </PrivateRoute>
          }
        >
          <Route index element={<AllMoviesComp />} />
          <Route path="/home/movie/edit/:id" element={<EditMoviePage />} />
          <Route path="/home/movie/add" element={<AddMoviePage />} />
          <Route path="/home/members" element={<AllMembersPage />} />
          <Route path="/home/members/add" element={<AddMemberPage />} />
          <Route path="/home/members/edit/:id" element={<EditMemberPage />} />
          <Route path='/home/search?/:movie' element={<AllMoviesComp />} />
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
