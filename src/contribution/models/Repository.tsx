export interface IRepository {
    id: string;
    name: string;
    description: string;
    url: string;
    updated_at: string;
    languages: IRepositoryLanguage[];
}

export interface IRepositoryLanguage {
    type: string;
    size: number;
}