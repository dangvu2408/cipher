import { useState } from 'react'
import './App.css'
import CaesarCipher from './components/Caesar';

function App() {
  const [cipherType, setCipherType] = useState('');

  const renderCipherComponent = () => {
    switch (cipherType) {
      case 'Caesar':
        return <CaesarCipher />;
      // case 'Vigenère':
      //   return <VigenereCipher />;
      // thêm các cipher khác sau
      default:
        return null;
    }
  };
  return (
    <>
      <div className='title'>Mã hóa các hệ mật</div>
      <div className="card">
        <form className='form_inpt'>
          <div className='column'>
            <div className='row'>
              <select className="form_input_encrypt" id='select' name='select' required onChange={e => setCipherType(e.target.value)}>
                <option value={""}>Chọn loại mã hóa</option>
                <option value={"Caesar"}>Caesar</option>
                <option value={"Vigenère"}>Vigenère</option>
                <option value={"Autokey"}>Autokey</option>
                <option value={"Affine"}>Affine</option>
                <option value={"Rail fence"}>Rail fence</option>
                <option value={"Playfair"}>Playfair</option>
                <option value={"Hill"}>Hill</option>
                <option value={"RC4"}>RC4</option>
                <option value={"DES"}>DES</option>
              </select>
            </div>
          </div>
        </form>
        {renderCipherComponent()}
      </div>

      <div className='title'>Giải mã các hệ mật</div>
    </>
  )
}

export default App
