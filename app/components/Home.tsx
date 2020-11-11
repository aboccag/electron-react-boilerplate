import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home(): JSX.Element {
  const [state] = useState<string>('Hi');

  useEffect(() => {
    // axios
    //   .get('http://localhost:5000')
    //   .then((res) => setState(res.data))
    //   .catch(console.log);
  }, []);

  return (
    <div className={styles.container} data-tid="container">
      <h2>{state}</h2>
      <Link to={routes.COUNTER}>counter</Link>
    </div>
  );
}
