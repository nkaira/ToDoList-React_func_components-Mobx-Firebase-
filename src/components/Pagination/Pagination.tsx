import React from "react";
import { observer } from "mobx-react";
import { useSearchParams } from "react-router-dom";

import PaginationButton from "./PaginationButton";
import { IPagination } from "Interface/IPagination";
import filterStore from "store/FilterStore";

const Pagination: React.FC<IPagination> = ({ onClick, filteredTasks }) => {

    const [_searchParams, setSearchParams] = useSearchParams();
    const { status, pageSize } = filterStore.filterData;
    const pageNumbers: Array<number> = [];
    const page = Math.ceil(filteredTasks.length / pageSize);

    for (let i = 1; i < page + 1; i++) {
        pageNumbers.push(i);
    };

    const handleClick = (currentPage: number) => {
        const page = currentPage.toString();
        setSearchParams({ page, status });
        onClick(currentPage);
    };

    return (
        <>
            {filteredTasks.length > pageSize &&
                <PaginationButton
                    onClick={handleClick}
                    pageNumbers={pageNumbers}
                />
            }
        </>
    );
};

export default observer(Pagination);