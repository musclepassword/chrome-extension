import { Dropdown, Space } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";

const SelectLang = () => {
    const { i18n } = useTranslation();

    const changeLang = (lang) => {
        i18n.changeLanguage(lang);
    };

    const selectLang = localStorage.getItem('i18nextLng') || 'tr-TR';
    const languageLabels = [
        { key: 'tr-TR', value: 'Türkçe' },
        { key: 'en-US', value: 'English' }
    ];

    const langMenu = languageLabels.map(locale => (
        {
            key: locale.key,
            label: (
                locale.value
            ),
            onClick: () => changeLang(locale.key)
        }
    ));

    return (
        <Dropdown menu={{ items: langMenu, selectedKeys: selectLang }} placement="bottomRight" arrow>
            <Space>
                <GlobalOutlined />
            </Space>
        </Dropdown>
    );
}

export default SelectLang;