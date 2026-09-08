import Header from "./Header"
import Nav from "./Nav"
import Footer from "./Footer"
import Home from "./Home"
import NewPost from "./NewPost"
import About from "./About"
import Missing from "./Missing"
import PostPage from "./PostPage"
import EditPost from "./EditPost"
import Post from "./Post"
import './Appp.css'
import { Routes, Route } from "react-router-dom"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import api from "./api/posts"
import useWindowSize from "./hooks/useWindowSize"
import useAxiosFetch from "./hooks/useAxiosFetch"
import {DataProvider} from "./context/DataContext"

const App = () => {
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
    /*useEffect(() => {
        const fetchPosts = async() =>{
            try{
                const response = await api.get('/posts')
                console.log(response.data)
                if(response && response.data) setPosts(response.data)
            } catch (err) {
                if(err.message){
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.headers)
                    console.log("A")
                }else{
                    console.log("B")
                    console.log(`Error: ${err.message}`)
                }
            }
        }
        fetchPosts()
    }, [])*/

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

    useEffect (() => {
        const filteredResult = posts.filter(post => 
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase())
        )
        setSearchResult(filteredResult.reverse())
    }, [posts, search])

    return (
        <>
            <DataProvider>
            <Header title="React Js Blog" />
            <Nav search={search} setSearch={setSearch}/>
            <Routes>
                <Route path="/" element = {<Home 
                    posts = {searchResult}
                    fetchError = {fetchError}
                    isLoading = {isLoading}
                />}/>     
                <Route path="/post" element = {<NewPost 
                    handleSubmit = {handleSubmit} 
                    postTitle = {postTitle} 
                    postBody = {postBody}
                    setPostTitle = {setPostTitle}
                    setPostBody =  {setPostBody}
                />  
                } />
                <Route path="/post/:id" element = {<PostPage
                     posts = {posts} 
                     handleDelete={handleDelete}
                     handleEdit={handleEdit}
                     />} 
                     />
                <Route path="/edit/:id" element = {<EditPost 
                    posts = {posts}
                    handleEdit = {handleEdit}
                    editTitle = {editTitle}
                    editBody = {editBody}
                    setEditTitle = {setEditTitle}
                    setEditBody = {setEditBody}
                     />
                     }/>
                <Route path="/about" element =  {<About/>} />
                <Route path="*" element = {<Missing/>} />
            </Routes>
            <Footer/>
            </DataProvider>
        </>
    )
}
export default App