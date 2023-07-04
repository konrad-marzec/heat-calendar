# heat-calendar

![alt text](https://github.com/konrad-marzec/heat-calendar/blob/master/assets/green.png?raw=true)
---
![alt text](https://github.com/konrad-marzec/heat-calendar/blob/master/assets/red.png?raw=true)
---
![alt text](https://github.com/konrad-marzec/heat-calendar/blob/master/assets/orange.png?raw=true)



heat-calendar is zero dependencies implementation of heatmap-calendar for React

## Setup

Install the npm module with npm, yarn or pnpm:

```bash
npm i heat-calendar
```

```bash
yarn add heat-calendar
```

```bash
pnpm i heat-calendar
```

## Usage

Import the component:

```javascript
import { HeatCalendar } from 'heat-calendar';
```

To show a basic heatmap pass the data collection as `data` and `dataKey` name of the selected attribute in your collection. [Check the demo for more examples](https://64933d96f051a7fde266e6dd-zcvvezwjhb.chromatic.com/?path=/docs/heat-calendar--docs)


```javascript
function App() {
  return (
    <div>
      <HeatCalendar
        data={[["2023-01-01", { key: 1, key2: 1 }], ["2023-01-02", { key: 2, key2: 1}], ....]}
        dataKey="key"
      />
    </div>
  );
}
```

## Storybook
[Check the demo!](https://64933d96f051a7fde266e6dd-zcvvezwjhb.chromatic.com/?path=/docs/heat-calendar--docs)


## Features

Available modes:
  - weeks
  - days of the year
  - days of the month

Customizable elements:
  - legend
  - horizontal labels
  - vertical labels
  - nodes

## License

heat-calendar is licensed under a [MIT License](./LICENSE).
