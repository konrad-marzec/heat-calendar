import React, { ComponentProps } from 'react';
import { HeatCalendar as CoreHeatCalendar } from 'core';

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
