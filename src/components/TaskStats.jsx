import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function TaskStats({ tasks }) {
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.length - completed;

  const data = [
    { name: 'Completed', value: completed },
    { name: 'Pending', value: pending }
  ];

  const COLORS = ['#2e7d32', '#ef6c00'];

  return (
    <div style={{ width: '100%', height: 300, background: 'var(--card-bg)', borderRadius: '8px', padding: '1rem', border: '1px solid var(--border-color)' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-color)' }}>Task Progress</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
