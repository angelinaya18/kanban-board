import style from './style.module.scss';
import userImage from '../../images/user-avatar.svg';
import { FunctionComponent } from 'react';

const Avatar:FunctionComponent<{onClick:()=>any}>=({onClick}):JSX.Element=>{

    return (
        <button className={style.avatar} onClick={onClick}>
            <img src={userImage} alt='Фото пользователя'/>
        </button>
    )
}

export default Avatar;