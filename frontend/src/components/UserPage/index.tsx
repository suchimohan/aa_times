import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewsArticle from '../../models/NewsArticle';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
import ArticleCard from "../ArticleCard"
import TitleBlock from '../TitleBlock';
import {getAllPins} from '../../store/pinnedArticle'

export default function UserPage() {

  const pinnedArticles = useSelector((state:any)=> Object.values(state.pins));
  const newsArticles = pinnedArticles.map((item:any) => NewsArticle.fromJSON(item));

  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(getAllPins())
  },[dispatch])

  return (
  	<>
  	<TitleBlock title={`Your Pinned Stories`}/>
    <Container sx={{ py: 8 }}>
        <Grid container spacing={2}>
            {newsArticles.map((article:NewsArticle) => (
                <ArticleCard key={`article-${article.short_url}`} article = {article}/>
            ))}
        </Grid>
    </Container>
    </>
  );
}
