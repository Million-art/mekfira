import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Piechart } from './piChart';
const data = [
  {
    month: 'Jan',
    total: 5327
  },
  {
    month: 'Feb',
    total: 2654
  },
  {
    month: 'Mar',
    total: 5839
  },
  {
    month: 'Apr',
    total: 4120
  },
  {
    month: 'May',
    total: 3789
  },
  {
    month: 'Jun',
    total: 2997
  },
  {
    month: 'Jul',
    total: 4672
  },
  {
    month: 'Aug',
    total: 1523
  },
  {
    month: 'Sep',
    total: 5487
  },
  {
    month: 'Oct',
    total: 3701
  },
  {
    month: 'Nov',
    total: 6012
  },
  {
    month: 'Dec',
    total: 4398
  }
];

export default function MyChart() {
  const colors = ['#133E87'];

  return (
    <div className='flex flex-col h-[100%]'>
    <Piechart />
      <ResponsiveContainer width="100%"  className='flex flex-auto  ' >
        <BarChart data={data}>
          <XAxis
            dataKey="month"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            domain={[0, 6000]}
            ticks={[1500, 3000, 4500, 6000]}
          />
          <Bar
            dataKey="total"
            fill={colors[0]}
            radius={[4, 4, 0, 0]}
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
