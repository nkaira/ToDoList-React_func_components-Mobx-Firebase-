
import { useEffect } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { observer } from "mobx-react";

import ToDoList from "components/ToDoList/ToDoList";
import TaskDetail from "components/TaskDetail/TaskDetail";
import filterStore, { StatusType } from "store/FilterStore";
import taskStore from 'store/TaskStore';
import { getDataFirebase } from "firebaseDB/firebaseInteractions";
import styles from "./app.module.scss";

const App = () => {

    const [searchParams] = useSearchParams();

    const setTasks = async () => {
        const tasksData: any = await getDataFirebase('tasks');
        taskStore.setTask(tasksData)
    };

    useEffect(() => {

        setTasks();

        const currentPage: string | null = searchParams.get('page');

        if (currentPage) {
            filterStore.setPage(Number(currentPage));
        };

        const status: string | null = searchParams.get('status');

        if (status) {
            filterStore.setFilterStatus(status as StatusType);
        };
    }, []);

    return (
        <div className={styles.header}>
            <h1 className={styles.title}>To Do List</h1>
            <Routes>
                <Route path='/' element={<ToDoList />} />
                <Route path='/:taskId' element={<TaskDetail />} />
            </Routes>
        </div>
    );
};

export default observer(App);
