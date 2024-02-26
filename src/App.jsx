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
import AdminUser from './Pages/Dashboard/AdminUser'
import UserCreateForm from './Pages/Dashboard/UserCreateForm'
import { Toaster } from 'sonner'
import UserEditForm from './Pages/Dashboard/UserEditForm'
import AdminPostPage from './Pages/Dashboard/AdminPostPage'
import PostCreateForm from './Pages/Dashboard/PostCreateForm'
import PostUpdateForm from './Pages/Dashboard/PostUpdateForm'

function App() {
 
  return (
    <>
     <Toaster position='bottom-right' expand={false} richColors  />
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
        <Route path='/dashboard/user' element={<AdminUser />} />
        <Route path='/dashboard/user/create' element={<UserCreateForm />} />
        <Route path='/dashboard/user/edit/:id' element={<UserEditForm />} />
        <Route path='/dashboard/post' element={<AdminPostPage />} />
        <Route path='/dashboard/post/create' element={<PostCreateForm />} />
        <Route path='/dashboard/post/update/:id' element={<PostUpdateForm />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
