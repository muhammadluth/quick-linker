export interface IFormShortLink {
    urlName: string;
    url: string;
}

export interface IShortLink {
    id?: string;
    name: string;
    sourceLink: string;
    destinationLink: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISlugParams {
    params: {
        slug: string;
    };
}

export interface IIDParams {
    params: {
        id: string;
    };
}