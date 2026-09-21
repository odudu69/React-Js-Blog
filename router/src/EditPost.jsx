import { useState,useContext, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import DataContext from "./context/DataContext"
import { useNavigate } from "react-router-dom"
import api from "./api/posts"

const EditPost = () => {
    const {posts, setPosts} = useContext(DataContext)
    const {id} = useParams()
    const post = posts.find(post => (post.id).toString() === id)
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const navigate = useNavigate()

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

    useEffect(() => {
        if(post){
            setEditBody(post.body)
            setEditTitle(post.title)
        }
    }, [post, setEditTitle, setEditBody])

    return (
        <>
           {editTitle &&
            <>
                <h2>Edit Post</h2>
                <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="Edit Title">Title</label>
                    <input
                        type = "text"
                        required
                        value = {editTitle}
                        onChange = {(e) => setEditTitle(e.target.value)}
                    />

                    <label htmlFor = "Edit Body">Body</label>
                    <input
                        type = "text"
                        required
                        value = {editBody}
                        onChange = {(e) => setEditBody(e.target.value)}
                    />              
                    <button type="submit" onClick={() => handleEdit(post.id)}>DONE</button>
                </form>
            </>
           }
           {!editTitle && 
            <>
                <h2>Post Not Found</h2>
                <p>Well, that's disappointing</p>
                <p>
                    <Link to="/">Visit Our Homepage</Link>
                </p>
            </>
           }
        </>
    )
}
export default EditPost