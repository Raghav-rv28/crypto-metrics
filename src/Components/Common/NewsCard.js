import { Typography ,Box} from '@mui/material'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
const NewsCard = (props) => {
  return (
    <Grid item xs={4}>
      <div className= "news-card">
      <a href={props.url} target="_blank" rel="noreferrer">
        <Paper elevation={3} sx={{backgroundColor:'inherit'}}>
        <Box padding={2} sx={{
          display : 'flex',
          flexDirection: 'row',
        }}>
          <img className="news-image" src={props.img} alt="news-image"></img>
        <Typography sx={{marginLeft: 2}}
        className="card-title" variant='subtitle2' component="h3" >
            {(props.name.length > 75) ? `${props.name.substring(0,75)}...` : props.name}
            </Typography>
        </Box>
        <Box padding={2}>
        <Typography variant='body1' component="h6" noWrap >
            {props.description}
        </Typography>
        <Typography variant='body2' component="h6" gutterBottom>
        <Avatar className="news-logo" alt="Provider" src={props.provider} /> 
        </Typography>
        <Typography variant="caption" display="block" sx={{ textAlign: 'right' }} gutterBottom>
            {moment(props.timestamp).startOf('ss').fromNow()}
        </Typography>
        </Box>
        </Paper>
      </a>
      </div>
    </Grid>

  )
}

export default NewsCard