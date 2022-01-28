import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from './App.module.css';
import Header from "./Components/Header";
import Recommed from './Pages/Recommed';
import CategoryPage from './Pages/CategoryPage';

import MainStation from "./Pages/MainStation"
import OtherStation from "./Pages/OtherStation"

require('./mock.js')



function App() {
  return (
    <Router>
      <div className={styles.App}>
        <Header />

        <Routes>
          <Route exact path="/" element={<MainStation />}>
            <Route path="" element={<Recommed />} />
            <Route path="science/category/:name" element={<CategoryPage />} />
          </Route>
          <Route path="/:name" element={<OtherStation />} >
            <Route path="" element={<CategoryPage />}/>
          </Route>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
