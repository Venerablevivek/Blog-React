import Header from "./components/Header";
import Blogs from "./components/Blogs";
import Pagination from "./components/Pagination";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import "./App.css"
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import Home from "./Pages/Home";
import TagPage from "./Pages/TagPage";
import CategoryPage from "./Pages/CategoryPage";
import BlogPage from "./Pages/BlogPage";

export default function App() {

  const {fetchData} = useContext(AppContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect( ()=>{
    const page = searchParams.get("page") ?? 1;

    if(location.pathname.includes("tags")) {
      //means tag wala page show karna hai
      const tag  = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchData(Number(page),tag)
    }else if(location.pathname.includes("categories")){
      const category = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchData(Number(page),null,category);
    }else{
      fetchData(Number(page));
    }
  },[location.pathname, location.search])

  return (
    // <div className="w-full  h-full flex flex-col gap-y-1 justify-center items-center " >
    //   <Header/>
    //   <Blogs/>
    //   <Pagination/>
    // </div>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/blogs/:blogId" element={<BlogPage/>} />
      <Route path="/tags/:tag" element={<TagPage/>} />
      <Route path="/categories/:category" element={<CategoryPage/>} />
    </Routes>
  );
}
