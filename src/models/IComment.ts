import { FieldValue } from "firebase/firestore";

export interface IComment{
    posterId: string;
    posterEmail: string;
    commentId: number;
    commentMessage: string;
    commentedOn: FieldValue;
    postId: number;
}