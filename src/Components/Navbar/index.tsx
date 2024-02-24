import style from './style.module.scss';
import User from '../User';

const Navbar=():JSX.Element=>{
    return (
        <div className={style.container}>
            <h1 className={style.title}>
                Awesome Kanban Board
            </h1>
            <User />
        </div>
    )
}

export default Navbar;