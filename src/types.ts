export interface Action{
    type: string,
    payload: any
}

export interface TitleState{
    title: string
}

export interface RootState{
    titleState: TitleState
}