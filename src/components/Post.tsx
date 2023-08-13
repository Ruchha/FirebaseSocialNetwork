import { Avatar, Card, CardContent, Divider, Grid, IconButton, Typography } from "@mui/material"
import { FC } from "react"
import { Link } from "react-router-dom"
import { getProfileName } from "../utils/getProfileName"
import { getDate } from "../utils/getDate"
import { postsAPI } from "../services/PostsService"
import { Comment, Favorite } from "@mui/icons-material"
import { IPost } from "../models/IPost"
import { useDownloadURL } from "react-firebase-hooks/storage"
import { ref } from "firebase/storage"
import { storage } from "../firebase/firebase"

interface IPostProps {
    post: IPost
}

const Post: FC<IPostProps> = ({post}) => {
const [addLike] = postsAPI.useAddLikeMutation()
const [avatarUrl] = useDownloadURL(ref(storage, `/userAvatars/${post.id}`))
  return (
    <Card sx={{ marginBottom: "16px" }}>
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
              <Avatar sx={{ marginRight: "8px" }} src={avatarUrl} />
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
            <IconButton onClick={() => addLike({ id: post.postId })}>
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
  )
}

export default Post
