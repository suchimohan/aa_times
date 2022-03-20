import NewsArticle from '../models/NewsArticle';
import { csrfFetch } from './csrf';


const GET_PINS = 'pins/GET_PINS'
const SAVE_PINS = 'pins/SAVE_PINS';
const DELETE_PINS = 'pins/DELETE_PINS';

const getPins = (pinnedArticles:any) => ({
    type: GET_PINS,
    pinnedArticles
})

const savePins = (pinnedArticle:any) => ({
    type: SAVE_PINS,
    pinnedArticle
})


const deletePins = (pinnedArticle:any) => ({
    type: DELETE_PINS,
    pinnedArticle
})

export const getAllPins = () => async (dispatch: any) => {
    const response = await fetch('/api/pinnedArticles')
    if (response.ok) {
        const pinnedArticles = await response.json();
        dispatch(getPins(pinnedArticles))
    }
}

export const savePinnedArticle = (article:NewsArticle) => async (dispatch:any) => {
    const response = await csrfFetch(`/api/pinnedArticles`, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(article)
    });
    if(response.ok) {
        const pinnedArticle = await response.json();
        dispatch(savePins(pinnedArticle))
        return pinnedArticle
    }
}

export const deletePinnedArticle = (article:NewsArticle) => async (dispatch:any) => {
    const response = await csrfFetch(`/api/pinnedArticles`, {
        method: "DELETE",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(article)
    });
    if(response.ok) {
        dispatch(deletePins(article))
        return article
    }
}

export const pinnedReducer = (state={},action:any)=>{
    let newState:{[key:string]:any} = {}
    switch(action.type){
        case GET_PINS: {
            action.pinnedArticles.forEach((pin:any)=>{
                newState[pin.short_url] = pin
            })
            return newState;
        }
        case SAVE_PINS: {
            newState[action.pinnedArticle.short_url] = action.pinnedArticle;
            return newState;
        }
        case DELETE_PINS: {
            newState = {...state};
            delete newState[action.pinnedArticle.short_url];
            return newState;
        }
        default:
            return state;
    }
}
