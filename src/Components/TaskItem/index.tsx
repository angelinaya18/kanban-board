import {FunctionComponent} from 'react';
import style from './style.module.scss'
import { ITask } from '../../types';
import { useNavigate } from 'react-router-dom';

const TaskItem:FunctionComponent<{task: ITask}>=({task}) => {
    const {id, name} = task;
    const navigate = useNavigate();

    return (
        <div className={style.container} onClick={()=>navigate(`tasks/${id}`)}>
            <p className={style.name}>{name}</p>
        </div>
    )
}

export default TaskItem;