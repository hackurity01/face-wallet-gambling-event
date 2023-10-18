import { useState } from 'react';
import './App.css';
import { Button, AutoCenter, Input } from 'antd-mobile';

function App() {
  const [code, setCode] = useState<string>('');

  return (
    <div className="App">
      {/* <div style={{ background: "#ace0ff" }}>
        <SafeArea position="top" />
      </div> */}

      <AutoCenter>
        <div>
          <Input
            placeholder="게임 코드를 입력해주세요"
            value={code}
            onChange={(val) => {
              setCode(val);
            }}
          />
          <Button>asfd</Button>
        </div>
      </AutoCenter>
      {/* <div style={{ background: "#ffcfac" }}>
        <SafeArea position="bottom" />
      </div> */}
    </div>
  );
}

export default App;
