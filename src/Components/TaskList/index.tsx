import {FunctionComponent, useCallback, useState} from 'react';
import style from './style.module.scss'
import { ITask } from '../../types';
import TaskItem from '../TaskItem';

const TaskList:FunctionComponent<{title:String, taskList:Array<ITask>, prevTasks:Array<ITask>, onAddTask:(task:ITask)=>any}>=({title, taskList, prevTasks, onAddTask})=>{
    const prevs = prevTasks;
    const issues = taskList;
    const isBacklog = title === 'Backlog';

    const [isAdd, setIsAdd] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectValue, setSelectValue] = useState("");

    function generateId() {
        return Math.random().toString(16).slice(2) + new Date().getTime().toString(36);
    }

    const showAdd = () => {
        setIsAdd(true);
    }

    const closeAdd = () => {
        setIsAdd(false);
        setInputValue("");
        setSelectValue("");
    }

    const saveAddMemoized = useCallback(() => {
        if(isBacklog){
            inputValue.length > 0 && onAddTask({
                id: generateId(),
                name: inputValue,
                description: ""
            });
        }else{
            selectValue.length > 0 && onAddTask(prevs.find(i => i.id === selectValue) as ITask)
        }

        closeAdd();
    }, [isBacklog, inputValue, selectValue, prevs, onAddTask])

    return (
        <div className={style.container}>
            <h3 className={style.title}>{title}</h3>
            <div className={style.list}>
                {
                    issues.map((task, index) => {return(
                        <TaskItem key={`taskItem_${index}`} task={task}/>
                    )})
                    
                }
                {
                    isAdd && 
                    <div className={style.new_item}>
                        {
                            isBacklog ?
                                <input autoFocus
                                    className={style.input} 
                                    type="text"
                                    value={inputValue}
                                    onChange={(event) => {
                                        setInputValue(event.target.value);
                                    }}
                                />
                            :
                                <select 
                                    className={style.select}
                                    defaultValue={""}
                                    onChange={(event) => {
                                        setSelectValue(event.target.value);
                                    }}
                                >
                                    {
                                        <option value={""} key='optionItem_-1'></option>
                                    }
                                    {
                                        prevs.map((task, index) =>
                                            <option value={task.id.toString()} key={`optionItem_${index}`}>{task.name}</option>
                                        )
                                    }
                                </select>
                        }
                    </div>
                }
            </div>
            <div className={style.footer}>
                {
                    isAdd ?
                        <button className={style.button_submit} onClick={saveAddMemoized}>
                            Submit
                        </button> 
                    :
                        <button className={style.button_add} onClick={showAdd} disabled={!isBacklog && prevs.length===0}>
                            <span className={style.icon}>+</span> Add card
                        </button>
                }
            </div>
        </div>
    )
}

export default TaskList;