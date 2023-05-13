import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import DetailBook from './pages/DetailBook';
import DeleteBook from './pages/DeleteBook';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
          <Route path="/view/:id" element={<DetailBook />} />
          <Route path="/delete/:id" element={<DeleteBook />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
