import Header from './components/Header';
import GeneratePassword from './components/GeneratePassword';
import { ConfigProvider } from 'antd';
import theme from './theme';

export default function App() {
  return (
    <>
      <ConfigProvider theme={theme}>
        <Header />
        <GeneratePassword />
      </ConfigProvider>
    </>
  );
}