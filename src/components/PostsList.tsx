import { FC } from "react"
import { IPost } from "../models/IPost"
import PostItem from "./PostItem"

interface IPostsListProps {
  posts: IPost[]
}

const PostsList: FC<IPostsListProps> = ({ posts }) => {
  return (
    <>
      {posts?.map(post => 
        <PostItem key={post.postId} post={post} />
      )}
    </>
  )
}

export default PostsList
