import React from 'react';
import { useAuthority } from '../.umi-test/plugin-authority/authority';

const App = (props: any) => {
  const { multipleVerify } = useAuthority();

  console.log(multipleVerify(['module1/action1', 'module1/action2',]));
  console.log(multipleVerify(['module3/action1', 'module3/action2',]));
  return (
    <div>
      <h1>unaccessible: {props.route.unaccessible.toString()}</h1>
    </div>
  );
};

export default App;
