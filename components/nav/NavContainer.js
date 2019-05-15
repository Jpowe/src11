import React, { Component } from "react";
import R from "ramda";
import Nav from "./Nav.js";
import { connect } from "react-redux";
import { saveFavs } from "../../actions";
import { getEndPoints } from "../../utils/utils";

class NavContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}
  componentDidMount() {}

  render() {
    let { closeSelf } = this.props;
    return (
      <div style={{ padding: "10px" }}>
        {this.props.login && (
          <Nav
            preferences={this.props.preferences}
            setFavs={this.props.setFavorites}
            authorizations={this.props.authorizations}
            closeSelf={closeSelf}
            login={this.props.login}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  user: state.notifications.user ? state.notifications.user : null,
  preferences: state.notifications.user
    ? state.notifications.preferences
    : null,
  authorizations: state.notifications.user
    ? getEndPoints(state.notifications.user.roles)
    : null,
  login: state.notifications.login ? state.notifications.login : null
});
const mapDispatchToProps = (dispatch, ownProps) => ({
  setFavorites: arr => {
    dispatch(saveFavs(arr));
  }
});
const NavContainer2 = connect(mapStateToProps, mapDispatchToProps)(
  NavContainer
);

export default NavContainer2;
