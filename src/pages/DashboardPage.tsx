import { Grid, List, Card } from 'antd-mobile';
import { useEffect } from 'react';

export const users = [
  {
    id: '1',
    name: 'Novalee',
    address: '0xe24496cf12fceecd42c995d7e14879589bfbdde0',
    amount: '123',
  },
];

function DashboardPage() {
  useEffect(() => {
    // users;
  }, []);

  return (
    <div
      style={{
        background: '#dddddd',
        padding: '30px 180px',
        height: '100vh',
        boxSizing: 'border-box',
      }}>
      <Card>
        <List>
          {users.map((user) => (
            <List.Item key={user.name}>
              <Grid columns={12} gap={8}>
                <Grid.Item span={3}>{user.name}</Grid.Item>
                <Grid.Item span={6}>{user.address}</Grid.Item>
                <Grid.Item span={3}>{user.amount}</Grid.Item>
              </Grid>
            </List.Item>
          ))}
        </List>
      </Card>
    </div>
  );
}

export default DashboardPage;
