import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Blog from './Pages/Blog'
import Scholarship from './Pages/Scholarship'
import Course from './Pages/Course'
import Contact from './Pages/Contact'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import PostDetail from './Pages/PostDetail'
import CourseDetail from './Pages/CourseDetail'
import Dashboard from './Pages/Dashboard/Dashboard'

function App() {
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/scholarship" element={<Scholarship />} />
        <Route path="/course" element={<Course />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/postDetail" element={<PostDetail />} />
        <Route path="/courseDetail" element={<CourseDetail />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
