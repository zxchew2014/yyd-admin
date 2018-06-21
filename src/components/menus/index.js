import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MenuContainer = styled.div`
  display: flex;
`;

function index({ user, logout }) {
  return <MenuContainer className="menu-container" />;
}

index.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

export default index;
