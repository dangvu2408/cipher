import React, { useState } from 'react';

const PlayfairCipher: React.FC = () => {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [result, setResult] = useState('');

  const prepareText = (input: string): string[] => {
    let cleanText = input.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    let result: string[] = [];

    for (let i = 0; i < cleanText.length; i++) {
      let char1 = cleanText[i];
      let char2 = cleanText[i + 1];

      if (!char2) {
        result.push(char1 + 'X');
      } else if (char1 === char2) {
        result.push(char1 + 'X');
      } else {
        result.push(char1 + char2);
        i++;
      }
    }

    return result;
  };

  const generateMatrix = (key: string): string[][] => {
    const seen = new Set<string>();
    const matrix: string[][] = [];
    let cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
    let fullKey = cleanKey + 'ABCDEFGHIKLMNOPQRSTUVWXYZ';

    let unique = Array.from(fullKey).filter((c) => {
      if (!seen.has(c)) {
        seen.add(c);
        return true;
      }
      return false;
    });

    for (let i = 0; i < 5; i++) {
      matrix.push(unique.slice(i * 5, i * 5 + 5));
    }

    return matrix;
  };

  const findPosition = (matrix: string[][], char: string): [number, number] => {
    for (let i = 0; i < 5; i++) {
      let row = matrix[i];
      let j = row.indexOf(char);
      if (j !== -1) return [i, j];
    }
    return [-1, -1];
  };

  const playfairEncrypt = (plaintext: string, key: string): string => {
    const matrix = generateMatrix(key);
    const pairs = prepareText(plaintext);
    let ciphertext = '';

    for (let pair of pairs) {
      let [a, b] = pair;
      let [r1, c1] = findPosition(matrix, a);
      let [r2, c2] = findPosition(matrix, b);

      if (r1 === r2) {
        ciphertext += matrix[r1][(c1 + 1) % 5];
        ciphertext += matrix[r2][(c2 + 1) % 5];
      } else if (c1 === c2) {
        ciphertext += matrix[(r1 + 1) % 5][c1];
        ciphertext += matrix[(r2 + 1) % 5][c2];
      } else {
        ciphertext += matrix[r1][c2];
        ciphertext += matrix[r2][c1];
      }
    }

    return ciphertext;
  };

  const handleEncrypt = () => {
    const encrypted = playfairEncrypt(text, key);
    setResult(encrypted);
  };

  return (
    <div className='row'>
      <input type="text" placeholder="Nhập văn bản" value={text} onChange={(e) => setText(e.target.value)} className="form_input_encrypt" />
      <input type="text" placeholder="Nhập khóa (key)" value={key} onChange={(e) => setKey(e.target.value)} className="form_input_encrypt" />
      <button onClick={handleEncrypt} className="btn_encrypt">Mã hóa</button>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '10px'}}>
        <div className='result_encrypt'><strong>Kết quả: </strong>{result}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fecf59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </div>
    </div>
  );
};

export default PlayfairCipher;
