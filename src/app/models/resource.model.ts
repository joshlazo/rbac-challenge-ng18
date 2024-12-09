export interface Resource {
    id: number;
    name: string;
    year: number;
    color: string;
    pantone_value: string;
}

export interface Pagination {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
}

export interface SupportInfo {
    url: string;
    text: string;
}

export interface ResourceResponse {
    data: Resource[];
    support: SupportInfo;
    pagination: Pagination;
}