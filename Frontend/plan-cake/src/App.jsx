import { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'; // Note the use of Routes
import Home from './screens/Home';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link> | <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
