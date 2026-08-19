import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminAbout from "./pages/AdminAbout";
import AdminServices from "./pages/AdminServices";
import AdminTestimonials from "./pages/AdminTestimonials";
import AdminBlogs from "./pages/AdminBlogs";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import AdminBlogDetails from "./pages/AdminBlogDetails";
import EditBlog from "./pages/EditBlog";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-[#F9F1E4] flex flex-col">

        <Navbar />

        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/about" element={<ProtectedRoute><AdminAbout /></ProtectedRoute>} />
            <Route path="/dashboard/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
            <Route path="/dashboard/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
            <Route path="/dashboard/blogs" element={<ProtectedRoute><AdminBlogs/></ProtectedRoute>} />
            <Route path="/dashboard/blogs/create" element={<ProtectedRoute><CreateBlog/></ProtectedRoute>} />
            <Route path="/dashboard/blogs/:id" element={<ProtectedRoute><AdminBlogDetails /></ProtectedRoute>} />
            <Route path="/dashboard/blogs/:id/edit" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
          </Routes>
        </main>

        <Footer />

      </div>

    </BrowserRouter>
  );
}

export default App;