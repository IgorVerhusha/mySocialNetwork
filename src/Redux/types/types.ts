export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string|null
    fullName: string
    contacts: contactsType
    photos:photosType
aboutMe: string
}
export type contactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type photosType = {
    small: string | null
    large: string | null
}

export type userType = {
    name: string
    id: number
    photos: photosType
    status: string | null
    followed: boolean
}

export type setProfileAvatarActionType = {
    type: any;
    profileAvatarPath: string;
};

export type postsType = {
    post: string
    id: number
    likesCount: number
}