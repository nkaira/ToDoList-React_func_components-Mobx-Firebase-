import React, { useState } from "react";
import { observer } from "mobx-react";

import Pagination from "components/Pagination/Pagination";
import FilterPanel from "components/FilterPanel/FilterPanel";
import ControlPanel from "components/ControlPanel/ControlPanel";
import TaskList from "components/TaskList/TaskList";
import Modal from "components/Modal/Modal";
import { ITask } from "Interface/ITask";
import { FILTER_ALL, FILTER_COMPLETE, FILTER_ACTIVE } from "store/FilterStore";
import taskStore from "store/TaskStore";
import filterStore, { StatusType } from "store/FilterStore";

export const ToDoList: React.FC = () => {

    const tasks = taskStore.tasks;
    const { currentPage, status, pageSize } = filterStore.filterData;
    const [inputValue, setInputValue] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [targetTaskId, setTargetTaskId] = useState<number | null>(null);

    const getFilteredTasks = (tasks: Array<ITask>): Array<ITask> => {
        if (status === FILTER_ALL) {
            return tasks;
        } else if (status === FILTER_ACTIVE) {
            return tasks.filter(task => {
                if (task.complete === false) {
                    return task;
                };
            });
        } else if (status === FILTER_COMPLETE) {
            return tasks.filter(task => {
                if (task.complete === true) {
                    return task;
                };
            });
        };
        return tasks;
    };

    const getPaginatedTasks = (filteredTasks: Array<ITask>): Array<ITask> => {
        const prevPage = currentPage - 1;
        const start = pageSize * prevPage;
        const end = start + pageSize;
        const paginatedItems = filteredTasks.slice(start, end);
        return paginatedItems;
    };

    const filteredTasks = getFilteredTasks(tasks);
    const paginatedTasks = getPaginatedTasks(filteredTasks);

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleAdd = () => {
        setInputValue('');
        taskStore.addTask(inputValue);
    };

    const handleDeleteAll = () => {
        taskStore.deleteAllTasks();
        filterStore.setPageStatus();
    };

    const handleCompleteAll = () => {
        taskStore.completeAllTasks();
    };

    const setCurrentPage = () => {
        const filteredTasks = getFilteredTasks(tasks);
        const paginatedTasks = getPaginatedTasks(filteredTasks);
        const page = (paginatedTasks.length - 1 === 0) ? currentPage - 1 : currentPage;
        filterStore.setPage(page);
    };

    const handleCompleteTask = (targetId: number) => {
        taskStore.completeTask(targetId);
        if (status === FILTER_ALL) {
            return;
        };
        setCurrentPage();
    };

    const handleModalShow = (targetId: number) => {
        setIsOpen(true);
        setTargetTaskId(targetId);
    };

    const handleModalCancel = () => {
        setIsOpen(false);
        setTargetTaskId(null);
    };

    const handleModalOk = () => {
        setCurrentPage();
        setIsOpen(false);
        setTargetTaskId(null);
        taskStore.removeTask((targetTaskId)!)
    };

    const handlePaginationButton = (page: number) => {
        filterStore.setPage(page);
    };

    const handleChangeFilter = (filterStatus: StatusType) => {
        filterStore.setFilterStatus(filterStatus);
        filterStore.setPage(1);
    };

    return (
        <div>
            <ControlPanel
                onAdd={handleAdd}
                onInput={handleInput}
                onDeleteAll={handleDeleteAll}
                onCompleteAll={handleCompleteAll}
                inputValue={inputValue}
            />
            <TaskList
                onModalShow={handleModalShow}
                paginatedTasks={paginatedTasks}
                onComplete={handleCompleteTask}
            />
            <Pagination
                filteredTasks={filteredTasks}
                onClick={handlePaginationButton}
            />
            <FilterPanel
                onChange={handleChangeFilter}
            />
            {isOpen &&
                <Modal
                    onCancel={handleModalCancel}
                    onOk={handleModalOk}
                />
            }
        </div>
    );
};

export default observer(ToDoList);