import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Section extends Component {
  render() {
    return (
      <div className={'Section cf'}>
        <div className={'Demo-description'}>
          <h2>{this.props.title}</h2>
        </div>
        <div className={'Demo'}>{this.props.children}</div>
      </div>
    );
  }
}

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
};
