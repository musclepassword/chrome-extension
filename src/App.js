import React from "react";
import GeneratePassword from "./components/GeneratePassword";
import History from "./components/History";
import { Tabs } from 'antd';
import './assets/style/global.scss';

function App() {
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        tabPosition="top"
        className="tabs"
        type="card"
        size="large"
        animated
        centered
        items={
          [
            {
              key: '1',
              label: 'Generator',
              children: <GeneratePassword />,
            },
            {
              key: '2',
              label: 'History',
              children: <History />,
            }
          ]
        }
      />
    </>
  );
}

export default App;