import './AdminPage.css';

import { Button, Input, Form } from 'antd-mobile';
import { useState } from 'react';
import { face } from '../face';
import { ethers, BigNumber } from 'ethers';
import { contractAbi, contractAddress } from '../contract';
import { getParticipantsMap } from '../utils';

function AdminPage() {
  const [gameId, setGameId] = useState<string>('');
  const [participants, setParticipants] = useState<{ [key: string]: BigNumber }>();

  const createGame = async () => {
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
  const getGame = async () => {
    try {
      setParticipants(await getParticipantsMap(gameId));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="AdminPage">
      <Form layout="horizontal">
        <Form.Item
          label="게임 ID"
          name="username"
          extra={<Button onClick={createGame}>게임 생성</Button>}>
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
      </Form>
      <Button onClick={getGame}>게임 정보</Button>
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
