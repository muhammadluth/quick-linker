export interface IFormShortLink {
    urlName: string;
    url: string;
}

export interface IResponseGetShortLink {
    base_url: string;
    total_data: number;
    short_link_data: IShortLink[] | [];
}

export interface IShortLink {
    id: string;
    name: string;
    sourceLink: string;
    destinationLink: string;
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

export interface IPagination {
    totalData: number | undefined,
    totalPage: number
    sizePerPage: number
    page: number
    paginationSize: number
    handlePage: (mode: string) => void
    handleSelectedPage: (currentPage: number) => void
}