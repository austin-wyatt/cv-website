import { Action } from '../types'
import { SET_TITLE } from "./Store/Title";

export const setTitle = (title: string): Action => ({
    type: SET_TITLE,
    payload: title
})