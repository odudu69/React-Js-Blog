import {createContext, useState, useEffect} from "react"
import useAxiosFetch from "../hooks/useAxiosFetch"

const DataContext = createContext({})

export const DataProvider = ({children}) => {
        const [searchResult, setSearchResult] = useState("")
        const [search, setSearch] = useState("")
        const [posts, setPosts] = useState([])
        // const [fetchError, setFetchError] = useState(null)
        const {data, fetchError, isLoading} = useAxiosFetch("http://localhost:3900/posts")
    
        useEffect (() => {
            setPosts(data)
        }, [data])

        useEffect (() => {
        const filteredResult = posts.filter(post => 
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase())
        )
        setSearchResult(filteredResult.reverse())
         }, [posts, search])

    return(
        <DataContext.Provider value = {{
            search, setSearch, searchResult, fetchError, isLoading,
            
            posts,setPosts,
            
        }}>
         {children}
        </DataContext.Provider>
    )
}
export default DataContext