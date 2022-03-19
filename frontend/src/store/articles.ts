import NewsArticle from '../models/NewsArticle';
const GET_TOP_STORIES = 'news/GET_TOP_STORIES';

const getTopStories = (news:any) => ({
    type: GET_TOP_STORIES,
    news
})

export const getAllTopStories = (topic:string) => async (dispatch: any) => {
    const response = await fetch(`/api/news/topstories?topic=${topic}`);
    if (response.ok) {
        const news = await response.json();
        dispatch(getTopStories(news))
    }
}

export const articlesReducer = (state={}, action:any)=>{
    let newState:{[key: number]: any} = {}
    switch(action.type){
    case GET_TOP_STORIES:{
        action.news.forEach((item:any,index:number)=>{
            newState[index] = item;
        })
        return newState;
    }
    default:
        return state;
    }
}
