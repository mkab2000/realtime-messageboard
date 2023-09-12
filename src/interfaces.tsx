export interface iMessage {
    action: string;
    data: iPost;
} 

export interface iPost {
    _id: string;
    title: string;
    content: string;
    comments: iComment[];
    createdAt: string;
    updatedAt: string;
}

export interface iComment {
    text: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
}