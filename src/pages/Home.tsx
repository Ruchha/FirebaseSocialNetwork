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
import { getAuth } from "firebase/auth"
import { getStorage, listAll, ref } from "firebase/storage"
import PostsList from "../components/PostsList"
import PostForm from "../components/PostForm"

const Home: FC = () => {

  const posts = useGetPostsQuery()
  const storage = getStorage()
  const user = useAppSelector(state => state.userReducer)

  return (
    <Container sx={{mt:5}}>
      {user.id && <PostForm/>}
      <PostsList posts={posts!}/>
    </Container>
  )
}
export default Home

