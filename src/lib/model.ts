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


export type TablePaginationType = {
    totalData: number | undefined,
    totalPage: number
    sizePerPage: number
    page: number
    paginationSize: number
    handlePage: (mode: string) => void
    handleSelectedPage: (currentPage: number) => void
}


export type ShortLinkUIContextType = {
    base_url: string | undefined;
    total_data: number | undefined;
    data: IShortLink[] | undefined;
    loading: boolean,
    dataSelected: IShortLink | undefined;
    handleResetData: () => void
    setLoading: Dispatch<SetStateAction<boolean>>
    setDataSelected: Dispatch<SetStateAction<IShortLink | undefined>>
}