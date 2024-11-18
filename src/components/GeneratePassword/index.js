import { useState, useEffect } from 'react';
import { Button, Input, Switch, Slider, Tooltip } from 'antd';
import { CopyOutlined, CheckOutlined, SyncOutlined, ArrowRightOutlined } from '@ant-design/icons';

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

export default function GeneratePassword() {
    const [password, setPassword] = useState("");
    const [length, setLength] = useState(15);
    const [copied, setCopied] = useState(false);
    const [insert, setInsert] = useState(false);
    const [checkBoxList, setCheckBoxList] = useState([
        { name: 'Uppercase', value: 'ABC', default: true, character: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
        { name: 'Lowercase', value: 'abc', default: true, character: 'abcdefghijklmnopqrstuvwxyz' },
        { name: 'Digits', value: '123', default: true, character: '0123456789' },
        { name: 'Symbols', value: '#$&', default: false, character: '!@#$%^&' },
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

        let initialPassword = "";
        for (var i = 0, n = char.length; i < initialLength; ++i) {
            initialPassword += char.charAt(Math.floor(Math.random() * n));
        }
        setPassword(initialPassword);
    };

    const copyClipboard = () => {
        navigator.clipboard.writeText(password);

        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
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

    const insertPassword = () => {
        setInsert(true);
        setTimeout(() => setInsert(false), 2000);

        /* eslint-disable no-undef */

        chrome.runtime.sendMessage({ type: 'SET_PASSWORD', password: password });

        /* eslint-enable no-undef */

    }

    return (
        <div className="container">
            <section className="generate-password">
                <div className="input-password">
                    <Input className="input-text" type="text" variant="borderless" value={password} />
                    <Tooltip title="Copy">
                        <Button className="button-transparent" type="link" onClick={() => copyClipboard()}>
                            {copied ? <CheckOutlined /> : <CopyOutlined />}
                        </Button>
                    </Tooltip>
                    {
                        true &&
                        <Tooltip title="Insert and Copy">
                            <Button className="button-transparent" type="link" onClick={() => insertPassword()}>
                                {insert ? <CheckOutlined /> : <ArrowRightOutlined />}
                            </Button>
                        </Tooltip>
                    }
                    <Button className="sync-button" type="primary" onClick={() => generatePassword()}>
                        <SyncOutlined />
                    </Button>
                </div>
                <div className="input-range">
                    <Slider
                        defaultValue={value}
                        onChange={(e) => setValue(e) || generatePassword(e)}
                        className="slider"
                        min={4}
                        max={32}
                        styles={{
                            track: {
                                background: 'transparent',
                            },
                            tracks: {
                                background: `${`linear-gradient(to left, ${getGradientColor(start)} 0%, ${getGradientColor(
                                    end,
                                )} 100%)`}`,
                            },
                        }}
                    />
                    <b>{length}</b>
                </div>
                <div className="char-checkbox">
                    {checkBoxList.map((item, key) => (
                        <div>
                            <span>{item.name + ' (' + item.value + ')'}</span>
                            <Switch
                                key={key}
                                defaultValue={item.default}
                                onChange={(e) => {
                                    handleCheckboxChange(item.value, e);
                                }}
                            />
                        </div>
                    ))}
                </div>
                <Button type="primary" className="copy-button" onClick={() => generatePassword()}>
                    Generate
                </Button>
            </section >
        </div >
    );
}