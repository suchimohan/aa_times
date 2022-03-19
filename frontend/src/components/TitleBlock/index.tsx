import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useParams} from 'react-router-dom'

function TitleBlock() {

  let params = (useParams() as any);


  function isValid(params:any){
    let topic = ''
    if (params) {
      topic = params.topic
    }
    if(topic) return topic.toUpperCase()
    return 'TOP STORIES'
  }

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.500',
        color: '#fff',
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
          backgroundColor: 'rgba(0,0,0,.3)',
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
              {isValid(params)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TitleBlock;
