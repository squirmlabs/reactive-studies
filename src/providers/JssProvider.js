import React from 'react';
import { create as createJss } from 'jss';
import { JssProvider } from 'react-jss';
import jssPreset from '../presets/jssPreset';

const jss = createJss(jssPreset());

const JssBaseComponent = props => (
  <JssProvider jss={jss}>{props.children}</JssProvider>
);

export default JssBaseComponent;
