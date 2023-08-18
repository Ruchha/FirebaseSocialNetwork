import { Button, TextField } from '@mui/material';
import {FC, useState} from 'react';
import { commentsAPI } from '../services/CommentsService';
import { serverTimestamp } from 'firebase/firestore';
import { useAppSelector } from '../hooks/redux';

interface ICommentFormProps{
    postId:number
}

const CommentForm: FC<ICommentFormProps> = ({postId}) => {

    const [comment, setComment] = useState<string>("")
    const [addComment] = commentsAPI.useAddCommentMutation()
    const user = useAppSelector(state => state.userReducer)
    function handleAdd(){
        addComment({
            commentId: Date.now(),
            commentedOn: serverTimestamp(),
            commentMessage: comment,
            posterEmail: user.email,
            posterId: user.id,
            postId
        })
    }
    return (
        <>
        <TextField
        label="Add a comment"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Submit
      </Button>
      </>
);
};

export default CommentForm