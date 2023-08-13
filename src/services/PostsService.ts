import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../main'
import { useCollection, useCollectionData, useCollectionOnce, useDocumentData, useDocumentDataOnce } from "react-firebase-hooks/firestore"
import { IPost } from '../models/IPost'
import { IFirebaseError } from '../models/IFirebaseError'



export const postsAPI = createApi({
    reducerPath:"postsAPI",
    baseQuery: fakeBaseQuery<IFirebaseError>(),
    tagTypes:['Post'],
    endpoints: build => ({
        addPost: build.mutation({
            async queryFn({id, profileEmail, postMessage, postId, postedOn, likes}:IPost){
                await addDoc(collection(db, "posts"), {
                    postId,
                    id,
                    profileEmail,
                    postMessage,
                    postedOn,
                    likes
                  })
                  return {data: {}}
            }, invalidatesTags:['Post']
            
        }),
        addLike: build.mutation({
            async queryFn({id}){
                const q = query(collection(db, "posts"), where("postId", "==", id))
                const snapshot = await getDocs(q)
                const prevLikes = snapshot.docs[0].data().likes;
                await updateDoc(doc(db, "posts", snapshot.docs[0].id), {
                    likes: prevLikes + 1
                })
                return {data: {}}
            }, invalidatesTags:['Post']
        })
       
    })
})


export function useGetPostsQuery() {
    const q = collection(db, "posts");
    const [data] = useCollectionData(q);
    const posts = data as IPost[] | undefined
    return posts;
  }
export function useGetUserPostsQuery(id:string){
    const q = query(collection(db, "posts"), where("id", "==", id))
    const [data] = useCollectionData(q);
    const posts = data as IPost[] | undefined
    return posts
}
//export async function useGetDocIdByPostId(id:number){
//    const q = query(collection(db, "posts"), where("postId", "==", id))
//    const snapshot = await getDocs(q)
//    return snapshot?.docs[0].id
//}