import { FieldValue } from "firebase/firestore";

export interface IPost {
    postId: number;
    id: string;
    profileEmail: string;
    postMessage: string;
    postedOn: FieldValue;
    likes: number;
}