import { ObjectId } from "mongoose";

export interface UserEntity {
    _id?: ObjectId,
    name: string,
    email: string,
    password: string,
    role: 'user' | 'admin' | 'company',
    phoneNumber?: number,
    isBlocked?: boolean,
    resume?: string,
    skills?: string[],
    experiences?: {
        title: string,
        description: string,
        image: string,
        location: string,
    }[],
    personalSite?: string,
    socailLinks?: string,
    coverImage?: string,
    icon?: string,
    location?: string,
    about?: string,
    education?: {
        university: string; // corrected spelling
        course: string;
        year: { from: Date; to: Date };
        description: string;
    }[],
    profileCompleted?: boolean
    dateofbirth?: Date,
    currengDesignation?: String,
    resumes?: string[],
    stage?: string,
    savedJobs?: string[],
    certification?:{title:string,file:string}[]
}