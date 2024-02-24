import {FunctionComponent} from 'react';
import style from './style.module.scss';
import {IOption} from '../../types';

interface IDropDownOptions{
    options: Array<IOption>
}

const DropDown:FunctionComponent<IDropDownOptions>=({options}):JSX.Element=>{
    return (
        <div className={style.container}>
            {
                options.map((i, index)=>{
                    return (
                        <p className={style.item} key={`dropDownOption_${index}`}>{i.text}</p>
                    )
                })
            }
        </div>
    )
}

export default DropDown;