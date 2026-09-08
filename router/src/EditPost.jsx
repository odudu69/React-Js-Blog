import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"

const EditPost = ({posts, handleEdit, editTitle, editBody, setEditTitle, setEditBody}) => {

    const {id} = useParams()
    const post = posts.find(post => (post.id).toString() === id)

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