import { Button } from 'antd';
import logo from '../../assets/images/logo.png';
import { InfoCircleTwoTone } from '@ant-design/icons';

const Header = () => {

    const handleClick = () => {
        window.open('http://musclepassword.com', '_blank');
    };

    return (
        <div className="container">
            <header>
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <span>
                        <h1><span>MUSCLE</span><br /> PASSWORD</h1>
                    </span>
                </div>
                <Button type="link" onClick={handleClick}>
                    <InfoCircleTwoTone />
                </Button>
            </header>
        </div>
    );
}

export default Header;