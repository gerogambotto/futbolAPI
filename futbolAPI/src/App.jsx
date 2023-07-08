import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage.jsx";
import { TeamPage } from "./pages/TeamPage/TeamPage.jsx";
import { DataProvider } from "./components/DataContext/dataContext.jsx";
function App() {
  return (
    <DataProvider value={[]}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/team/:id" element={<TeamPage />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
