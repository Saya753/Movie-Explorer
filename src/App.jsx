import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Explorer from "./pages/Explorer";
import MovieDetail from "./pages/MovieDetail";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function App() {
  return (
    <Routes>
      {/* public layout */}
      <Route
        path="/"
        element={
          <Layout>
            <Explorer />
          </Layout>
        }
      />

      <Route
        path="/movie/:id"
        element={
          <Layout>
            <MovieDetail />
          </Layout>
        }
      />

      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />

      {/* protected route */}
      <Route
        path="/watchlist"
        element={
          <Layout>
            <ProtectedRoute>
              <Watchlist />
            </ProtectedRoute>
          </Layout>
        }
      />

      {/* fallback */}
      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  );
}
