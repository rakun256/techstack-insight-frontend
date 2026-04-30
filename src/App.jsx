import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Skills from "./pages/Skills";
import Companies from "./pages/Companies";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetail />} />
        <Route path="skills" element={<Skills />} />
        <Route path="companies" element={<Companies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}