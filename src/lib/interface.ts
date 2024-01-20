export interface IFormShortLink {
    urlName: string;
    url: string;
}

export interface IResponseGetShortLink {
    base_url: string;
    short_link_data: IShortLink[];
}

export interface IShortLink {
    id: string;
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