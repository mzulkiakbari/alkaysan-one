/* eslint-disable no-unused-vars */
import './App.css';
import React from 'react';
import { AlkaysanLogin } from '@noonor/alkaysan-one';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <AlkaysanLogin
        theme="filled_light"
        shape="pill"
        size="large"
        onSuccess={async (response) => {
          const userInfo = await axios.get(
            'https://account.alkaysan.co.id/api/v1/user/me',
            { headers: { Authorization: `Bearer ${response.credential.data.access_token}` } }
          );
          console.log(userInfo.data);
        }}
        onError={(error) => {
          console.error(error);
        }}
      />
    </div>
  );
}

export default App;
