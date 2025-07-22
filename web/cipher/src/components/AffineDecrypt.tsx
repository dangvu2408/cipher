import { useState } from 'react';

const AffineDecrypt = () => {
  const [cipherText, setCipherText] = useState('');
  const [a, setA] = useState(5);   
  const [b, setB] = useState(8);
  const [plainText, setPlainText] = useState('');

  const handleDecrypt = () => {
    const result = affineDecrypt(cipherText, a, b);
    setPlainText(result);
  };

  const modInverse = (a: number, m: number): number => {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    throw new Error("Không tồn tại nghịch đảo modular");
  };

  const affineDecrypt = (cipher: string, a: number, b: number): string => {
    const m = 26;
    let result = '';
    let a_inv = modInverse(a, m);

    for (let char of cipher) {
      if (char >= 'A' && char <= 'Z') {
        const x = char.charCodeAt(0) - 65;
        const decrypted = (a_inv * (x - b + m)) % m;
        result += String.fromCharCode(decrypted + 65);
      } else if (char >= 'a' && char <= 'z') {
        const x = char.charCodeAt(0) - 97;
        const decrypted = (a_inv * (x - b + m)) % m;
        result += String.fromCharCode(decrypted + 97);
      } else {
        result += char;
      }
    }

    return result;
  };

  return (
    <div className='row'>
      <input type="text" value={cipherText} placeholder="Nhập ciphertext" onChange={(e) => setCipherText(e.target.value)} className="form_input_encrypt" />

      <input type="number" value={a} placeholder="Nhập a" onChange={(e) => setA(parseInt(e.target.value))} className="form_input_encrypt" />
      <input type="number" value={b} placeholder="Nhập b" onChange={(e) => setB(parseInt(e.target.value))} className="form_input_encrypt" />
      <button onClick={handleDecrypt} className="btn_encrypt">Giải mã</button>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '10px'}}>
        <div className='result_encrypt'><strong>Kết quả: </strong>{plainText}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fecf59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </div>
    </div>
  );
};

export default AffineDecrypt;
