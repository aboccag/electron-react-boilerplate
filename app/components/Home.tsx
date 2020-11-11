import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DefaultButton,
  PrimaryButton,
  Stack,
  IStackTokens,
} from 'office-ui-fabric-react';
import routes from '../constants/routes.json';

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

export default function Home(): JSX.Element {
  const [state] = useState<string>('Hi');

  const alertClicked = (): void => {
    alert('Clicked');
  };

  useEffect(() => {
    // axios
    //   .get('http://localhost:5000')
    //   .then((res) => setState(res.data))
    //   .catch(console.log);
  }, []);

  return (
    <div>
      <h2>{state}</h2>
      <Stack horizontal tokens={stackTokens}>
        <DefaultButton
          text="Standard"
          onClick={alertClicked}
          allowDisabledFocus
        />
        <PrimaryButton
          text="Primary"
          onClick={alertClicked}
          allowDisabledFocus
        />
      </Stack>
      <Link to={routes.COUNTER}>counter</Link>
    </div>
  );
}
