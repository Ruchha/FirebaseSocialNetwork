import { Paper, Slide } from '@mui/material';
import {FC, useRef, useState} from 'react';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';
import { IComment } from '../models/IComment';

interface ICommentsList{
  postId: number
  comments: IComment[]
  checked: boolean
}

const CommentsList: FC<ICommentsList> = ({postId, comments, checked}) => {

  const containerRef = useRef(null);
    return (
    
    <Paper style={{ padding: "40px 20px" }} ref={containerRef}>
      {comments?.map(comment => 
        <CommentItem comment={comment} key={comment.commentId}/>
        )}
        <Slide direction='up' in={checked} container={containerRef.current}  mountOnEnter unmountOnExit>
          <div><CommentForm postId={postId}/></div>
        </Slide>
    </Paper>
          
      
);
};

export default CommentsList