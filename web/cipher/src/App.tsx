import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <div className='title'>Mã hóa/Giải mã các hệ mật</div>
      <div className="card">
        <form className='form_inpt'>
          <div className='column'>
            <div className='row'>
              <input type="text" placeholder="Nhập string cần mã hóa" className="form_input_encrypt" id="encrypt_str"></input>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default App
