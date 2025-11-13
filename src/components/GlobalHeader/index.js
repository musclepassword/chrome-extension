import { Flex, Layout, Typography, Tooltip, Switch, Button } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo.png';
import { useTheme } from '../../theme';

const { Header } = Layout;
const { Title } = Typography;

const GlobalHeader = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    const headerStyle = {
        background: isDarkMode ? '#141414' : '#fff',
        padding: '0 24px',
        height: '64px',
        lineHeight: '64px'
    };

    const textStyle = {
        color: isDarkMode ? '#ffffff' : '#939393',
        margin: 0
    };

    return (
        <Header style={headerStyle}>
            <Flex align="center" justify="space-between" style={{ height: '100%' }}>
                <Flex align="center">
                    <Button href="http://musclepassword.com" type="link" target="_blank" style={{ padding: 0 }}>
                        <img
                            alt="Muscle Password Logo"
                            src={logo}
                            style={{
                                width: 50,
                                height: 50,
                                objectFit: 'contain'
                            }}
                        />
                    </Button>
                    <Flex vertical style={{ lineHeight: '1.2' }}>
                        <Title
                            level={5}
                            style={{
                                ...textStyle,
                                fontSize: '14px',
                                fontWeight: '900'
                            }}
                        >
                            MUSCLE
                        </Title>
                        <Title
                            level={6}
                            style={{
                                ...textStyle,
                                fontSize: '13px',
                                fontWeight: '500'
                            }}
                        >
                            PASSWORD
                        </Title>
                    </Flex>
                </Flex>
                <Flex align="center" gap="small">
                    <Tooltip title={isDarkMode ? "Light mode" : "Dark mode"}>
                        <Switch
                            checked={isDarkMode}
                            onChange={toggleTheme}
                            size="medium"
                            checkedChildren={<MoonOutlined />}
                            unCheckedChildren={<SunOutlined />}
                        />
                    </Tooltip>
                </Flex>
            </Flex>
        </Header>
    );
};

export default GlobalHeader;