import React, {Component} from 'react';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  NavDropdown
} from 'reactstrap';
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {compose} from "redux";
import {unsetClient} from "containers/App/actions";
import {makeSelectClient} from "containers/App/selectors";

class UserDropDown extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const {client, handleLogout} = this.props;
    return (
      <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle nav>
          <img src={'public/img/avatars/1.jpg'} className="img-avatar"  />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
          <DropdownItem onClick={handleLogout}><i className="fa fa-lock"></i> Logout</DropdownItem>
        </DropdownMenu>
      </NavDropdown>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleLogout: (evt) => {
      localStorage.removeItem("token");
      dispatch(unsetClient());
      this.state = {
        dropdownOpen: false
      };
    },
  };
}

const mapStateToProps = createStructuredSelector({
  client: makeSelectClient(),
});

const withConnect = connect(mapStateToProps,mapDispatchToProps);

export default compose(
  withConnect,
)(UserDropDown);
