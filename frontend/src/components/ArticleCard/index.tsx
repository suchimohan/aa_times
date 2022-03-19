import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid'
import NewsArticle from '../../models/NewsArticle';

class Props{
    article: NewsArticle

    constructor(article: NewsArticle) {
        this.article = article;
    }
};

export default function ArticleCard(props: Props){
    const article = props.article;
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
                <a href={article.short_url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                    {article.abstract}
                </a>
                </Typography>
                <br/>
                <Typography color="textSecondary" variant="subtitle2">
                    {article.byline}
                </Typography>
            </CardContent>
        </Card>
    </Grid>
    );
}
