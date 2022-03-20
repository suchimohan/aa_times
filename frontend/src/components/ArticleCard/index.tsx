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
import {savePinnedArticle, deletePinnedArticle} from '../../store/pinnedArticle'
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';

class Props{
    article: NewsArticle

    constructor(article: NewsArticle) {
        this.article = article;
    }
};

export default function ArticleCard(props: Props){
    const [article, setArticle] = useState(props.article);

    const sessionUser = useSelector((state:any) => state.session.user);

    function pinIconColor() {
        if (article.is_favorite) {
            return red[500];
        }
    }

    let tooltipTitle = "Pin a article for reading later";
    if(!sessionUser) {
        tooltipTitle = "Only logged in users can pin articles. Please login";
    }

    const dispatch = useDispatch();

    async function handlePins(e:any){
        e.preventDefault();
        let response:any;
        if(!article.is_favorite) {
            response = await dispatch(savePinnedArticle(article));
        } else {
            response = await dispatch(deletePinnedArticle(article));
        }
        if(response as any){
            let updatedArticle = article.copy();
            updatedArticle.is_favorite = !updatedArticle.is_favorite;
            setArticle(updatedArticle);
        }
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
                    <Tooltip title={`${tooltipTitle}`}>
                        <div>
                            <IconButton disabled={!sessionUser} aria-label="pin article" onClick={(e)=>{handlePins(e)}}>
                                <PushPinIcon  sx={{ color: pinIconColor() }}/>
                            </IconButton>
                        </div>
                    </Tooltip>
                </CardActions>
            </Card>
        </Grid>
    );
}
