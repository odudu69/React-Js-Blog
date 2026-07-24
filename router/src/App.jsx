import Header from "./Header"
import Nav from "./Nav"
import Footer from "./Footer"
import Home from "./Home"
import NewPost from "./NewPost"
import About from "./About"
import Missing from "./Missing"
import PostPage from "./PostPage"
import Post from "./Post"
import './Appp.css'
import { Routes, Route } from "react-router-dom"
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"


const App = () => {
    const [postTitle, setPostTitle] = useState("")
    const [postBody, setPostBody] = useState("")
    const [searchResult, setSearchResult] = useState("")
    const [search, setSearch] = useState("")
    const [posts, setPosts] = useState([
        {id:1, title:"My First Post", datatime:"July 01, 2021 11:17:36 AM", body:"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"},
        {id:2, title:"My Second Post", datatime:"May 01, 2011 21:02:22 PM", body:"BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"},
        {id:3, title:"My Third Post", datatime:"Febuary 12, 2077 15:55:93 AM", body:"CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"},
        {id:4, title:"My Fourth Post", datatime:"December 25, 2026 01:57:26 PM", body:"DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD"}
    ])
    const navigate = useNavigate()

    const handleDelete = (id) => {
        const newList = posts.filter((post) => post.id !== id)
        setPosts(newList)
        setTimeout(() => {
            navigate("/")
        }, 500)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 :1
        const datatime = " ";
        const newPost = {id, title:postTitle, datatime, body:postBody}
        const allPost = [...posts, newPost]
        setPosts(allPost);
        setPostTitle(" ");
        setPostBody(" ");
        navigate("/");
    }

    return (
        <>
            <Header title="React Js Blog"/>
            <Nav search={search} setSearch={setSearch}/>
            <Routes>
                <Route path="/" element = {<Home posts = {posts}/>}/>     
                <Route path="/post" element = {<NewPost 
                    handleSubmit = {handleSubmit} 
                    postTitle = {postTitle} 
                    postBody = {postBody}
                    setPostTitle = {setPostTitle}
                    setpostBody =  {setPostBody}
                />  
                } />
                <Route path="/post/:id" element = {<PostPage posts = {posts} handleDelete={handleDelete}/>} />
                <Route path="/about" element =  {<About/>} />
                <Route path="*" element = {<Missing/>} />
            </Routes>
            <Footer/>
        </>
    )
}
export default App;