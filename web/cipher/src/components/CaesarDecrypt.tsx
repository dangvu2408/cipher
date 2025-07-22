import { useState } from 'react';

const CaesarDecrypt = () => {
  const [cipherText, setCipherText] = useState('');
  const [key, setKey] = useState(3);
  const [plainText, setPlainText] = useState('');

  const handleDecrypt = () => {
    const result = caesarDecrypt(cipherText, key);
    setPlainText(result);
  };

  const caesarDecrypt = (text: string, key: number): string => {
    let result = '';
    for (const char of text) {
      if (char >= 'A' && char <= 'Z') {
        result += String.fromCharCode(((char.charCodeAt(0) - key - 65 + 26) % 26) + 65);
      } else if (char >= 'a' && char <= 'z') {
        result += String.fromCharCode(((char.charCodeAt(0) - key - 97 + 26) % 26) + 97);
      } else {
        result += char;
      }
    }
    return result;
  };

  return (
    <div className='row'>
      <input type="text" value={cipherText} placeholder="Nhập ciphertext cần giải mã" onChange={(e) => setCipherText(e.target.value)} className="form_input_encrypt" />
      <input type="number" value={key} placeholder="Nhập key" onChange={(e) => setKey(Number(e.target.value))} className="form_input_encrypt" />
      <button onClick={handleDecrypt} className="btn_encrypt">Giải mã</button>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '10px'}}>
        <div className='result_encrypt'><strong>Kết quả: </strong>{plainText}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fecf59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </div>
    </div>
  );
};

export default CaesarDecrypt;
