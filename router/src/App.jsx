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
    const {width} = useWindowSize()
    const {data, fetchError, isLoading} = useAxiosFetch("http://localhost:3900/posts")

  
    useEffect(() => {
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
    }, [])

    return (
        <>
            
            <Header title="React Js Blog" />
            <DataProvider>
            <Nav/>
            <Routes>
                <Route path="/" element = {<Home />}/>     
                <Route path="/post" element = {<NewPost /> } />
                <Route path="/post/:id" element = {<PostPage />}  />
                <Route path="/edit/:id" element = {<EditPost/> }/>
                <Route path="/about" element =  {<About/>} />
                <Route path="*" element = {<Missing/>} />
            </Routes>
            </DataProvider>
            <Footer/>
            
        </>
    )
}
export default App