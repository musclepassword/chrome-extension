import React, { useEffect, useState } from "react";
import { Button, Input, Checkbox, Slider, Tooltip } from 'antd';
import { SyncOutlined, CopyOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useTranslation } from "react-i18next";

const getGradientColor = (percentage) => {
    const startColor = [135, 208, 104];
    const endColor = [255, 204, 199];
    const midColor = startColor.map((start, i) => {
        const end = endColor[i];
        const delta = end - start;
        return (start + delta * percentage).toFixed(0);
    });
    return `rgb(${midColor.join(',')})`;
}

const GeneratePassword = () => {
    const { i18n } = useTranslation();
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(15);
    const [checkBoxList, setCheckBoxList] = useState([
        { name: 'uppercase', value: 'ABC', default: true, character: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
        { name: 'lowercase', value: 'abc', default: true, character: 'abcdefghijklmnopqrstuvwxyz' },
        { name: 'digits', value: '123', default: true, character: '0123456789' },
        { name: 'symbols', value: '#$&', default: false, character: '!@#$%^&' },
    ]);
    const [char, setChar] = useState(() => {
        let initialChar = '';
        checkBoxList.map(item => {
            if (item.default) {
                initialChar += item.character;
            }
        });
        return initialChar;
    });
    const [value, setValue] = useState([15, 100]);
    const start = value[0] / 100;
    const end = value[value.length - 1] / 100;

    useEffect(() => {
        generatePassword();
    }, []);

    useEffect(() => {
        charChange();
    }, [checkBoxList]);

    const generatePassword = (e) => {
        setLength(e ? e : length);
        let initialLength = e ? e : length;

        let retVal = "";
        for (var i = 0, n = char.length; i < initialLength; ++i) {
            retVal += char.charAt(Math.floor(Math.random() * n));
        }
        setPassword(retVal);
    };

    const copyClipboard = () => {
        navigator.clipboard.writeText(password);
    };

    const handleCheckboxChange = (value, checked) => {
        setCheckBoxList(prevState => {
            const updatedList = prevState.map(item => {
                if (item.value === value) {
                    return { ...item, default: checked };
                }
                return item;
            });
            return updatedList;
        });
    };

    const charChange = () => {
        let updatedChar = '';
        checkBoxList.map(item => {
            if (item.default) {
                updatedChar += item.character;
            }
        });
        setChar(updatedChar);
    };

    return (
        <section className="generate-password">
            <div className="container">
                <h1>{i18n.t('generate_password_title')}</h1>
                <p>{i18n.t('generate_password_desc')}</p>
                <div className="input-range">
                    <label>{i18n.t('password_length') + ': '}<b>{length}</b></label>
                    <Slider
                        defaultValue={value}
                        onChange={(e) => setValue(e) || generatePassword(e)}
                        className="slider"
                        min={3}
                        max={50}
                        styles={{
                            track: {
                                background: 'transparent',
                            },
                            tracks: {
                                background: `linear-gradient(to left, ${getGradientColor(start)} 0%, ${getGradientColor(
                                    end,
                                )} 100%)`,
                            },
                        }}
                    />
                </div>
                <div className="input-password">
                    <Input className="input-text" type="text" variant="borderless" value={password} />
                    <Tooltip title={<span><CheckCircleOutlined /> {i18n.t('password_copied')}</span>} color="green" trigger="click">
                        <Button className="button-transparent" type="link" onClick={() => copyClipboard()}>
                            <CopyOutlined style={{ fontSize: 20 }} />
                        </Button>
                    </Tooltip>
                    <Button className="sync-button" type="primary" onClick={() => generatePassword()}>
                        <SyncOutlined style={{ fontSize: 20 }} />
                    </Button>
                </div>
                <div className="char-checkbox">
                    {checkBoxList.map((item, key) => (
                        <Checkbox
                            key={key}
                            checked={item.default}
                            onChange={(e) => {
                                handleCheckboxChange(item.value, e.target.checked);
                            }}
                        >
                            {i18n.t(item.name)}
                        </Checkbox>
                    ))}
                </div>
                <Tooltip title={<span><CheckCircleOutlined /> {i18n.t('password_copied')}</span>} trigger="click">
                    <Button type="primary" className="copy-button" onClick={() => copyClipboard()}>
                        {i18n.t('copy_password')}
                    </Button>
                </Tooltip>
            </div>
        </section>
    );
}

export default GeneratePassword;