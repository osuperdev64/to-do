import './global.css';
import styles from './App.module.css'; 
import { Header } from './components/Header'
import { PlusCircle } from 'phosphor-react';
import { TaskItem } from './components/TaskItem';
import { ChangeEvent, FormEvent, useState } from 'react';

interface TaskProps {
  id: number,
  content: string
}

export function App() {
  const [ tasks, setTasks ] = useState<TaskProps[]>([]);
  const [ countTasks, setCountTasks ] = useState(0);
  const [ newTaskContent, setNewTaskContent ] = useState('');
  const [ finishedTasks, setFinishedTasks ] = useState<number[]>([]);
  const [ countFinishedTasks, setCountFinishedTasks ] = useState(0);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const totalTasks = tasks.length + 1;
    const task = {
      id: totalTasks,
      content: newTaskContent
    }

    setCountTasks(totalTasks);
    setTasks([...tasks, task])
    setNewTaskContent('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskContent(event.target.value)
  }

  function deleteTask(taskToDelete: number) {
    const tasksWithoutTheDeletedOne = tasks.filter(task => {
      return task.id !== taskToDelete
    });

    setCountTasks(tasksWithoutTheDeletedOne.length);
    setTasks(tasksWithoutTheDeletedOne);
    removeFinishedTask(taskToDelete);
  }

  function finishTask(taskToFinish: number) {
    const filteredFinishedTasks = finishedTasks.filter(finishedTash => {
      return finishedTash === taskToFinish
    });

    if (filteredFinishedTasks.length === 0) {
      const totalFinishedTasks = [...finishedTasks, taskToFinish];

      setFinishedTasks(totalFinishedTasks);
      setCountFinishedTasks(totalFinishedTasks.length);
    } else {
      removeFinishedTask(taskToFinish);
    }
  }

  function removeFinishedTask(taskToRemove: number) {
      const finishedTasksWithoutDeletedOne = finishedTasks.filter(task => {
        return task !== taskToRemove
      });

      setFinishedTasks(finishedTasksWithoutDeletedOne);
      setCountFinishedTasks(finishedTasksWithoutDeletedOne.length);
  }

  return (
    <>
      <Header />

      <div className={styles.container}>
        <form onSubmit={handleCreateNewTask} className={styles.newTask}>
          <input
            required
            name="newTaskField"
            value={newTaskContent}
            placeholder="Adicione uma nova tarefa"
            onChange={handleNewTaskChange}
          />
          <button type="submit">Criar <PlusCircle size={20}/></button>
        </form>

        <div className={styles.taskList}>
          <header>
            <p className={styles.allTasks}>
              Tarefas criadas <span>{countTasks}</span>
            </p>

            <p className={styles.finishedTasks}>
              Concluídas <span>{countFinishedTasks} de {countTasks}</span>
            </p>
          </header>

          <ul>
            {
              tasks.map(task => {
                return (
                  <li key={task.id} className={styles.taskListItem}>
                    <TaskItem
                      id={task.id}
                      content={task.content}
                      onDeleteTask={deleteTask}
                      onFinishTask={finishTask}
                    />
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div> 
    </>
  )
}

