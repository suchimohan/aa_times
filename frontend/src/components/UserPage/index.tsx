import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {getAllTopStories} from '../../store/articles';
import NewsArticle from '../../models/NewsArticle';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container';
import ArticleCard from "../ArticleCard"
// import {useParams} from "react-router-dom";
import TitleBlock from '../TitleBlock';
import {getAllPins} from '../../store/pinnedArticle'

export default function UserPage() {

  // let params = (useParams() as any);
  // const sessionUser = useSelector((state:any) => state.session.user);

  // function queryString(params:any){
  //   let query = '';
  //   if (params) {
  //     query = params.topic
  //   }
  //   if(query) return query.toLowerCase()
  //   return 'world'
  // }

  const pinnedArticles = useSelector((state:any)=> Object.values(state.pins));
  const newsArticles = pinnedArticles.map((item:any) => NewsArticle.fromJSON(item));

  const dispatch = useDispatch();

  useEffect(()=>{
      // let topic = queryString(params)
      // dispatch(getAllTopStories(topic))
      dispatch(getAllPins())
  },[dispatch])

  return (
  	<>
  	<TitleBlock title={`Your Pinned Stories`}/>
    <Container sx={{ py: 8 }}>
        <Grid container spacing={2}>
            {newsArticles.map((article:NewsArticle) => (
                <ArticleCard key={`${article.title}`} article = {article}/>
            ))}
        </Grid>
    </Container>
    </>
  );
}
