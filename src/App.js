import React from "react";
import Header from "./components/Header";
import GeneratePassword from "./components/GeneratePassword";
import History from "./components/History";
import { Radio, Tabs } from 'antd';
import './assets/style/global.scss';

function App() {
  return (
    <>
      {/* <Header /> */}
      <Tabs
        defaultActiveKey="1"
        tabPosition="top"
        className="tabs"
        type="card"
        size="middle"
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