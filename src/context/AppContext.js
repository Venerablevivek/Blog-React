import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export default function AppContextProvider({children}){
    const [loading,setLoading] = useState(false);
    const [posts,setPosts] = useState([]);
    const [pages,setPages] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const navigate = useNavigate();

    async function fetchData(page=1, tag=null, category){
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;
        if(tag){
            url += `&tag=${tag}`;
        }
        if(category){
            url += `&category=${category}`;
        }
        try {
            const response  = await fetch(url);
            const result = await response.json();
            console.log(result);

            setPages(result.page);
            setPosts(result.posts);
            setTotalPages(result.totalPages);
        } catch (error) {
            console.log("Error in fetching the data :) TRY AGAIN");
            setPages(1);
            setPosts([]);
            setTotalPages(null);
        }

        setLoading(false);
    }

    function pageHandler(page){
        navigate( {search: `?page=${page}`} );
        setPages(page);
    }

    const value = {
        loading,
        setLoading,
        posts,
        setPosts,
        pages,
        setPages,
        totalPages,
        setTotalPages,
        fetchData,
        pageHandler
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}