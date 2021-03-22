import React from 'react';
import PropTypes from 'prop-types';

const ContactItem = ({ details }) => (
  <div>
    <div>
      Name:
      <span>{details.title}</span>
      <span>{` ${details.first} ${details.last}`}</span>
    </div>
    <div>
      Email:
      <span>{details.email}</span>
    </div>
  </div>
);

ContactItem.propTypes = {
  details: PropTypes.object,
};

export default ContactItem;
