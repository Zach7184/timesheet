import './App.css';

import { GoogleSpreadsheet } from "google-spreadsheet";

// Config variables
const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const SHEET_ID = process.env.REACT_APP_SHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;
console.log(process.env)

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const appendSpreadsheet = async (row) => {
  try {
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });
    // loads document properties and worksheets
    await doc.loadInfo();

    const sheet = doc.sheetsById[SHEET_ID];
    await sheet.addRow(row);
  } catch (e) {
    console.error('Error: ', e);
  }
};

const newRow = { Name: "Zach", Value: "Customer Service" };

appendSpreadsheet(newRow);

function App() {
  const options = {
    timeZone:"US/Mountain",
    hour12 : true,
    hour:  "2-digit",
    minute: "2-digit",
   second: "2-digit"
 };
  
  const inClick = event => {
    
    appendSpreadsheet({ Name: new Date().toLocaleTimeString("en-US",options), Value: "in"});
  }
  const outClick = event => {
    appendSpreadsheet({ Name: new Date().toLocaleTimeString("en-US",options), Value: "out" });
  }

  return (
    <div className="App">
      <button onClick={inClick}>In</button>
      <button onClick={outClick}>Out</button>
    </div>
  );

}

export default App;
