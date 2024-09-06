import React from "react";
import Header from "./components/Header";
import GeneratePassword from "./components/GeneratePassword";
import { Radio, Tabs } from 'antd';
import './assets/style/global.scss';

function App() {
  return (
    <>
      <Header />
      
      <Tabs
        defaultActiveKey="1"
        tabPosition="top"
        style={{
          height: 220,
        }}
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
              children: 'Content of Tab Pane 1',
            }
          ]
        }
      />
    </>
  );
}

export default App;