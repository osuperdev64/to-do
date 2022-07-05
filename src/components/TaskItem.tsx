import { Trash } from 'phosphor-react';
import styles from './TaskItem.module.css';

interface TaskItemProps {
    id: number,
    content: string,
    onDeleteTask: (id: number) => void
    onFinishTask: (id: number) => void
}

export function TaskItem({ id, content, onDeleteTask, onFinishTask }: TaskItemProps) {
    function handleDeleteTask() {
        onDeleteTask(id)
    }

    function handleFinishTask() {
        onFinishTask(id)
    }

    return (
        <div className={styles.taskItem}>
            <input
                type="checkbox"
                name="checkedTaskItem"
                id={`taskItem${id}`}
                onChange={handleFinishTask}
            />

            <label htmlFor={`taskItem${id}`}>{content}</label>

            <button onClick={handleDeleteTask}>
                <Trash size={17} />
            </button>
        </div>
    )
}