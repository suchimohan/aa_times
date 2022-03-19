import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton';
import PushPinIcon from '@mui/icons-material/PushPin';
import NewsArticle from '../../models/NewsArticle';
import {savePinnedArticle} from '../../store/pinnedArticle'
import {useDispatch} from "react-redux"
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from '@mui/material/Link';

class Props{
    article: NewsArticle

    constructor(article: NewsArticle) {
        this.article = article;
    }
};

export default function ArticleCard(props: Props){
    const article = props.article

    function pinIconColor() {
        if (article.is_favorite) {
            return red[500];
        }
    }

    const dispatch = useDispatch();

    async function handlePins(e:any){
        e.preventDefault();
       let pinnedArticle = await dispatch(savePinnedArticle(article));
    //    if(pinnedArticle as any){
    //      article.is_favorite = true;
    //    }
    }


return (
    <Grid item xs={12} sm={6} md={4} key={article?.title}>
        <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="news">
                    AA
                </Avatar>
                }
                title={article?.title}
                subheader={new Date(article?.published_date).toString().substring(0, 10)}
            />
            <CardMedia
                component="img"
                image = {article.firstImage()}
                height="194"
                alt={article.altImage()}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                <Link href={article.short_url} target="_blank">
                    {article.abstract}
                    <OpenInNewIcon/>
                </Link>
                </Typography>
                <br/>
                <Typography color="textSecondary" variant="subtitle2">
                    {article.byline}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="pin article" onClick={(e)=>{handlePins(e)}}>
                    <PushPinIcon  sx={{ color: pinIconColor() }}/>
                </IconButton>
            </CardActions>
        </Card>
    </Grid>
    );
}
