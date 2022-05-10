import { makeAutoObservable } from "mobx";

export const FILTER_COMPLETE = 'FILTER_COMPLETE';
export const FILTER_ACTIVE = 'FILTER_ACTIVE';
export const FILTER_ALL = 'FILTER_ALL';

export type StatusType = typeof FILTER_ALL | typeof FILTER_COMPLETE | typeof FILTER_ACTIVE

export interface FilterDataType {
    status: StatusType;
    currentPage: number;
    pageSize: number;
}

class FilterStore {
    constructor() {
        makeAutoObservable(this)
    }

    private _filterData: FilterDataType = {
        status: FILTER_ALL,
        currentPage: 1,
        pageSize: 3,
    }
    get filterData() {
        return this._filterData;
    }

    setFilterStatus(status: StatusType) {
        this._filterData.status = status;
    }

    setPageStatus() {
        this._filterData.status = FILTER_ALL;
        this._filterData.currentPage = 1;
    }

    setPage(page: number) {
        this._filterData.currentPage = page;
    }
};

export default new FilterStore();