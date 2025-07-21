import React, { useState } from 'react';

const AutokeyCipher: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');

  const cleanText = (text: string) => text.replace(/[^a-zA-Z]/g, '');

  const autokeyEncrypt = (text: string, keyText: string): string => {
    let plaintext = cleanText(text).toLowerCase();
    let keyStream = (keyText + plaintext).slice(0, plaintext.length).toLowerCase();
    let result = '';

    let j = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (/[a-zA-Z]/.test(char)) {
        const base = char >= 'A' && char <= 'Z' ? 65 : 97;
        const plainCharCode = char.charCodeAt(0) - base;
        const keyCharCode = keyStream[j].charCodeAt(0) - 97;
        const encryptedChar = String.fromCharCode(((plainCharCode + keyCharCode) % 26) + base);
        result += encryptedChar;
        j++;
      } else {
        result += char;
      }
    }

    return result;
  };

  const handleEncrypt = () => {
    setResult(autokeyEncrypt(inputText, key));
  };

  return (
    <div className='row'>
        <input type="text" placeholder="Nhập văn bản" value={inputText} onChange={(e) => setInputText(e.target.value)} className="form_input_encrypt" />
        <input type="text" placeholder="Nhập khóa" value={key} onChange={(e) => setKey(e.target.value)} className="form_input_encrypt" />
        <button onClick={handleEncrypt} className="btn_encrypt">Mã hóa</button>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '10px'}}>
        <div className='result_encrypt'><strong>Kết quả: </strong>{result}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fecf59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </div>
    </div>
  );
};

export default AutokeyCipher;
