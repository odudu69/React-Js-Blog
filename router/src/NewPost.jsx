import {useContext,useState} from "react"
import DataContext from './context/DataContext'
import { useNavigate } from "react-router-dom"
import api from "./api/posts"
 
const NewPost = () => {
    const [postTitle, setPostTitle] = useState("")
    const [postBody, setPostBody] = useState("")
    const {posts, setPosts} = useContext(DataContext)
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
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
        <main>
            <h1>New Post</h1>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                 required
                 type="text" 
                 value={postTitle}
                 onChange={(e) => setPostTitle(e.target.value)}
                />

                <label htmlFor = "postBody">Body:</label>
                <textarea
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                    />
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}
export default NewPost