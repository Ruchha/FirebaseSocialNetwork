import { FC } from 'react'
import { useParams } from 'react-router-dom';
import { useGetUserPostsQuery } from '../services/PostsService';
import { useGetUser } from '../services/UserService';
import {Container, Card, CardContent, Grid, Avatar, Typography, Divider, IconButton} from "@mui/material"
import { getDate } from '../utils/getDate';
import { Favorite, Comment } from "@mui/icons-material"

const Profile :FC = () => {
    const {profileName} = useParams();
    const user = useGetUser(profileName!)
    const posts = useGetUserPostsQuery(profileName!);


  return (
    <Container>
      <Card sx={{mt:2, mb:2}}>
      <CardContent>
        <Typography variant="h5" component="div">
          Информация о профиле
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Email: {user?.email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Имя: {user?.firstName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Фамилия: {user?.lastName}
        </Typography>
      </CardContent>
    </Card>
            {posts?.map((post) => (
        <Card key={post.postId} sx={{ mb:2 }}>
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
                  <Typography variant="subtitle2">
                    {getDate(post.postedOn)}
                  </Typography>
                </Grid>
              </Grid>
              <div>
                <IconButton>
                  <Favorite />
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
export default Profile