import { useEffect, useState } from 'react';
import Parse from './parseConfig';

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Check if we are on the client side
    if (typeof window !== 'undefined') {
      // Query Parse to fetch data from a class
      const Example = Parse.Object.extend('GameScore');
      const query = new Parse.Query(Example);

      query.find().then((results) => {
        const data = results.map((result) => result.toJSON());
        setData(data);

        // Save the data locally using the LocalDatastore
        Parse.Object.pinAll(results).then(() => {
          console.log('Objects saved locally:', data);
        });
      });
    }
  }, []);

  // Function to retrieve data locally
  const fetchLocalData = () => {
    const Example = Parse.Object.extend('GameScore');
    const localQuery = new Parse.Query(Example);

    localQuery.fromLocalDatastore(); // Query local data

    if (typeof window !== 'undefined') {
      localQuery.find().then((localResults) => {
        console.log('Locally retrieved data:', localResults.map((result) => result.toJSON()));
      });
    }
  };

  return (
    <div>
      <h1>Back4App Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.objectId}>{item.playerName}</li>
        ))}
      </ul>
      <button onClick={fetchLocalData}>Retrieve Data Locally</button>
    </div>
  );
}
