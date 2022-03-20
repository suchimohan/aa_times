import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useParams} from 'react-router-dom'
import { useEffect } from 'react';

class Props{
    title: string

    constructor(title?: any) {
        this.title = title;
    }
};

function TitleBlock(props: Props) {

  let params = (useParams() as any);

  function camalize(str:string) {
      if(["us"].includes(str)) {
        return str.toUpperCase();
      }
      return str.substring(0,1).toUpperCase() + str.substring(1);
  }

  function getTopic(params:any){
    if (props.title)
      return props.title;
    let topic = ''
    if (params) {
      topic = params.topic
    }
    if(topic) {
      return camalize(topic);
    }
    return 'Top Stories'
  }

  useEffect(() => {
    (document as any).title = "a/A Times - " + getTopic(params);
  });

  return (
    <Paper
      sx={{
        position: 'relative',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'grey.200',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {getTopic(params)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TitleBlock;
