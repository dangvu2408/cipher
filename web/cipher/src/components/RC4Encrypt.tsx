import React, { useState } from 'react';

const RC4Cipher: React.FC = () => {
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState('');
  const [ciphertext, setCiphertext] = useState('');

  const rc4Encrypt = (text: string, key: string): string => {
    const S = new Array(256);
    const K = new Array(256);

    for (let i = 0; i < 256; i++) {
      S[i] = i;
      K[i] = key.charCodeAt(i % key.length);
    }

    // KSA
    let j = 0;
    for (let i = 0; i < 256; i++) {
      j = (j + S[i] + K[i]) % 256;
      [S[i], S[j]] = [S[j], S[i]];
    }

    // PRGA
    let i = 0;
    j = 0;
    let result = '';
    for (let c = 0; c < text.length; c++) {
      i = (i + 1) % 256;
      j = (j + S[i]) % 256;
      [S[i], S[j]] = [S[j], S[i]];
      const t = (S[i] + S[j]) % 256;
      const k = S[t];
      const encryptedChar = text.charCodeAt(c) ^ k;
      result += encryptedChar.toString(16).padStart(2, '0').toUpperCase();
    }

    return result;
  };

  const handleEncrypt = () => {
    const encrypted = rc4Encrypt(plaintext, key);
    setCiphertext(encrypted);
  };

  return (
    <div className='row'>
      <input type="text" placeholder="Nhập văn bản" value={plaintext} onChange={(e) => setPlaintext(e.target.value)} className="form_input_encrypt" />
      <input type="text" placeholder="Nhập khóa" value={key} onChange={(e) => setKey(e.target.value)} className="form_input_encrypt" />
      <button onClick={handleEncrypt} className="btn_encrypt">Mã hóa</button>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '10px'}}>
        <div className='result_encrypt'><strong>Kết quả: </strong>{ciphertext}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fecf59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </div>
    </div>
  );
};

export default RC4Cipher;
