import React from "react";
import { useSearchParams } from "react-router-dom";
import cn from "classnames";
import { observer } from "mobx-react";

import filterStore, { StatusType } from "store/FilterStore";
import { FILTER_ALL, FILTER_COMPLETE, FILTER_ACTIVE } from "store/FilterStore";
import styles from "./filterPanel.module.scss";

interface IFilterPanel {
    onChange: (filterStatus: StatusType) => void
}

const FilterPanel: React.FC<IFilterPanel> = ({ onChange }) => {

    const [_searchParams, setSearchParams] = useSearchParams();
    const status = filterStore.filterData.status;

    const handleClick = (filterStatus: StatusType) => {
        if (filterStatus === status) {
            return;
        }
        setSearchParams({ status: filterStatus, page: '1' });
        onChange(filterStatus);
    };

    const buttonActive = cn(styles.filter__button, { [styles.activeButton]: status === FILTER_ACTIVE });
    const buttonComplete = cn(styles.filter__button, { [styles.activeButton]: status === FILTER_COMPLETE });
    const buttonAll = cn(styles.filter__button, { [styles.activeButton]: status === FILTER_ALL });

    return (
        <section className={styles.filter}>
            <button className={buttonActive} onClick={() => handleClick(FILTER_ACTIVE)}> Active </button>
            <button className={buttonComplete} onClick={() => handleClick(FILTER_COMPLETE)}> Complete </button>
            <button className={buttonAll} onClick={() => handleClick(FILTER_ALL)}> All </button>
        </section>
    );
};

export default observer(FilterPanel);