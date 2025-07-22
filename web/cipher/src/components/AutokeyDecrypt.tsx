import { useState } from 'react';

const AutokeyDecrypt = () => {
  const [cipherText, setCipherText] = useState('');
  const [key, setKey] = useState('');
  const [plainText, setPlainText] = useState('');

  const handleDecrypt = () => {
    const result = autokeyDecrypt(cipherText, key);
    setPlainText(result);
  };

  const autokeyDecrypt = (cipher: string, keyword: string): string => {
    let result = '';
    let fullKey = keyword.toUpperCase().replace(/[^A-Z]/g, '');
    cipher = cipher.toUpperCase().replace(/[^A-Z]/g, '');

    for (let i = 0; i < cipher.length; i++) {
      const c = cipher.charCodeAt(i) - 65;
      const k = fullKey.charCodeAt(i) - 65;
      const decryptedChar = String.fromCharCode(((c - k + 26) % 26) + 65);
      result += decryptedChar;
      fullKey += decryptedChar;
    }

    return result;
  };

  return (
    <div className='row'>
      <input type="text" value={cipherText} placeholder="Nhập ciphertext" onChange={(e) => setCipherText(e.target.value)} className="form_input_encrypt" />
      <input type="text" value={key} placeholder="Nhập key" onChange={(e) => setKey(e.target.value)} className="form_input_encrypt" />
      <button onClick={handleDecrypt} className="btn_encrypt">Giải mã</button>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '10px'}}>
        <div className='result_encrypt'><strong>Kết quả: </strong>{plainText}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fecf59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </div>
    </div>
  );
};

export default AutokeyDecrypt;
