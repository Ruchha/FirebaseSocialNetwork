import { FC } from "react"
import { IPost } from "../models/IPost"
import Post from "./Post"

interface IPostsListProps {
  posts: IPost[]
}

const PostsList: FC<IPostsListProps> = ({ posts }) => {
  return (
    <div>
      {posts?.map(post => 
        <Post key={post.postId} post={post} />
      )}
    </div>
  )
}

export default PostsList
