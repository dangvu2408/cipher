import React, { useState } from 'react';

const HillCipher: React.FC = () => {
  const [text, setText] = useState('');
  const [key, setKey] = useState('3 3 2 5'); // mặc định ma trận 2x2
  const [result, setResult] = useState('');

  const mod = (n: number, m: number): number => ((n % m) + m) % m;

  const stringToMatrix = (keyString: string): number[][] => {
    const nums = keyString
      .split(/[\s,]+/)
      .map((n) => parseInt(n))
      .filter((n) => !isNaN(n));

    if (nums.length !== 4) return [[0, 0], [0, 0]];

    return [
      [nums[0], nums[1]],
      [nums[2], nums[3]],
    ];
  };

  const letterToNum = (ch: string): number => ch.charCodeAt(0) - 'A'.charCodeAt(0);
  const numToLetter = (n: number): string => String.fromCharCode(n + 'A'.charCodeAt(0));

  const prepareText = (input: string): string[] => {
    let clean = input.toUpperCase().replace(/[^A-Z]/g, '');
    if (clean.length % 2 !== 0) clean += 'X';
    const pairs: string[] = [];
    for (let i = 0; i < clean.length; i += 2) {
      pairs.push(clean[i] + clean[i + 1]);
    }
    return pairs;
  };

  const hillEncrypt = (text: string, keyMatrix: number[][]): string => {
    const pairs = prepareText(text);
    let result = '';

    for (let pair of pairs) {
      const [a, b] = [letterToNum(pair[0]), letterToNum(pair[1])];
      const x =
        mod(a * keyMatrix[0][0] + b * keyMatrix[0][1], 26);
      const y =
        mod(a * keyMatrix[1][0] + b * keyMatrix[1][1], 26);
      result += numToLetter(x) + numToLetter(y);
    }

    return result;
  };

  const handleEncrypt = () => {
    const matrix = stringToMatrix(key);
    const encrypted = hillEncrypt(text, matrix);
    setResult(encrypted);
  };

  return (
    <div className='row'>
      <input type="text" placeholder="Nhập văn bản" value={text} onChange={(e) => setText(e.target.value)} className="form_input_encrypt" />
      <input type="text" placeholder="Nhập khóa: 4 số (vd: 3 3 2 5)" value={key} onChange={(e) => setKey(e.target.value)} className="form_input_encrypt" />
      <button onClick={handleEncrypt} className="btn_encrypt">Mã hóa</button>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '10px'}}>
        <div className='result_encrypt'><strong>Kết quả: </strong>{result}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fecf59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </div>
    </div>
  );
};

export default HillCipher;
