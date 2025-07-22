import React, { useState } from 'react';

function xor(a: string, b: string): string {
  return a.split('').map((bit, i) => (bit === b[i] ? '0' : '1')).join('');
}

function permute(input: string, table: number[]): string {
  return table.map((pos) => input[pos - 1]).join('');
}

function shiftLeft(bits: string, shifts: number): string {
  return bits.slice(shifts) + bits.slice(0, shifts);
}

function binToHex(binary: string): string {
  return parseInt(binary, 2).toString(16).padStart(binary.length / 4, '0');
}

function hexToBin(hex: string): string {
  return hex.split('').map((c) => parseInt(c, 16).toString(2).padStart(4, '0')).join('');
}

const initialPermutation = [ 
    58, 50, 42, 34, 26, 18, 10, 2, 
    60, 52, 44, 36, 28, 20, 12, 4, 
    62, 54, 46, 38, 30, 22, 14, 6, 
    64, 56, 48, 40, 32, 24, 16, 8,
    57, 49, 41, 33, 25, 17, 9,  1, 
    59, 51, 43, 35, 27, 19, 11, 3, 
    61, 53, 45, 37, 29, 21, 13, 5, 
    63, 55, 47, 39, 31, 23, 15, 7
];

const finalPermutation = [ 
    40, 8, 48, 16, 56, 24, 64, 32, 
    39, 7, 47, 15, 55, 23, 63, 31, 
    38, 6, 46, 14, 54, 22, 62, 30, 
    37, 5, 45, 13, 53, 21, 61, 29, 
    36, 4, 44, 12, 52, 20, 60, 28, 
    35, 3, 43, 11, 51, 19, 59, 27, 
    34, 2, 42, 10, 50, 18, 58, 26, 
    33, 1, 41, 9, 49, 17, 57,  25
];

const expansionTable = [
    32, 1,  2,  3,  4,  5,  4,  5, 
    6,  7,  8,  9,  8,  9,  10, 11, 
    12, 13, 12, 13, 14, 15, 16, 17, 
    16, 17, 18, 19, 20, 21, 20, 21, 
    22, 23, 24, 25, 24, 25, 26, 27, 
    28, 29, 28, 29, 30, 31, 32, 1
];

const sBox = [
    [
        [14, 4,  13, 1,  2,  15, 11, 8,  3,  10, 6,  12, 5,  9,  0,  7],
        [0,  15, 7,  4,  14, 2,  13, 1,  10, 6,  12, 11, 9,  5,  3,  8],
        [4,  1,  14, 8,  13, 6,  2,  11, 15, 12, 9,  7,  3,  10, 5,  0],
        [15, 12, 8,  2,  4,  9,  1,  7,  5,  11, 3,  14, 10, 0,  6,  13]
    ],
    [
        [15, 1,  8,  14, 6,  11, 3,  4,  9,  7,  2,  13, 12, 0,  5,  10],
        [3,  13, 4,  7,  15, 2,  8,  14, 12, 0,  1,  10, 6,  9,  11, 5],
        [0,  14, 7,  11, 10, 4,  13, 1,  5,  8,  12, 6,  9,  3,  2,  15],
        [13, 8,  10, 1,  3,  15, 4,  2,  11, 6,  7,  12, 0,  5,  14, 9]
    ],
    [
        [10, 0,  9,  14, 6,  3,  15, 5,  1,  13, 12, 7,  11, 4,  2,  8],
        [13, 7,  0,  9,  3,  4,  6,  10, 2,  8,  5,  14, 12, 11, 15, 1],
        [13, 6,  4,  9,  8,  15, 3,  0,  11, 1,  2,  12, 5,  10, 14, 7],
        [1,  10, 13, 0,  6,  9,  8,  7,  4,  15, 14, 3,  11, 5,  2,  12]
    ],
    [
        [7,  13, 14, 3,  0,  6,  9,  10, 1,  2,  8,  5,  11, 12, 4,  15],
        [13, 8,  11, 5,  6,  15, 0,  3,  4,  7,  2,  12, 1,  10, 14, 9],
        [10, 6,  9,  0,  12, 11, 7,  13, 15, 1,  3,  14, 5,  2,  8,  4],
        [3,  15, 0,  6,  10, 1,  13, 8,  9,  4,  5,  11, 12, 7,  2,  14]
    ],
    [
        [2,  12, 4,  1,  7,  10, 11, 6,  8,  5,  3,  15, 13, 0,  14, 9],
        [14, 11, 2,  12, 4,  7,  13, 1,  5,  0,  15, 10, 3,  9,  8,  6],
        [4,  2,  1,  11, 10, 13, 7,  8,  15, 9,  12, 5,  6,  3,  0,  14],
        [11, 8,  12, 7,  1,  14, 2,  13, 6,  15, 0,  9,  10, 4,  5,  3]
    ],
    [
        [12, 1,  10, 15, 9,  2,  6,  8,  0,  13, 3,  4,  14, 7,  5,  11],
        [10, 15, 4,  2,  7,  12, 9,  5,  6,  1,  13, 14, 0,  11, 3,  8],
        [9,  14, 15, 5,  2,  8,  12, 3,  7,  0,  4,  10, 1,  13, 11, 6],
        [4,  3,  2,  12, 9,  5,  15, 10, 11, 14, 1,  7,  6,  0,  8,  13]
    ],
    [
        [4,  11, 2,  14, 15, 0,  8,  13, 3,  12, 9,  7,  5,  10, 6,  1],
        [13, 0,  11, 7,  4,  9,  1,  10, 14, 3,  5,  12, 2,  15, 8,  6],
        [1,  4,  11, 13, 12, 3,  7,  14, 10, 15, 6,  8,  0,  5,  9,  2],
        [6,  11, 13, 8,  1,  4,  10, 7,  9,  5,  0,  15, 14, 2,  3,  12]
    ],
    [
        [13, 2,  8,  4,  6,  15, 11, 1,  10, 9,  3,  14, 5,  0,  12, 7],
        [1,  15, 13, 8,  10, 3,  7,  4,  12, 5,  6,  11, 0,  14, 9,  2],
        [7,  11, 4,  1,  9,  12, 14, 2,  0,  6,  10, 13, 15, 3,  5,  8],
        [2,  1,  14, 7,  4,  10, 8,  13, 15, 12, 9,  0,  3,  5,  6,  11]
    ]
];

