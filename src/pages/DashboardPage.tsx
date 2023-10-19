import { Grid, List, Card } from 'antd-mobile';
import { useEffect, useState } from 'react';
import { getBalanceByAddress, getAllAddress, getNames } from '../utils';
import { BigNumber } from 'ethers';

export const _users = [
  {
    id: '1',
    name: 'Novalee',
    address: '0xe24496cf12fceecd42c995d7e14879589bfbdde0',
  },
];

function DashboardPage() {
  const [users, setUsers] = useState<any[]>();

  useEffect(() => {
    const updateUsersWithBalance = async function () {
      const data: { name: string; address: string; balance: string }[] = [];
      const addresses = await getAllAddress();
      const namePromiseList = [];
      const balancePromiseList = [];

      for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i];

        namePromiseList.push(getNames(address));
        balancePromiseList.push(getBalanceByAddress(address));
      }

      Promise.all([
        Promise.all<string>(namePromiseList),
        Promise.all<BigNumber>(balancePromiseList),
      ]).then(([nameList, balanceList]) => {
        for (let i = 0; i < addresses.length; i++) {
          data.push({
            name: nameList[i],
            balance: balanceList[i].toString(),
            address: addresses[i],
          });
        }

        setUsers(data);
      });
    };

    updateUsersWithBalance();
    const interval = setInterval(() => {
      updateUsersWithBalance();
    }, 30_000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        background: '#dddddd',
        padding: '30px 100px',
        height: '100vh',
        boxSizing: 'border-box',
      }}>
      <Card>
        <List>
          {users?.map((user) => (
            <List.Item key={user.name}>
              <Grid columns={12} gap={8}>
                <Grid.Item span={1}>{user.name}</Grid.Item>
                <Grid.Item span={3} style={{ textAlign: 'right' }}>
                  {user.balance}
                </Grid.Item>
                <Grid.Item span={8} style={{ textAlign: 'right' }}>
                  {user.address}
                </Grid.Item>
              </Grid>
            </List.Item>
          ))}
        </List>
      </Card>
    </div>
  );
}

export default DashboardPage;
