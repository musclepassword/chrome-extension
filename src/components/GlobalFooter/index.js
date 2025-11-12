import { Flex, Layout, Typography, Button } from 'antd';
import { useTheme } from '../../theme';

const { Footer } = Layout;
const { Title } = Typography;

const GlobalFooter = () => {
    const { isDarkMode } = useTheme();

    const headerStyle = {
        background: isDarkMode ? '#141414' : '#fff',
        padding: '0 24px',
        height: '100%',
    };

    return (
        <Footer style={headerStyle}>
            <Flex justify="center">
                <Button href='http://musclepassword.com' type='link' target='_blank'>musclepassword.com</Button>
            </Flex>
        </Footer>
    );
};

export default GlobalFooter;