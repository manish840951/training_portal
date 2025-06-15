import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './header';
import About from './about';
import Content from './content';
import Courses from './courses';


function App() {
  return (
    <Router>
        <Header/> 
        <div>
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/courses" element={<Courses/>} />
            <Route path="/courses/:id" element={<Courses />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
    </Router>

  );
}


export default App;





