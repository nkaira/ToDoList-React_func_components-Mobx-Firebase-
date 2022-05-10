import React from "react";
import { observer } from "mobx-react";
import cn from "classnames";

import Portal from "utils/Portal";
import styles from "./modal.module.scss";

interface IModal {
    onOk: () => void
    onCancel: () => void
}

const Modal: React.FC<IModal> = ({ onOk, onCancel }) => {

    const buttonOk = cn(styles.button, styles.button__ok);

    return (
        <Portal>
            <div className={styles.modal}>
                <div className={styles.modal__window}>
                    <div>
                        <h2>Are you sure want to delete the task?</h2>
                    </div>
                    <div className={styles.modal__footer}>
                        <button className={buttonOk} onClick={onOk}> Ok </button>
                        <button className={styles.button} onClick={onCancel}> Cancel </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default observer(Modal);