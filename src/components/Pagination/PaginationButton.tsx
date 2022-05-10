import React from "react";
import { observer } from "mobx-react";
import cn from "classnames";

import { IPaginationButton } from "Interface/IPagination";
import filterStore from "store/FilterStore";
import styles from "./pagination.module.scss";

const PaginationButton: React.FC<IPaginationButton> = ({ onClick, pageNumbers }) => {

    const currentPage = filterStore.filterData.currentPage;

    return (
        <nav className={styles.container}>
            {pageNumbers.map(number => (
                <button key={number} className={cn(styles.button, { [styles.activeButton]: Number(currentPage) === number })} onClick={() => onClick(number)}>
                    {number}
                </button>
            ))
            }
        </nav>
    );
};

export default observer(PaginationButton);