import React, { useState } from 'react';

const AffineCipher: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [a, setA] = useState(5); 
  const [b, setB] = useState(8); 
  const [result, setResult] = useState('');

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const isCoprime26 = (a: number): boolean => {
    return gcd(a, 26) === 1;
  };

  const affineEncrypt = (text: string, a: number, b: number): string => {
    if (!isCoprime26(a)) {
      return 'Tham số a phải nguyên tố cùng nhau với 26.';
    }

    let result = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (/[a-zA-Z]/.test(char)) {
        const base = char >= 'A' && char <= 'Z' ? 65 : 97;
        const x = char.charCodeAt(0) - base;
        const encrypted = (a * x + b) % 26;
        result += String.fromCharCode(encrypted + base);
      } else {
        result += char;
      }
    }

    return result;
  };

  const handleEncrypt = () => {
    const encrypted = affineEncrypt(inputText, a, b);
    setResult(encrypted);
  };

  return (
    <div className='row'>
      <input type="text" placeholder="Nhập văn bản" value={inputText} onChange={(e) => setInputText(e.target.value)} className="form_input_encrypt" />
      <input type="number" placeholder="Nhập a (nguyên tố cùng 26)" value={a} onChange={(e) => setA(parseInt(e.target.value))} className="form_input_encrypt" />
      <input type="number" placeholder="Nhập b" value={b} onChange={(e) => setB(parseInt(e.target.value))} className="form_input_encrypt" />
      <button onClick={handleEncrypt} className="btn_encrypt">Mã hóa</button>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '10px'}}>
        <div className='result_encrypt'><strong>Kết quả: </strong>{result}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fecf59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </div>
    </div>
  );
};

export default AffineCipher;
