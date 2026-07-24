import { useParams, Link } from "react-router-dom"


const PostPage = ({posts, handleDelete}) => {

    const {id} = useParams() 
    const post = posts.find((post) => post.id == id)

    return(
        <main>
                { post ? 
                    (<article>
                        <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    <button onClick={() => handleDelete(post.id)}>Delete</button>
                    </article>        
                    )
                : <p>No available post</p>
            }
           
        </main>
    )
}
export default PostPage