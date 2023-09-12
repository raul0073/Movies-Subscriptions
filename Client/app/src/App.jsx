import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import EntryPage from "./Pages/Entry/EntryPage";
import MainPage from "./Pages/Main/MainPage";
import AccessDeniedPage from "./Pages/Errors/403";
import FeedComp from "./Components/Feed/Feed";
import MoviePage from "./Pages/Main/Movie/AddMoviePage";
import EditMoviePage from "./Pages/Main/Movie/EditMoviePage";
import MembersPage from "./Pages/Main/Members/MembersPage";
import MemberPage from "./Pages/Main/Members/EditMemberPage";
import AddMemberPage from "./Pages/Main/Members/AddMember";

function App() {
  return (
    <Routes>
      {/* entry page */}
      <Route path="/" element={<EntryPage />} />
      {/* access denied */}
      <Route path="/403" element={<AccessDeniedPage />} />
      {/* protected routes "/main" */}
      <Route
        path="/main"
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
      >
        <Route index element={<FeedComp />} />
        <Route path="search/:movie" element={<FeedComp />} />
        <Route path="movie/add" element={<MoviePage />} />
        <Route path="movie/edit/:id" element={<EditMoviePage />} />
        <Route path="members" element={<MembersPage />} />
        <Route path="members/:id" element={<MemberPage />} />
        <Route path="member/add" element={<AddMemberPage />} />
      </Route>
    </Routes>
  );
}

// private route to check user is verified and wrap all main routes
const PrivateRoute = ({ children }) => {
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // check session obj
    const sessionObj = sessionStorage.getItem("SESSION");
    // if exists, user is verified
    if (sessionObj) {
      setIsLoggedIn(true);
      return;
    } else {
      // look for local storage object if there
      const localObj = localStorage.getItem("isValid");
      // if not then user is kicked out
      if (!localObj) {
        nav("/403");
      } else {
        const parsedLocalObj = JSON.parse(localObj);
        const storedDate = new Date(parsedLocalObj.date);
        const currentDate = new Date();
        const thirtyDaysAgo = new Date(currentDate);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        let daysPasted = Math.round((currentDate - storedDate) / (1000 * 60 * 60 * 24));
        if (storedDate < thirtyDaysAgo) {
          return nav("/403");
        } else {
          setIsLoggedIn(true);
        }
      }

    }
  }, [nav]);

  return isLoggedIn ? children : <p>We could not verify you...</p>;
};

export default App;
