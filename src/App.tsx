import { useEffect, useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Style from './style.module.scss';
import Navbar from './Components/Navbar';
import { ITask, ITaskList } from './types';
import Tasks from './Components/Tasks';
import TaskDetails from './Components/TaskDetails';

function App() {
  const [tasks, setTasks] = useState<Array<ITaskList>>([]);

  useEffect(()=>{
    const tasksInStorage = localStorage.getItem('tasks');
    if (tasksInStorage && JSON.parse(tasksInStorage)) {
      setTasks(JSON.parse(tasksInStorage));
    } else {
      setTasks([{
        title: 'Backlog',
        issues: []
      },
      {
        title: 'Ready',
        issues: []
      },
      {
        title: 'In Progress',
        issues: []
      },
      {
        title: 'Finished',
        issues: []
      }
      ])
    }
  },[]);

  useEffect(() => {
    if (tasks.length > 0) localStorage.setItem('tasks', JSON.stringify(tasks));
  },[tasks])

  const addTask = useCallback((task: ITask, type: String) => {
    let newTasks = [...tasks];
    let index = newTasks.findIndex(i => i.title === type);
    newTasks[index].issues.push(task);

    switch(type) {
      case 'Ready': 
        index = newTasks.find(i => i.title === 'Backlog')?.issues.findIndex(i => i.id === task.id) ?? -1;
        index > -1 && newTasks.find(i => i.title === 'Backlog')?.issues.splice(index, 1);
        break;
      case 'In Progress': 
        index = newTasks.find(i => i.title === 'Ready')?.issues.findIndex(i => i.id === task.id) ?? -1;
        index > -1 && newTasks.find(i=>i.title === 'Ready')?.issues.splice(index, 1);
        break;
      case 'Finished': 
        index = newTasks.find(i => i.title === 'In Progress')?.issues.findIndex(i => i.id === task.id) ?? -1;
        index > -1 && newTasks.find(i => i.title === 'In Progress')?.issues.splice(index, 1);
        break;
    }

    setTasks(newTasks);
  }, [tasks])

  const editDescription = (id: String, newDesc: string) => {
    let newTasks = [...tasks];
    let indexTask = -1;

    for(let k = 0; k < newTasks.length; k++) {
      indexTask = newTasks[k].issues.findIndex(i => i.id === id);
      if (indexTask > -1) {
        (newTasks[k].issues[indexTask].description = newDesc);
        break;
      }
    }

    setTasks(newTasks);
  }

  return (
      <div className={Style.container}>
        <header className={Style.header}>
          <Navbar />
        </header>
        <main className={Style.main}>
          <Routes>
              <Route path="/" element={<Tasks 
                tasks={tasks}
                onAddTask={(task, type)=>{
                  addTask(task, type);
                }}
              />}/>
              <Route path="tasks/:taskId" element={
                <TaskDetails 
                tasks={tasks} 
                onEditDescription={(id, newDesc)=>{
                  editDescription(id, newDesc);
                }}/>
              }
              />
          </Routes>
        </main>
        <footer className={Style.footer}>
          <div className={Style.info}>
            <p className={Style.item}>Active tasks: {tasks.find(i => i.title === 'Backlog')?.issues.length}</p>
            <p className={Style.item}>Finished tasks: {tasks.find(i=>i.title === 'Finished')?.issues.length}</p>
            <p className={Style.author}>Kanban board by Angelina, 2024</p>
          </div>
        </footer>
      </div>
  );
}

export default App;
