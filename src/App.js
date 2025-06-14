import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './header';
import About from './about';
import Content from './content';
import Progress from './progress';
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
            <Route path="/progress" element={<Progress />} />
            <Route path="/about" element={<About />} />
            <Route path="/callback" element={<div>Processing login...</div>} />
          </Routes>
        </div>
        {/* <Footer />  */}
    </Router>

  );
}


export default App;