const permutationP = [
    16, 7,  20, 21, 29, 12, 28, 17, 
    1,  15, 23, 26, 5,  18, 31, 10, 
    2,  8,  24, 14, 32, 27, 3,  9, 
    19, 13, 30, 6,  22, 11, 4,  25
];

const pc1 = [
    57, 49, 41, 33, 25, 17, 9,  1,
    58, 50, 42, 34, 26, 18, 10, 2,
    59, 51, 43, 35, 27, 19, 11, 3,
    60, 52, 44, 36, 63, 55, 47, 39,
    31, 23, 15, 7,  62, 54, 46, 38,
    30, 22, 14, 6,  61, 53, 45, 37,
    29, 21, 13, 5,  28, 20, 12, 4
];

const pc2 = [
    14, 17, 11, 24, 1,  5,  3, 28, 
    15, 6,  21, 10, 23, 19, 12, 4, 
    26, 8,  16, 7,  27, 20, 13, 2,  
    41, 52, 31, 37, 47, 55, 30, 40, 
    51, 45, 33, 48, 44, 49, 39, 56, 
    34, 53, 46, 42, 50, 36, 29, 32
]

const shiftTable = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

function sBoxSubstitution(input: string): string {
  let output = '';
  for (let i = 0; i < 8; i++) {
    const chunk = input.slice(i * 6, i * 6 + 6);
    const row = parseInt(chunk[0] + chunk[5], 2);
    const col = parseInt(chunk.slice(1, 5), 2);
    const val = sBox[i][row][col];
    output += val.toString(2).padStart(4, '0');
  }
  return output;
}

function generateKeys(key: string): string[] {
  const keys = [];
  const keyBin = hexToBin(key);
  const permKey = permute(keyBin, pc1);
  let left = permKey.slice(0, 28);
  let right = permKey.slice(28);

  for (let i = 0; i < 16; i++) {
    left = shiftLeft(left, shiftTable[i]);
    right = shiftLeft(right, shiftTable[i]);
    const combined = left + right;
    keys.push(permute(combined, pc2));
  }
  return keys;
}

function desEncrypt(plaintext: string, key: string): string {
  const keys = generateKeys(key);
  const binText = hexToBin(plaintext);
  const permutedText = permute(binText, initialPermutation);
  let left = permutedText.slice(0, 32);
  let right = permutedText.slice(32);

  for (let i = 0; i < 16; i++) {
    const expandedRight = permute(right, expansionTable);
    const xored = xor(expandedRight, keys[i]);
    const sboxOut = sBoxSubstitution(xored);
    const pboxOut = permute(sboxOut, permutationP);
    const newRight = xor(left, pboxOut);
    left = right;
    right = newRight;
  }

  const combined = right + left;
  const finalPermuted = permute(combined, finalPermutation);
  return binToHex(finalPermuted).toUpperCase();
}

const DESCipher: React.FC = () => {
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState('');
  const [cipher, setCipher] = useState('');

  const handleEncrypt = () => {
    try {
      const result = desEncrypt(plaintext, key);
      setCipher(result);
    } catch (err) {
      setCipher('Lỗi mã hóa');
    }
  };

  return (
    <div className='row'>
      <input type='text' placeholder='Nhập plaintext (hex)' value={plaintext} onChange={(e) => setPlaintext(e.target.value)} className='form_input_encrypt' />
      <input
        type='text' placeholder='Nhập key (hex)' value={key} onChange={(e) => setKey(e.target.value)} className='form_input_encrypt' />
      <button onClick={handleEncrypt} className="btn_encrypt">Mã hóa</button>
      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: '10px'}}>
        <div className='result_encrypt'><strong>Kết quả: </strong>{cipher}</div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fecf59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
      </div>
    </div>
  );
};

export default DESCipher;

// -----------------------------------

// a little complex, btw u can use this :v >>


// import React, { useState } from 'react';
// import CryptoJS from 'crypto-js';

// const DESCipher: React.FC = () => {
//   const [plaintext, setPlaintext] = useState('');
//   const [key, setKey] = useState('');
//   const [ciphertext, setCiphertext] = useState('');

//   const handleEncrypt = () => {
//     try {
//       const encrypted = CryptoJS.DES.encrypt(plaintext, CryptoJS.enc.Utf8.parse(key), {
//         mode: CryptoJS.mode.ECB,
//         padding: CryptoJS.pad.Pkcs7
//       }).toString();
//       setCiphertext(encrypted);
//     } catch (error) {
//       setCiphertext('Lỗi mã hóa');
//     }
//   };

//   return (...);
// };

// export default DESCipher;
