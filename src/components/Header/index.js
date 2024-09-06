import SelectLang from "../SelectLang";
import { LockOutlined } from "@ant-design/icons";

const Header = () => {

    return (
        <header>
            <div className="logo">
                <b style={{ fontSize: 25 }}><LockOutlined /> Muscle</b> Password
            </div>
            {/* <SelectLang /> */}
        </header>
    );
}

export default Header;