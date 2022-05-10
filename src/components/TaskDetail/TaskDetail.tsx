import React from "react";
import { observer } from "mobx-react";
import { useParams, useNavigate } from "react-router-dom";

import taskStore from "store/TaskStore";

const TaskDetail: React.FC = () => {

    const navigate = useNavigate();
    const params = useParams();
    const targetTaskId = Number(params.taskId);
    const tasks = taskStore.tasks;
    const task = tasks.find(task => task.taskId === targetTaskId);
    const taskText = task?.title || '-';
    const status = task?.complete ? 'complete' : 'active';

    const goBackHandle = () => {
        navigate(-1);
    };

    return (
        <div>
            <h1>TASK DETAIL:</h1>
            <h2>TASK STATUS: {task ? status : '-'}</h2>
            <h2>TASK TEXT: {taskText}</h2>
            <h2>env: {process.env.REACT_APP_TEST}</h2>
            <button onClick={() => goBackHandle()}>Back</button>
        </div>
    );
};

export default observer(TaskDetail);
