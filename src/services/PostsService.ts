import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import { useCollection, useCollectionData, useCollectionOnce, useDocumentData, useDocumentDataOnce } from "react-firebase-hooks/firestore"
import { IPost } from '../models/IPost'
import { IFirebaseError } from '../models/IFirebaseError'
import { db } from '../firebase/firebase'



export const postsAPI = createApi({
    reducerPath:"postsAPI",
    baseQuery: fakeBaseQuery<IFirebaseError>(),
    tagTypes:['Post'],
    endpoints: build => ({
        addPost: build.mutation({
            async queryFn({id, profileEmail, postMessage, postId, postedOn, likes, posterAvatar=""}:IPost){
                await addDoc(collection(db, "posts"), {
                    postId,
                    id,
                    profileEmail,
                    postMessage,
                    postedOn,
                    likes,
                    posterAvatar
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
    const q = query(collection(db, "posts"), orderBy("postedOn", "desc"));
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