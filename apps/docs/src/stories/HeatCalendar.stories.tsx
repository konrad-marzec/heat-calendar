import type { Meta, StoryObj } from '@storybook/react';
import { Category } from 'core';

import HeatCalendar from './HeatCalendar';
import { data } from '../data';

const meta: Meta<typeof HeatCalendar> = {
  title: 'Heat Calendar',
  component: HeatCalendar,
  tags: ['autodocs'],
  args: {
    data,
  },
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    vLabel: {
      table: {
        disable: true,
      },
    },
    hLabel: {
      table: {
        disable: true,
      },
    },
    legend: {
      table: {
        disable: true,
      },
    },
    node: {
      table: {
        disable: true,
      },
    },
    data: {
      table: {
        disable: true,
      },
    },
    dataKey: {
      table: {
        disable: true,
      },
    },
    tooltip: {
      table: {
        disable: true,
      },
    },
  },
};

const RED_COLORS = ['#caaeac', '#ff7875', '#ff4d4f', '#cf1322', '#a8071a', '#820014', '#5c0011'];
const ORANGE_COLORS = ['#7a7672', '#e0c599', '#e2a458', '#d46b08', '#873800'];
const GREEN_COLORS = ['#5e5e56', '#7cb305', '#5b8c00', '#3f6600'];

export default meta;
type Story = StoryObj<typeof HeatCalendar>;

export const WithoutLabels: Story = {
  args: {
    category: Category.MONTH_DAY,
    startsAt: '2014-05-04',
    colors: RED_COLORS,
    hLabel: null,
    vLabel: null,
    legend: null,
    // @ts-expect-error OK! fix me later
    dataKey: '2',
  },
};

export const DefaultLabels: Story = {
  args: {
    category: Category.MONTH_DAY,
    startsAt: '2014-05-04',
    colors: GREEN_COLORS,
    title: 'Heat Map Title',
    // @ts-expect-error OK! fix me later
    dataKey: '2',
  },
};

export const CustomLabels: Story = {
  args: {
    category: Category.WEEK_DAY,
    startsAt: '2014-05-04',
    colors: RED_COLORS,
    // @ts-expect-error OK! fix me later
    dataKey: '2',
    vLabel: null,
    hLabel: ({ x, y }) => (
      <text x={x} y={y} fill="currentColor" fontSize={10} textAnchor="middle" alignmentBaseline="hanging">
        &#128197;
      </text>
    ),
  },
};

export const CustomNodes: Story = {
  args: {
    category: Category.MONTH_DAY,
    startsAt: '2014-05-04',
    colors: ORANGE_COLORS,
    title: 'Heat Map Title',
    // @ts-expect-error OK! fix me later
    dataKey: '2',
    node: ({ x, y, value, width, fitToScale }) => (
      <circle cx={x + width / 2} cy={y + width / 2} r={width / 2} fill={fitToScale(value)} />
    ),
  },
};

export const CustomNodesWeeks: Story = {
  args: {
    category: Category.WEEK,
    startsAt: '2014-05-04',
    colors: ORANGE_COLORS,
    title: 'Heat Map Title',
    node: ({ x, y, value, width, height, fitToScale }) => (
      <polygon
        strokeLinejoin="round"
        points={`${x},${y + height} ${x + width / 2 - 1},${y} ${x + width / 2 + 1},${y} ${x + width},${y + height}`}
        fill={fitToScale(value)}
      />
    ),
    // @ts-expect-error OK! fix me later
    dataKey: '3',
  },
};

export const CustomDataAggregation: Story = {
  args: {
    // @ts-expect-error OK! fix me later
    dataKey: (val: number | undefined, item: number[]) => Math.max(val ?? 0, item[3]),
    category: Category.MONTH_DAY,
    startsAt: '2013-05-04',
    colors: ORANGE_COLORS,
    legend: null,
  },
};

export const Tooltip: Story = {
  args: {
    // @ts-expect-error OK! fix me later
    dataKey: (val: number | undefined, item: number[]) => Math.max(val ?? 0, item[1]),
    category: Category.MONTH_DAY,
    startsAt: '2013-05-04',
    colors: ORANGE_COLORS,
    legend: null,
    tooltip: ({ data }) => (
      <div
        style={{
          padding: 10,
          maxWidth: 200,
          borderRadius: 6,
          background: 'white',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
      >
        {JSON.stringify(data, null, 2)}
      </div>
    ),
  },
};
