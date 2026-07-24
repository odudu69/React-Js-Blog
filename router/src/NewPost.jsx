const NewPost = ({postTitle, postBody, handleSubmit, setPostTitle, setPostBody}) => {
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