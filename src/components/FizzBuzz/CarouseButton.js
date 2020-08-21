import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const CarouseButton = (props) => <Button {...props} />;

CarouseButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CarouseButton;
