import { FunctionComponent } from "react";
import TaskList from "../TaskList";
import { ITask, ITaskList } from "../../types";

const Tasks:FunctionComponent<{tasks: Array<ITaskList>, onAddTask:(task:ITask, type:String)=>any}>=({tasks, onAddTask})=>{
    return <>
        {
            tasks.map((item, index, array)=>{
                return (<TaskList key={`taskList_${item.title}`}
                    title={item.title}
                    taskList={item.issues}
                    prevTasks={index>0 ? array[index-1].issues : []}
                    onAddTask={(task)=>{
                        onAddTask(task, item.title);
                    }}
                />)
            })
        }
</>
}

export default Tasks;