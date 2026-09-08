import { useParams, Link } from "react-router-dom"


const PostPage = ({posts, handleDelete, handleEdit}) => {

    const {id} = useParams() 
    const post = posts.find((post) => post.id == id)

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