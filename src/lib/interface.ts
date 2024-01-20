export interface IFormShortLink {
    urlName: string;
    url: string;
}

export interface IResponseGetShortLink {
    base_url: string | null;
    short_link_data: IShortLink[] | [];
}

export interface IShortLink {
    id: string | null;
    name: string | null;
    sourceLink: string | null;
    destinationLink: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
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