import { makeAutoObservable } from "mobx";

import { ITask } from 'Interface/ITask';
import { setUserDataFirebase, updateDataFirebase } from 'firebaseDB/firebaseInteractions';

class TaskStore {
    constructor() {
        makeAutoObservable(this)
    }

    private _tasks: Array<ITask> = [];
    get tasks() {
        return this._tasks;
    }

    addTask(inputValue: string) {
        this._tasks.push({
            taskId: Date.now(),
            title: inputValue,
            complete: false,
        });
        setUserDataFirebase('tasks', this._tasks);
    }

    setTask(payload: Array<ITask>) {
        const tasks = payload;
        this._tasks = tasks;
    }

    removeTask(targetTaskId: number) {
        const tasks = this.tasks.filter(task => task.taskId !== targetTaskId);
        this._tasks = tasks;
        updateDataFirebase('tasks', tasks);
    }

    completeTask(targetTaskId: number) {
        const tasks = [...this.tasks].map(task => {
            if (task.taskId === targetTaskId) {
                return { ...task, complete: !task.complete };
            }
            return { ...task };
        })
        this._tasks = tasks;
        updateDataFirebase('tasks', tasks);
    }

    completeAllTasks() {
        const completeTasks = this.tasks.filter(task => task.complete === true);
        const tasks = this.tasks.map(task => {
            if (completeTasks.length === this.tasks.length) {
                task.complete = !task.complete;
            } else {
                task.complete = true;
            }
            return task;
        });
        this._tasks = tasks;
        updateDataFirebase('tasks', tasks);
    }

    deleteAllTasks() {
        this._tasks = [];
        setUserDataFirebase('tasks', null);
    }
};

export default new TaskStore();