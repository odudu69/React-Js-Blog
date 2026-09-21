import { useParams, Link, useNavigate} from "react-router-dom"
import {useContext} from "react"
import DataContext from './context/DataContext'
import api from "./api/posts"

const PostPage = () => {
    
    const {posts, setPosts} = useContext(DataContext)
    const {id} = useParams() 
    const post = posts.find((post) => post.id == id)
    const navigate = useNavigate()

    const handleDelete = async(id) => {
        try{
            await api.delete(`/posts/${id}`)
            const newList = posts.filter((post) => post.id !== id)
            setPosts(newList)
            navigate("/")
        }catch(err){
            console.log(`Error: ${err.message}`)
        }
    }
    
    return(
        <main>
                { post ? 
                    (<article>
                        <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    
                    <Link to={`/edit/${id}`}><button>Edit</button></Link>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </article>        
                    )
                : <p>Deleted</p>
            }
           
        </main>
    )
}
export default PostPage