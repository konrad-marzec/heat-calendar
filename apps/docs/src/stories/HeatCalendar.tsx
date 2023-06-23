import React, { ComponentProps } from 'react';
import { HeatCalendar as CoreHeatCalendar } from 'core';

const COLORS = ['#CCDBDC', '#9AD1D4', '#C7F9CC', '#DBFF76', '#B6DC76', '#80CED7', '#57CC99', '#007EA7', '#003249'];
const ORANGE_COLORS = ['#7a7672', '#e0c599', '#e2a458', '#d46b08', '#873800'];
const GREEN_COLORS = ['#5e5e56', '#7cb305', '#5b8c00', '#3f6600'];

const container = {
  padding: 16,
  fontSize: 6,
  color: 'white',
  borderRadius: 6,
  background: '#343434',
  margin: '16px 46px 32px 46px',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
};

function HeatCalendar(props: ComponentProps<typeof CoreHeatCalendar>) {
  return (
    <div style={container}>
      <CoreHeatCalendar {...props} />
    </div>
  );
}

export default HeatCalendar;
