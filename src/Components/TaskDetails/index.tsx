import {FunctionComponent, useState, useEffect, useRef} from 'react';
import style from './style.module.scss'
import { ITaskList } from '../../types';
import { useParams } from 'react-router-dom';
import closeIcon from '../../images/close.svg';
import { useNavigate } from 'react-router-dom';

const TaskDetails:FunctionComponent<{tasks: Array<ITaskList>, onEditDescription:(id: String, newDesc: string)=>any}>=({tasks, onEditDescription})=>{
    const navigate=useNavigate();
    const editRef = useRef<HTMLTextAreaElement>(null);
    
    const {taskId}=useParams();

    let task;
    for(let k=0;k<tasks.length;k++){
        let indexTask=tasks[k].issues.findIndex(i=>i.id===taskId);
        if(indexTask>-1){
            task=tasks[k].issues[indexTask];
            break;
        }
    }

    const taskItem=task;
    const [isShowEdit, setIsShowEdit]=useState<Boolean>(false);
    const [inputValue, setInputValue]=useState("");
    
    useEffect(()=>{
        if(taskItem?.description){
            setInputValue(taskItem.description);
        }
    },[taskItem])

    if(!taskItem){
        return null;
    }    

    return (
        <div className={style.container}>
            <p className={style.title}>{taskItem.name}</p>
            {
                isShowEdit ? 
                    <textarea ref={editRef}
                        className={style.edit}
                        autoFocus
                        value={inputValue}
                        onChange={(event)=>{
                            setInputValue(event.target.value);
                            onEditDescription(taskItem.id, event.target.value);
                        }}
                    />
                :
                    <p className={style.description}
                    onClick={()=>{
                        setIsShowEdit(true);
                        editRef.current?.select();
                    }}>
                        {taskItem.description.length>0 ? taskItem.description : "This task has no description"}
                    </p>
            }
            <img className={style.close} src={closeIcon} alt="Вернуться к списку задач" onClick={()=>navigate('/')}/>
        </div>
    )
}

export default TaskDetails;