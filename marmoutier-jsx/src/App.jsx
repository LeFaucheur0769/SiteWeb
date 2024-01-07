import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendarAdmin from "./components/calendarAdmin.jsx";
import { NotMatch } from "./components/visual/NoMatch.jsx";
import Dashboard from "./components/authentification/Dashboard.jsx";
import Preferences from "./components/authentification/preferences.jsx";
import LogPage from "./components/authentification/logPage.jsx";
import Register from "./components/authentification/Register.jsx";
import Home from "./components/home.jsx";
import CalendarGuides from "./components/calendarGuides.jsx";
import Timetable_guide from "./components/timetable.jsx";

const App = () => {

  return (
    <div style={styles.app
    }>
      <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LogPage/>} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/preferences" element={<Preferences/>}/>
          <Route path="/admin" element={<CalendarAdmin/>}/>
          <Route path="*" element={<NotMatch />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/guides" element={<CalendarGuides/>}/>
          <Route path="/guide_timetable" component={<Timetable_guide/>} />
        </Routes>
      </Router>
      </div>
    </div>
  );
};

export default App;

const styles = {
  app: {
    padding: 50,
  },
};



