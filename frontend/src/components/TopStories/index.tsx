import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllTopStories} from '../../store/articles';
import NewsArticle from '../../models/NewsArticle';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
import ArticleCard from "../ArticleCard"

export default function TopStories() {

  const news = useSelector((state:any)=> Object.values(state.news));
  const newsArticles = news.map((item:any) => NewsArticle.fromJSON(item));

  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(getAllTopStories())
  },[dispatch])

  return (
    <Container sx={{ py: 8 }}>
        <Grid container spacing={2}>
            {newsArticles.map((article:NewsArticle) => (
                <ArticleCard article = {article}/>
            ))}
        </Grid>
    </Container>
  );
}
