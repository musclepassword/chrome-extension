import GlobalHeader from './components/GlobalHeader';
import GeneratePassword from './components/GeneratePassword';
import { ConfigProvider, theme } from 'antd';
import { ThemeProvider, useTheme } from './theme';

function ThemedApp() {
  const { isDarkMode } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#47a4f4',
          colorLink: '#47a4f4',
        }
      }}
    >
      <GlobalHeader />
      <GeneratePassword />
    </ConfigProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}