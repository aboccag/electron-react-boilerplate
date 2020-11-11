import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DefaultButton,
  PrimaryButton,
  Stack,
  IStackTokens,
} from 'office-ui-fabric-react';
import { remote } from 'electron';
import routes from '../constants/routes.json';

const { dialog } = remote;

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

// Example formatting
const stackTokens: IStackTokens = { childrenGap: 40 };

export default function Home(): JSX.Element {
  const [state] = useState<string>('Please select backup directory');
  const [directory, setDirectory] = useState<string>('t');

  const alertClicked = (): void => {
    alert('Clicked');
  };
  const onButtonClick = () => {
    const path = dialog.showOpenDialog({
      properties: ['openDirectory'],
    });
    // eslint-disable-next-line promise/catch-or-return
    path.then((res) => setDirectory(res.filePaths[0]));
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
          text="Directory"
          onClick={onButtonClick}
          allowDisabledFocus
        />
        <PrimaryButton
          text="BACKUP"
          onClick={alertClicked}
          allowDisabledFocus
        />
      </Stack>
      <div>{directory}</div>
      <Link to={routes.COUNTER}>counter</Link>
    </div>
  );
}
