import { Button } from "@mui/base"
import {
  Avatar,
  Card,
  CardContent,
  Container,
  IconButton,
  TextareaAutosize,
  Typography,
  Divider,
  Grid,
} from "@mui/material"
import { Favorite, Comment } from "@mui/icons-material"
import { useState, FC } from "react"
import { useAppSelector } from "../hooks/redux"
import { getProfileName } from "../utils/getProfileName"
import "firebase/firestore"
import { postsAPI, useGetPostsQuery } from "../services/PostsService"
import { Link } from "react-router-dom"
import { serverTimestamp } from "firebase/firestore"
import { getDate } from "../utils/getDate"

const Home: FC = () => {
  const [post, setPost] = useState("")
  const [addPost] = postsAPI.useAddPostMutation()
  const [addLike] = postsAPI.useAddLikeMutation()
  const posts = useGetPostsQuery()
  const user = useAppSelector((state) => state.userReducer)
  async function handlePost() {
    addPost({
      id: user.id,
      profileEmail: user.email,
      postMessage: post,
      postId: Date.now(),
      postedOn: serverTimestamp(),
      likes:0
    })
    setPost("")
  }


  return (
    <Container sx={{mt:5}}>
      {user.id && (
        <form>
          <Typography variant="h4">Написать пост</Typography>
          <TextareaAutosize
            style={{ width: "100%", height: "100px" }}
            value={post}
            onChange={e => setPost(e.target.value)}
          />
          <Button onClick={handlePost}>Опубликовать</Button>
        </form>
      )}
      {posts?.map((post) => (
        <Card key={post.postId} sx={{ marginBottom: "16px" }}>
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="flex-start"
                spacing={1}
              >
                <Grid item>
                  <Avatar sx={{ marginRight: "8px" }} src={post.avatar} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    <Link
                      style={{ textDecoration: "none", color: "inherit" }}
                      to={post.id}
                    >
                      @{getProfileName(post.profileEmail)}
                    </Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2">
                    {getDate(post.postedOn)}
                  </Typography>
                </Grid>
              </Grid>
              <div>
                <IconButton onClick={() => addLike({id: post.postId})}>
                 {post.likes} <Favorite />
                </IconButton>
                <IconButton>
                  <Comment />
                </IconButton>
              </div>
            </div>
            <Divider />
            <Typography variant="body1">{post.postMessage}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  )
}
export default Home

