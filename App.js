import React from 'react';
import { Witches } from './layout/witches';
import { Provider } from 'react-redux';
import store  from './redux/store';



export default function App() {
  
  return (
    <Provider store={store} >
        <Witches/>
    </Provider>
  );
}



