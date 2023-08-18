import { Button, TextareaAutosize, Typography } from '@mui/material';
import {FC, useState} from 'react';
import { useAppSelector } from '../hooks/redux';
import { serverTimestamp } from 'firebase/firestore';
import { postsAPI } from '../services/PostsService';

const PostForm: FC = () => {
    const [post, setPost] = useState<string>("")
    const [addPost] = postsAPI.useAddPostMutation()
    const user = useAppSelector(state => state.userReducer)
    async function handlePost() {
      addPost({
        id: user.id,
        profileEmail: user.email,
        postMessage: post,
        postId: Date.now(),
        postedOn: serverTimestamp(),
        likes:0,
      })
      setPost("")
    }
  
    return (
        <form>
          <Typography variant="h4">Написать пост</Typography>
          <TextareaAutosize
            style={{ width: "100%", height: "100px" }}
            value={post}
            onChange={e => setPost(e.target.value)}
          />
          <Button onClick={handlePost}>Опубликовать</Button>
        </form>
);
};

export default PostForm