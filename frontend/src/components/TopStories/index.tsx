import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllTopStories} from '../../store/articles';
import NewsArticle from '../../models/NewsArticle';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
import ArticleCard from "../ArticleCard"
import {useParams} from 'react-router-dom'

export default function TopStories() {

  let params = (useParams() as any);

  function queryString(params:any){
    let query = '';
    if (params) {
      query = params.topic
    }
    if(query) return query.toLowerCase()
    return 'world'
  }

  const news = useSelector((state:any)=> Object.values(state.news));
  const newsArticles = news.map((item:any) => NewsArticle.fromJSON(item));

  const dispatch = useDispatch();

  useEffect(()=>{
      let topic = queryString(params)
      dispatch(getAllTopStories(topic))
  },[dispatch])

  return (
    <Container sx={{ py: 8 }}>
        <Grid container spacing={2}>
            {newsArticles.map((article:NewsArticle) => (
                <ArticleCard key={`${article.short_url}`} article = {article}/>
            ))}
        </Grid>
    </Container>
  );
}
