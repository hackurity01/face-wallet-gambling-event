import './BettingPage.css';

import { useEffect, useState } from 'react';
import { Button, Input } from 'antd-mobile';
import { face, network } from '../face';
import { ethers, BigNumber } from 'ethers';
import { contractAbi, contractAddress } from '../contract';
import { bet } from '../utils';

function BettingPage() {
  const [gameId, setGameId] = useState<string>('');

  useEffect(() => {
    (async function () {
      const isLoggedIn = await face.auth.isLoggedIn();
      if (!isLoggedIn) {
        await face.auth.login();
      }
    })();
  }, []);

  const handleBet = () => {
    const amount = '1';
    bet(gameId, amount);
  };

  return (
    <div className="BettingPage">
      <div className="BettingPage__header">
        <Button
          className="BettingPage__header__btn"
          size="mini"
          shape="rectangular"
          fill="none"
          onClick={() => {
            face.wallet.home({ networks: [network] });
          }}>
          home
        </Button>
        <Button
          className="BettingPage__header__btn"
          size="mini"
          shape="rectangular"
          fill="none"
          onClick={() => {
            face.auth.logout();
          }}>
          logout
        </Button>
      </div>
      <div className="BettingPage__body">
        <Input
          className="BettingPage__body__gameId-wrapper"
          placeholder="0000"
          value={gameId}
          onChange={(val) => {
            const text = val.replace(/(?!\d).*/gi, '');
            setGameId(text);
          }}
          maxLength={4}
        />
        <Button onClick={handleBet}>배팅하기</Button>
      </div>
    </div>
  );
}

export default BettingPage;
