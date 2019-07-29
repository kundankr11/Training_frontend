import React from 'react';
import { connect } from 'react-redux';
import isEmpty from '../validation/is-empty';

export default function(ComposedComponent) {
  class Auth extends React.Component {
    constructor(props) {
      super(props);
      if (isEmpty(this.props.cookies.get('token'))) {

        this.props.history.push('/');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
        );
    }
  }

  function mapStateToProps(state, ownProps) {
    return {
      auth: state.auth,
      cookies: ownProps.cookies
    };
  }

  const Authenticate = connect(mapStateToProps)(Auth);
  return Authenticate;
}

