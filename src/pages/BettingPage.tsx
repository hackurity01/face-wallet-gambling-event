import './BettingPage.css';

import { useEffect, useState } from 'react';
import { Button, Input, Space, Popup, Form } from 'antd-mobile';
import { face, network } from '../face';
import { bet, getParticipantsMap, numberWithCommas, getGame } from '../utils';
import { BigNumber } from 'ethers';

function BettingPage() {
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [gameId, setGameId] = useState<string>('');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [participants, setParticipants] = useState<{ [key: string]: BigNumber }>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      const isLoggedIn = await face.auth.isLoggedIn();
      if (!isLoggedIn) {
        try {
          const response = await face.auth.login();
          if (response) {
            setIsLoggedIn(true);
          }
        } catch (e) {
          console.error(e);
        }
      }
    })();
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="BettingPage">
        <Button
          className="BettingPage__loginBtn"
          size="large"
          fill="none"
          onClick={async () => {
            try {
              const response = await face.auth.login();
              if (response) {
                setIsLoggedIn(true);
              }
            } catch (e) {
              console.error(e);
            }
          }}>
          로그인
        </Button>
      </div>
    );
  }

  const handleBet = async (amount: string) => {
    if (!gameId) {
      alert('게임 ID를 입력해주세요.');
      return;
    }
    const { initialized, winner } = await getGame(gameId);
    if (!initialized) {
      alert('없는 게임 ID 입니다.');
      return;
    }
    if (!BigNumber.from(winner).eq(0)) {
      alert('이미 종료된 게임입니다.');
      return;
    }
    try {
      await bet(gameId, amount);
    } catch (e) {
      console.error(e);
    }
  };

  const handleGetReward = async () => {
    if (!gameId) {
      alert('게임 ID를 입력해주세요.');
      return;
    }
    const { initialized, winner } = await getGame(gameId);
    if (!initialized) {
      alert('없는 게임 ID 입니다.');
      return;
    }
    if (!BigNumber.from(winner).eq(0)) {
      alert('이미 종료된 게임입니다.');
      return;
    }
    try {
      setParticipants(await getParticipantsMap(gameId));
    } catch (e) {
      console.error(e);
    }
  };

  const totalAmount = participants
    ? Object.values(participants)
        .reduce((p, c) => p.add(c), BigNumber.from(0))
        .toString()
    : undefined;

  return (
    <div className="BettingPage">
      <div className="BettingPage__header">
        <Button
          className="BettingPage__header__btn"
          size="small"
          shape="rectangular"
          fill="none"
          onClick={() => {
            face.wallet.home({ networks: [network] });
          }}>
          home
        </Button>
        <Button
          className="BettingPage__header__btn"
          size="small"
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

        <Space className="BettingPage__body__btnGroup">
          <Button
            className="BettingPage__header__btn"
            size="large"
            fill="none"
            onClick={handleGetReward}>
            판돈 보기
          </Button>
          <Button
            className="BettingPage__body__bettingBtn"
            size="large"
            color="warning"
            onClick={() => {
              setPopupVisible(true);
            }}>
            배팅하기
          </Button>
        </Space>

        {totalAmount !== undefined && (
          <div className="BettingPage__body__reward">총 {numberWithCommas(totalAmount)} Unit</div>
        )}

        <Popup
          visible={popupVisible}
          onMaskClick={() => {
            setPopupVisible(false);
          }}
          onClose={() => {
            setPopupVisible(false);
          }}
          position="bottom"
          bodyStyle={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
          <div className="BettingPage__popover">
            <Button
              onClick={() => {
                handleBet('5');
                setPopupVisible(false);
              }}>
              5 Unit
            </Button>
            <Button
              onClick={() => {
                handleBet('10');
                setPopupVisible(false);
              }}>
              10 Unit
            </Button>
            <Button
              onClick={() => {
                handleBet('15');
                setPopupVisible(false);
              }}>
              15 Unit
            </Button>
          </div>
          <div style={{ paddingBottom: 100 }}>
            <Form layout="horizontal">
              <Form.Item
                label="직접 입력"
                extra={
                  <div>
                    Unit
                    <Button
                      style={{ marginLeft: 20 }}
                      onClick={() => {
                        if (!customAmount) {
                          return;
                        }
                        handleBet(customAmount);
                        setPopupVisible(false);
                      }}>
                      배팅
                    </Button>
                  </div>
                }>
                <Input
                  style={{ '--text-align': 'right' }}
                  clearable
                  placeholder="0"
                  value={customAmount}
                  onChange={(val) => {
                    setCustomAmount(val);
                  }}
                  maxLength={4}
                />
              </Form.Item>
            </Form>
          </div>
        </Popup>
      </div>
    </div>
  );
}

export default BettingPage;
