import React from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser, resetErrors } from "../actions/authentication";

const validate = values => {
  const errors = {};
  const requiredFields = ["email", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (
    values.password &&
    !/^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[0-9])(?=\S*[\W])\S*$/i.test(
      values.password
    )
  ) {
    errors.password = "Invalid password";
  }

  return errors;
};

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error, active },
  ...custom
}) => (
  <div>
  <TextField
    variant="outlined"
    margin="normal"
    fullWidth
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
  </div>
);

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const ReduxFormLogin = props => {
  const { pristine, reset, submitting, classes, handleSubmit } = props;
  const formStyles = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={formStyles.paper}>
        <Avatar className={formStyles.avatar}>
          <LockOutlinedIcon />
        </Avatar>
      </div>
      <Typography component="h1" variant="h5" color="primary">
        Log In
      </Typography>
      <form className={formStyles.form} onSubmit={handleSubmit}>
        <div>
          <Button
            type="button"
            variant="contained"
            color="primary"
            disabled={pristine || submitting}
            onClick={reset}
            style={{ marginLeft: "310px", marginBottom: "-12px" }}
          >
            X
          </Button>
          <Field name="email" component={renderTextField} label="Email" />
        </div>
        <div>
          <Field
            name="password"
            component={renderTextField}
            label="Password"
            type="password"
          />
        </div>
        <div>
          <Button
            type="submit"
            disabled={pristine || submitting}
            fullWidth
            variant="contained"
            color="primary"
            className={formStyles.submit}
          >
            Log In
          </Button>

          <Grid container>
            <Grid item xs>
              <NavLink to="/emailreset"> Forget Password</NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/register"> New? Register Here</NavLink>
            </Grid>
          </Grid>
        </div>
      </form>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors,
  auth: state.auth,
  cookies: ownProps.cookies,
  notification: state.notification,
  form: state.form
});

const ReduxLogin = connect(
  mapStateToProps,
  { loginUser, resetErrors }
)(withRouter(ReduxFormLogin));

export default reduxForm({
  form: "MaterialUiForm", // a unique identifier for this form
  validate,
  destroyOnUnmount: false
})(ReduxLogin);
