import { useState } from 'react';

const HillDecrypt = () => {
  const [cipherText, setCipherText] = useState('');
  const [keyMatrixStr, setKeyMatrixStr] = useState(''); // Ví dụ: "3 3 2 5"
  const [plainText, setPlainText] = useState('');

  const modInverse = (a: number, m: number): number => {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) return x;
    }
    throw new Error('Không tồn tại nghịch đảo modular!');
  };

  const inverseMatrix2x2 = (matrix: number[][]): number[][] => {
    const [[a, b], [c, d]] = matrix;
    const det = (a * d - b * c) % 26;
    const detInv = modInverse(det, 26);

    return [
      [(d * detInv) % 26, (-b * detInv + 26) % 26],
      [(-c * detInv + 26) % 26, (a * detInv) % 26],
    ];
  };

  const processText = (text: string): string => {
    let t = text.toUpperCase().replace(/[^A-Z]/g, '');
    if (t.length % 2 !== 0) t += 'X';
    return t;
  };

  const strToMatrix = (str: string): number[][] => {
    const nums = str.trim().split(/\s+/).map(Number);
    if (nums.length !== 4) throw new Error('Key phải là 4 số (ma trận 2x2)');
    return [
      [nums[0], nums[1]],
      [nums[2], nums[3]],
    ];
  };

  const decrypt = (cipher: string, keyStr: string): string => {
    const key = strToMatrix(keyStr);
    const invKey = inverseMatrix2x2(key);
    const cleanText = processText(cipher);

    let result = '';
    for (let i = 0; i < cleanText.length; i += 2) {
      const pair = [
        cleanText.charCodeAt(i) - 65,
        cleanText.charCodeAt(i + 1) - 65,
      ];
      const dec = [
        (invKey[0][0] * pair[0] + invKey[0][1] * pair[1]) % 26,
        (invKey[1][0] * pair[0] + invKey[1][1] * pair[1]) % 26,
      ];
      result += String.fromCharCode(dec[0] + 65) + String.fromCharCode(dec[1] + 65);
    }

    return result;
  };

  const handleDecrypt = () => {
    try {
      const result = decrypt(cipherText, keyMatrixStr);
      setPlainText(result);
    } catch (err) {
      setPlainText('Lỗi: ' + (err as Error).message);
    }
  };

  return (
    <div className='row'>
      <input type="text" placeholder="Nhập ciphertext" value={cipherText} onChange={(e) => setCipherText(e.target.value)} className="form_input_encrypt" />
      <input type="text" placeholder="Nhập khóa ma trận 2x2 (vd: 3 3 2 5)" value={keyMatrixStr} onChange={(e) => setKeyMatrixStr(e.target.value)} className="form_input_encrypt" />
      <button onClick={handleDecrypt} className="btn_encrypt">Giải mã</button>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '10px'}}>
        <div className='result_encrypt'><strong>Kết quả: </strong>{plainText}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fecf59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </div>
    </div>
  );
};

export default HillDecrypt;
