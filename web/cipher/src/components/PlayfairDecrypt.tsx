import { useState } from 'react';

const PlayfairDecrypt = () => {
  const [cipherText, setCipherText] = useState('');
  const [key, setKey] = useState('');
  const [plainText, setPlainText] = useState('');

  const handleDecrypt = () => {
    const result = decryptPlayfair(cipherText, key);
    setPlainText(result);
  };

  const generateMatrix = (keyword: string): string[][] => {
    keyword = keyword.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');
    let matrix = '';
    for (let ch of keyword + 'ABCDEFGHIKLMNOPQRSTUVWXYZ') {
      if (!matrix.includes(ch)) matrix += ch;
    }
    return Array.from({ length: 5 }, (_, i) => matrix.slice(i * 5, i * 5 + 5).split(''));
  };

  const findPos = (matrix: string[][], ch: string): [number, number] => {
    for (let i = 0; i < 5; i++) {
      const j = matrix[i].indexOf(ch);
      if (j !== -1) return [i, j];
    }
    return [-1, -1];
  };

  const decryptPlayfair = (cipher: string, keyword: string): string => {
    if (!cipher || !keyword) return '';

    const matrix = generateMatrix(keyword);
    let text = cipher.toUpperCase().replace(/J/g, 'I').replace(/[^A-Z]/g, '');

    if (text.length % 2 !== 0) text += 'X'; 

    let result = '';

    for (let i = 0; i < text.length; i += 2) {
      const [a, b] = [text[i], text[i + 1]];
      const [row1, col1] = findPos(matrix, a);
      const [row2, col2] = findPos(matrix, b);

      if (row1 === row2) {
        result += matrix[row1][(col1 + 4) % 5];
        result += matrix[row2][(col2 + 4) % 5];
      } else if (col1 === col2) {
        result += matrix[(row1 + 4) % 5][col1];
        result += matrix[(row2 + 4) % 5][col2];
      } else {
        result += matrix[row1][col2];
        result += matrix[row2][col1];
      }
    }

    return result;
  };

  return (
    <div className='row'>
      <input type="text" placeholder="Nhập ciphertext" value={cipherText} onChange={(e) => setCipherText(e.target.value)} className="form_input_encrypt" />
      <input type="text" placeholder="Nhập khóa" value={key} onChange={(e) => setKey(e.target.value)} className="form_input_encrypt" />
      <button onClick={handleDecrypt} className="btn_encrypt">Giải mã</button>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '10px'}}>
        <div className='result_encrypt'><strong>Kết quả: </strong>{plainText}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fecf59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </div>
    </div>
  );
};

export default PlayfairDecrypt;
