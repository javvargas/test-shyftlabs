import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import ListStudents from "./pages/ListStudents";
import AddCourse from "./pages/AddCourse";
import ListCourses from "./pages/ListCourses";
import AddResult from "./pages/AddResult";
import ListResults from "./pages/ListResults";

const App = () => {
  return (
    <section className="flex gap-6 bg-white">
      <Sidebar />
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/listStudents" element={<ListStudents />} />
          <Route path="/addCourse" element={<AddCourse />} />
          <Route path="/listCourses" element={<ListCourses />} />
          <Route path="/addResult" element={<AddResult />} />
          <Route path="/listResults" element={<ListResults />} />
      </Routes>
    </section>
  );
};

export default App;