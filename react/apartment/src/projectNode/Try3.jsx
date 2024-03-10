
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Height } from '@mui/icons-material';
import { Divider, Paper } from '@mui/material';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Location(props) {
  const [expanded, setExpanded] = React.useState(false);
  const { word, spe,w} = props
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div >
    {/* Paper sx={{ maxWidth: 1200 ,border:'none'}} */}
      {/* <CardHeader
      /> */}
      <CardContent>
        <Typography variant="body2" color="text.secondary" fontSize={16}>
        <p key={word.place}>{word.text.substring(0,word.text.indexOf(w))} {<mark>{word.text.substring(word.text.indexOf(w),w.length+word.text.indexOf(w))}</mark>}{word.text.substring(word.text.indexOf(w)+w.length)} <button className='li'  >{word.place} </button></p>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {word.details}
          </Typography>
        </CardContent>
      </Collapse>
      <Divider></Divider>
    </div>
  );
}