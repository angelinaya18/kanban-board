export interface ITask{
    id: String,
    name: String,
    description: string
}

export interface ITaskList{
    title: String,
    issues: Array<ITask>
}

export interface IOption{
    value: Number,
    text: String
}