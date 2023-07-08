import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [teamsData, setTeamsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const url =
      "https://api-football-beta.p.rapidapi.com/teams?season=2023&league=128";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ee1fca078dmsh7b7cb78c119a3a2p17b35bjsn2a48047cad75",
        "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setTeamsData(data.response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DataContext.Provider value={{ teamsData, setTeamsData }}>
      {children}
    </DataContext.Provider>
  );
}
