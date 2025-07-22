import { useState } from 'react';

function rc4DecryptHex(hexCipher: string, key: string): string {
  const S = new Array(256);
  const K = new Array(256);
  const keyLength = key.length;

  for (let i = 0; i < 256; i++) {
    S[i] = i;
    K[i] = key.charCodeAt(i % keyLength);
  }

  let j = 0;
  for (let i = 0; i < 256; i++) {
    j = (j + S[i] + K[i]) % 256;
    [S[i], S[j]] = [S[j], S[i]];
  }

  const cipherBytes: number[] = [];
  for (let i = 0; i < hexCipher.length; i += 2) {
    cipherBytes.push(parseInt(hexCipher.substr(i, 2), 16));
  }

  let i = 0;
  j = 0;
  const plaintextBytes: number[] = [];

  for (let c = 0; c < cipherBytes.length; c++) {
    i = (i + 1) % 256;
    j = (j + S[i]) % 256;
    [S[i], S[j]] = [S[j], S[i]];
    const t = (S[i] + S[j]) % 256;
    const k = S[t];
    plaintextBytes.push(cipherBytes[c] ^ k);
  }

  return String.fromCharCode(...plaintextBytes);
}

export default function RC4Decrypt() {
  const [ciphertext, setCiphertext] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');

  const handleDecrypt = () => {
    try {
      const plain = rc4DecryptHex(ciphertext.trim(), key);
      setResult(plain);
    } catch (error) {
      setResult('Lỗi giải mã: ' + (error as Error).message);
    }
  };

  return (
    <div className='row'>
      <input type="text" placeholder="Nhập ciphertext" value={ciphertext} onChange={(e) => setCiphertext(e.target.value)} className="form_input_encrypt" />
      <input type="text" placeholder="Nhập key" value={key} onChange={(e) => setKey(e.target.value)} className="form_input_encrypt" />
      <button onClick={handleDecrypt} className="btn_encrypt">Giải mã</button>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '10px'}}>
        <div className='result_encrypt'><strong>Kết quả: </strong>{result}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fecf59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </div>
    </div>
  );
};


