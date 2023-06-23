import type { Meta, StoryObj } from '@storybook/react';
import { data } from '../data';
import HeatCalendar from './HeatCalendar';

const meta: Meta<typeof HeatCalendar> = {
  title: 'Example/Header',
  component: HeatCalendar,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof HeatCalendar>;

export const DayOfTheMonth: Story = {
  args: {
    category: 'month-day',
    hLabel: null,
    vLabel: null,
    // dataKey: dataKey1,
    startsAt: '2014-05-04',
    // tooltip: Tooltip,
    title: 'Title for the following heatmap',
  },
};

// export const DayOfTheYear: Story = {
//   args: {
//     category: 'month-week',
//   },
// };
