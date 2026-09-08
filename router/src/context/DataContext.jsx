import {createContext, useState, useEffect} from "react"
import api from "../api/posts"
import useWindowSize from "../hooks/useWindowSize"
import useAxiosFetch from "../hooks/useAxiosFetch"
import { useNavigate } from "react-router-dom"

const DataContext = createContext({})

export const DataProvider = ({children}) => {

        const [postTitle, setPostTitle] = useState("")
        const [postBody, setPostBody] = useState("")
        const [editTitle, setEditTitle] = useState("");
        const [editBody, setEditBody] = useState("");
        const [searchResult, setSearchResult] = useState("")
        const [search, setSearch] = useState("")
        const [posts, setPosts] = useState([])
        // const [fetchError, setFetchError] = useState(null)
        const navigate = useNavigate()
        const {width} = useWindowSize()
        const {data, fetchError, isLoading} = useAxiosFetch("http://localhost:3900/posts")
    
        useEffect (() => {
            setPosts(data)
        }, [data])

        useEffect (() => {
        const filteredResult = posts.filter(post => 
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase())
        )
        setSearchResult(filteredResult.reverse())
         }, [posts, search])

         const handleDelete = async(id) => {
                 await api.delete(`/posts/${id}`)
                 const newList = posts.filter((post) => post.id !== id)
                 setPosts(newList)
                 setTimeout(() => {
                     navigate("/")
                 }, 500)
             }
         
             const handleEdit = async(id) => {
                 const datatime = ""
                 const updatedPost = {id, title:editTitle, datatime, body:editBody}
                 try{
                     const response = await api.put(`/posts/${id}`, updatedPost)
                     setPosts(posts.map(post => post.id == id ? {...response.data} : post))
                     setEditTitle("")
                     setEditBody("")
                     navigate("/")
                 }catch(err){
                      console.log("Error: ${err.message}")
                 }
             }
         
             const handleSubmit = async() => {
                 e.preventDefault();
                 const id = posts.length ? posts[posts.length - 1].id + 1 :1
                 const datatime = " ";
                 const newPost = {id, title:postTitle, datatime, body:postBody}
                 try{
                     const response = await api.post("/posts", newPost)
                     const allPost = [...posts, response.data]
                     setPosts(allPost);
                     setPostTitle(" ");
                     setPostBody(" ");
                     navigate("/");
                 }catch(err){
                     console.log("Error: ${err.message}")
                 }  
             }

    return(
        <DataContext.Provider value = {{
            width
        }}>
         {children}
        </DataContext.Provider>
    )
}
export default DataContext