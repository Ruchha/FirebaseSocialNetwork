import { Avatar, Divider, Grid, Typography } from '@mui/material';
import {FC} from 'react';
import { IComment } from '../models/IComment';
import { useDownloadURL } from 'react-firebase-hooks/storage';
import { ref } from 'firebase/storage';
import { storage } from '../firebase/firebase';
import { getDate } from '../utils/getDate';
import { Link } from 'react-router-dom';

interface ICommentItemProps{
    comment: IComment
}

const CommentItem: FC<ICommentItemProps> = ({comment}) => {
    const [avatarUrl] = useDownloadURL(ref(storage, `/userAvatars/${comment.posterId}`))
    return (
        <>
        <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar src={avatarUrl} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Typography variant='h6' sx={{ margin: 0, textAlign: "left" }}><Link style={{ textDecoration: "none", color: "inherit" }} to={comment.posterId}>{comment.posterEmail}</Link></Typography>
          <Typography  sx={{ textAlign: "left" }}>
            {comment.commentMessage}
          </Typography>
          <p style={{ textAlign: "left", color: "gray" }}>
            {getDate(comment.commentedOn)}
          </p>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </>
);
};

export default CommentItem