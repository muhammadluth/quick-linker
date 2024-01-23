import { Dispatch, SetStateAction } from "react";

export interface IFormShortLink {
    urlName: string;
    url: string;
}

export type ResponseGetShortLinkType = {
    base_url: string;
    total_data: number;
    short_link_data: IShortLink[];
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


export type ModalDeleteType = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    dataSelected: IShortLink
}

export type ModalUpdateType = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    dataSelected: IShortLink
}

export type UpdateType = {
    dataSelected: IShortLink
}


export type TablePaginationType = {
    totalData: number,
    totalPage: number
    sizePerPage: number
    page: number
    paginationSize: number
    handlePage: (mode: string) => void
    handleSelectedPage: (currentPage: number) => void
}


export type ShortLinkUIContextType = {
    baseUrl: string | undefined;
    totalData: number | undefined;
    sizePerPage: number | undefined;
    page: number | undefined;
    data: IShortLink[] | undefined;
    loading: boolean;
    handleResetData: () => void
    setLoading: Dispatch<SetStateAction<boolean>>
    setSizePerPage: Dispatch<SetStateAction<number>>
    setPage: Dispatch<SetStateAction<number>>
}