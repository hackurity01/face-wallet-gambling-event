import './AdminPage.css';

import { Button, Input, Form, Space } from 'antd-mobile';
import { useState, useEffect } from 'react';
import { face } from '../face';
import { ethers, BigNumber } from 'ethers';
import { contractAbi, contractAddress } from '../contract';
import { getParticipantsMap, finishGame, getGame } from '../utils';

function AdminPage() {
  const [gameId, setGameId] = useState<string>('');
  const [winnerAddress, setWinnerAddress] = useState<string>('');
  const [participants, setParticipants] = useState<{ [key: string]: BigNumber }>();
  const [gameInitialized, setGameInitialized] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        await face.auth.login();
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const handleCreateGame = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(face.getEthLikeProvider());
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);
      const result = await contract.startGame(BigNumber.from(gameId));

      console.log('result', result);
    } catch (e) {
      console.error(e);
    }
  };
  const handleGetGame = async () => {
    try {
      setWinnerAddress('empty');
      setGameInitialized(false);
      const game = await getGame(gameId);
      console.log('handleGetGame', game);
      setWinnerAddress(game.winner);
      setGameInitialized(game.initialized);
    } catch (e) {
      console.error(e);
    }
  };
  const getParticipants = async () => {
    try {
      setParticipants(await getParticipantsMap(gameId));
    } catch (e) {
      console.error(e);
    }
  };
  const handleFinishGame = async () => {
    try {
      const reward = await finishGame(gameId, winnerAddress);
      console.log(reward);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="AdminPage">
      <Form layout="horizontal">
        <Form.Item label="게임 ID">
          <Input
            clearable
            className="AdminPage__gameId"
            placeholder="0000"
            value={gameId}
            onChange={(val) => {
              setGameId(val);
            }}
            maxLength={4}
          />
        </Form.Item>
        <Form.Item label="승자 주소">
          <Input
            clearable
            className="AdminPage__gameId"
            placeholder="0x00000000000000"
            value={winnerAddress}
            onChange={(val) => {
              setWinnerAddress(val);
            }}
          />
        </Form.Item>
        <Form.Item label="게임 생성됨">
          <span>{String(gameInitialized)}</span>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 30 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space style={{ width: '100%' }} justify="around">
            <Button color="danger" onClick={handleFinishGame}>
              게임 종료
            </Button>
            <Button color="primary" onClick={handleCreateGame}>
              게임 생성
            </Button>
          </Space>
          <Space style={{ width: '100%' }} justify="around">
            <Button onClick={handleGetGame}>게임 정보</Button>
            <Button onClick={getParticipants}>참여자 보기</Button>
          </Space>
        </Space>
      </div>

      {participants && (
        <div>
          {Object.keys(participants).map((address) => (
            <div key={address}>
              {address}: {participants[address].toString()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPage;
