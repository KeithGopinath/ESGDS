import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getContacts } from '../actionCreators/Contacts';
import ContactItem from '../components/ContactItem';


class ContactsContainer extends React.Component {
  componentDidMount() {
    this.props.getContacts();
  }

  render() {
    const { contacts } = this.props;
    return (
      <section>
        {contacts && contacts.map((item, i) => <ContactItem details={item} key={i.toString()} />)}
      </section>
    );
  }
}

function mapStateToProps(state) {
  const { contactsState } = state;
  const { contacts } = contactsState;
  return {
    contacts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getContacts: bindActionCreators(getContacts, dispatch),
  };
}

ContactsContainer.propTypes = {
  contacts: PropTypes.array,
  getContacts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsContainer);
