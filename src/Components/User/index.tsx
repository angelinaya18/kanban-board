import { useState } from 'react';
import style from './style.module.scss';
import Avatar from '../Avatar';
import DropDown from '../DropDown';
import { IOption } from '../../types';
import arrowDown from '../../images/arrow-down.svg';
import arrowUp from '../../images/arrow-up.svg';

const User=():JSX.Element=>{
    const options: Array<IOption>=[
        {
            value: 0,
            text: 'Profile'
        },
        {
            value: 1,
            text: 'Log Out'
        }
    ];

    const [isShowDropDown, setisShowDropDown]=useState(false);

    const handleClick = ()=>{
        setisShowDropDown(!isShowDropDown);
    };

    return (
        <div className={style.container}>
            <Avatar onClick={()=>{(handleClick())}}/>
            {
                isShowDropDown ? <DropDown options={options}/> : ''
            }
            <img onClick={()=>{(handleClick())}} src={isShowDropDown ? arrowUp : arrowDown} alt={isShowDropDown ? 'Скрыть меню' : 'Показать меню'}/>
        </div>
    )
}

export default User;