import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Menu from '../../components/materialcomp/menu';
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
        fontSize: '1rem',
    textTransform: 'uppercase',
    marginLeft: '0px',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: 'color: rgba(5, 55, 135, 1)',
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '100%',
    marginLeft:'25px',
    color: '#053787'
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export default function DetailedExpansionPanel(props) {
  const classes = useStyles();
  console.log("Passing props to functional component",props.task1);
  
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.column } >
            <Typography class= "Title" className={classes.heading}>{props.notificationData.notification_title}</Typography>
          </div>
          <div className={classes.column}>
            <Typography className={classes.secondaryHeading}></Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={(classes.column)}>

            <Typography variant="caption">
              {props.notificationData.notification_description}
            </Typography>
          </div>
          <div className={(classes.column, classes.helper)} style = {{marginLeft:'100px'}}>
            <Typography className="status" variant="caption" >
              {props.status}
            </Typography>
          </div>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button><DeleteIcon style = {{color: "red"}} /></Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}