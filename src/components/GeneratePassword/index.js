import { useState, useCallback, useMemo, useEffect } from 'react';
import {
    Button,
    Input,
    Switch,
    Slider,
    Tooltip,
    Card,
    Space,
    message,
    Flex
} from 'antd';
import {
    CopyOutlined,
    CheckOutlined,
    SyncOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';
import { useTheme } from '../../theme';
import strong from '../../assets/images/security.png';
import weak from '../../assets/images/unprotected.png';

export default function GeneratePassword() {
    const { isDarkMode } = useTheme();

    // State management
    const [passwordState, setPasswordState] = useState({
        password: "bU59Hf8NfiGmYoa",
        length: 15,
        strength: 'Strong password',
    });

    const [uiState, setUiState] = useState({
        copied: false,
        insert: false,
    });

    const initialCheckboxList = useMemo(() => [
        {
            name: 'Uppercase',
            value: 'ABC',
            default: true,
            character: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        },
        {
            name: 'Lowercase',
            value: 'abc',
            default: true,
            character: 'abcdefghijklmnopqrstuvwxyz'
        },
        {
            name: 'Digits',
            value: '123',
            default: true,
            character: '0123456789'
        },
        {
            name: 'Symbols',
            value: '#$&',
            default: false,
            character: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        },
    ], []);

    const [checkBoxList, setCheckBoxList] = useState(initialCheckboxList);

    // Memoized character set
    const availableChars = useMemo(() => {
        return checkBoxList
            .filter(item => item.default)
            .map(item => item.character)
            .join('');
    }, [checkBoxList]);

    // Renk için CSS filter hesaplama
    const getSvgFilter = useCallback((color) => {
        // Hex color to filter conversion (basit versiyon)
        const colorMap = {
            '#52c41a': 'invert(47%) sepia(98%) saturate(368%) hue-rotate(72deg) brightness(95%) contrast(89%)',
            '#faad14': 'invert(67%) sepia(90%) saturate(400%) hue-rotate(360deg) brightness(100%) contrast(95%)',
            '#ff4d4f': 'invert(33%) sepia(98%) saturate(1352%) hue-rotate(325deg) brightness(101%) contrast(101%)',
            '#1890ff': 'invert(44%) sepia(98%) saturate(1735%) hue-rotate(185deg) brightness(98%) contrast(101%)'
        };
        
        return colorMap[color] || colorMap['#52c41a'];
    }, []);

    // Password strength evaluation
    const evaluatePassword = useCallback((password) => {
        if (!password) {
            setPasswordState(prev => ({ ...prev, strength: '' }));
            return;
        }

        let score = 0;
        const checks = [
            password.length >= 8,
            password.length >= 12,
            /[a-z]/.test(password) && /[A-Z]/.test(password),
            /\d/.test(password),
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?]/.test(password),
        ];

        score = checks.filter(Boolean).length;

        const strengthConfig = {
            0: { text: 'Very Weak', color: '#ff4d4f', icon: weak },
            1: { text: 'Weak', color: '#ff4d4f', icon: weak },
            2: { text: 'Fair', color: '#faad14', icon: weak },
            3: { text: 'Good', color: '#52c41a', icon: strong },
            4: { text: 'Strong', color: '#52c41a', icon: strong },
            5: { text: 'Very Strong', color: '#1890ff', icon: strong },
        };

        const config = strengthConfig[score] || strengthConfig[0];

        setPasswordState(prev => ({
            ...prev,
            strength: config.text,
            strengthColor: config.color,
            strengthIcon: config.icon,
            strengthFilter: getSvgFilter(config.color)
        }));
    }, [getSvgFilter]);

    // Password generation
    const generatePassword = useCallback((newLength) => {
        const currentLength = newLength ?? passwordState.length;

        if (!availableChars) {
            message.warning('Please select at least one character type');
            return;
        }

        let newPassword = "";
        for (let i = 0; i < currentLength; i++) {
            const randomIndex = Math.floor(Math.random() * availableChars.length);
            newPassword += availableChars.charAt(randomIndex);
        }

        evaluatePassword(newPassword);
        setPasswordState(prev => ({
            ...prev,
            password: newPassword,
            length: currentLength
        }));
    }, [passwordState.length, availableChars, evaluatePassword]);

    // Initial password generation
    useEffect(() => {
        generatePassword();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Copy to clipboard
    const copyClipboard = useCallback(async () => {
        if (!passwordState.password) {
            message.warning('No password to copy');
            return;
        }

        try {
            await navigator.clipboard.writeText(passwordState.password);
            setUiState(prev => ({ ...prev, copied: true }));
            setTimeout(() => setUiState(prev => ({ ...prev, copied: false })), 2000);
            message.success('Password copied to clipboard!');
        } catch (error) {
            console.error('Copy failed:', error);
            message.error('Failed to copy password');
        }
    }, [passwordState.password]);

    // Handle checkbox changes
    const handleCheckboxChange = useCallback((value, checked) => {
        setCheckBoxList(prevState => {
            const updatedList = prevState.map(item =>
                item.value === value ? { ...item, default: checked } : item
            );

            const activeSelections = updatedList.filter(item => item.default).length;

            if (activeSelections === 0) {
                message.warning('At least one character type must be selected');
                return prevState;
            }

            const finalList = updatedList.map(item => ({
                ...item,
                disabled: activeSelections === 1 && !item.default
            }));

            return finalList;
        });
    }, []);

    // Handle slider changes
    const handleSliderChange = useCallback((newValue) => {
        setPasswordState(prev => ({ ...prev, length: newValue }));
        generatePassword(newValue);
    }, [generatePassword]);

    // Insert password functionality
    const insertPassword = useCallback(() => {
        if (!passwordState.password) {
            message.warning('No password to insert');
            return;
        }

        setUiState(prev => ({ ...prev, insert: true }));
        setTimeout(() => setUiState(prev => ({ ...prev, insert: false })), 2000);

        /* eslint-disable no-undef */
        try {
            chrome.runtime.sendMessage({
                type: 'SET_PASSWORD',
                password: passwordState.password
            });
            message.success('Password inserted!');
        } catch (error) {
            console.error('Insert failed:', error);
            message.error('Failed to insert password');
        }
        /* eslint-enable no-undef */
    }, [passwordState.password]);

    const cardStyle = {
        padding: 0,
        border: 0,
        borderRadius: 0,
        background: isDarkMode ? '#141414' : '#fff'
    };

    const textStyle = {
        color: isDarkMode ? '#ffffff' : '#000000'
    };

    return (
        <Card style={cardStyle}>
            <Space.Compact>
                <Input
                    style={{
                        flex: 1,
                        fontSize: '16px',
                        fontWeight: '500',
                        height: '48px',
                        background: isDarkMode ? '#1f1f1f' : '#fff',
                        color: textStyle.color,
                        borderColor: isDarkMode ? '#434343' : '#d9d9d9'
                    }}
                    value={passwordState.password}
                    readOnly
                    placeholder="Click generate to create password"
                    size="large"
                    suffix={
                        <Flex gap="small" wrap>
                            <Tooltip title={uiState.copied ? "Copied!" : "Copy to clipboard"}>
                                <Button
                                    size="small"
                                    icon={uiState.copied ? <CheckOutlined /> : <CopyOutlined />}
                                    onClick={copyClipboard}
                                    type="link"
                                />
                            </Tooltip>
                            <Tooltip title="Insert password">
                                <Button
                                    size="small"
                                    icon={uiState.insert ? <CheckOutlined /> : <ArrowRightOutlined />}
                                    onClick={insertPassword}
                                    type="link"
                                />
                            </Tooltip>
                        </Flex>
                    }
                />
                <Button
                    type="primary"
                    size="large"
                    icon={<SyncOutlined />}
                    onClick={() => generatePassword()}
                    style={{ height: 48 }}
                />
            </Space.Compact>
            <Flex justify="center" align="center" gap="small" style={{ margin: "10px 0" }}>
                <img
                    src={passwordState.strengthIcon}
                    style={{
                        width: '18px',
                        height: '18px',
                        filter: passwordState.strengthFilter
                    }}
                    alt={passwordState.strength}
                />
                <span style={{
                    fontSize: '18px',
                    fontWeight: '500',
                    color: passwordState.strengthColor
                }}>
                    {passwordState.strength}
                </span>
            </Flex>
            <Flex justify="center" style={{ ...textStyle, fontSize: '14px', fontWeight: '500', marginBottom: 10 }}>
                Password Length: {passwordState.length}
            </Flex>
            <Flex justify="center">
                <Slider
                    value={passwordState.length}
                    onChange={handleSliderChange}
                    min={4}
                    max={32}
                    style={{
                        width: 'calc(100% - 60px)',
                    }}
                    tooltip={{ formatter: (value) => `${value} characters` }}
                />
            </Flex>
            <Space direction="vertical" style={{ width: '100%', marginBottom: 20 }}>
                {checkBoxList.map((item) => (
                    <div
                        key={item.value}
                        className="character-option"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '5px 0',
                            opacity: item.disabled ? 0.5 : 1
                        }}
                    >
                        <span style={{ ...textStyle, fontSize: '14px', fontWeight: '500' }}>
                            {item.name} ({item.value})
                        </span>
                        <Switch
                            checked={item.default}
                            disabled={item.disabled}
                            onChange={(checked) => handleCheckboxChange(item.value, checked)}
                            size="small"
                        />
                    </div>
                ))}
            </Space>
            <Button
                type="primary"
                size="large"
                onClick={() => generatePassword()}
                style={{ width: "100%", height: 48 }}
            >Generate</Button>
        </Card>
    );
}