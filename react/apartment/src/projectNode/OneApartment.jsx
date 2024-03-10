
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import './styleRecipe.css'

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

export default function OneApartment(props) {
  const [expanded, setExpanded] = React.useState(false);

  const { _id, name, codeAdvertiser, numberBed } = props
  const users = useSelector(x => x.userReducer.users)
//   const myUser = users.filter(x => x.id == idUser)[0]

  const nav = useNavigate()

//   let color
//   if (idCategory == 1)
//     color = 'red'
//   else if (idCategory == 2)
//     color = 'blue'
//   else if (idCategory == 3)
//     color = 'pink'
//   else
//     color = 'green'

//   const handleExpandClick = () => {
//     debugger
//     nav(`/DenseMenu/${id}`)
//     setExpanded(!expanded);
//   };

  return <>
  
  </>
    // <Card sx={{ maxWidth: 345 }} className='card'>
    //   <CardHeader
    //     avatar={
          
    //       <Avatar sx={{  }} aria-label="recipe">
    //         {/* bgcolor: { color } */}
    //         {codeAdvertiser.email[0]}
    //       </Avatar>
    //     }
    //     action={
    //       <IconButton aria-label="settings">
    //         <MoreVertIcon />
    //       </IconButton>
    //     }
    //     title={<h3>{name}</h3>}
    //     subheader={<h3>editor:{codeAdvertiser.email}</h3>}
    //   />
    //   <CardMedia
    //     component="img"
    //     height="194"
    //     // image={`../../images/pic${id}.JPG`}
    //     alt={name}
    //   />
    //   <CardContent>
    //     <Typography variant="body2" color="text.secondary">
    //       This impressive paella is a perfect party dish and a fun meal to cook
    //       together with your guests. Add 1 cup of frozen peas along with the mussels,
    //       if you like.
    //     </Typography>
    //   </CardContent>
    //   <CardActions disableSpacing>
    //     <IconButton aria-label="add to favorites">
    //       <FavoriteIcon />
    //     </IconButton>
    //     <IconButton aria-label="share">
    //       <ShareIcon />
    //     </IconButton>
    //     <ExpandMore
    //       expand={expanded}
    //     //   onClick={handleExpandClick}
    //       aria-expanded={expanded}
    //       aria-label="show more"
    //     >
    //       <ExpandMoreIcon />
    //     </ExpandMore>
    //   </CardActions>
    // </Card>
    

}