import { FC } from "react"
import { Container } from "@mui/material"
import { useAppSelector } from "../hooks/redux"
import "firebase/firestore"
import { useGetPostsQuery } from "../services/PostsService"
import PostsList from "../components/PostsList"
import PostForm from "../components/PostForm"

const Home: FC = () => {

  const posts = useGetPostsQuery()
  const user = useAppSelector(state => state.userReducer)

  return (
    <Container sx={{mt:5}}>
      {user.id && <PostForm/>}
      <PostsList posts={posts!}/>
    </Container>
  )
}
export default Home

