import { useEffect, useState } from "react";
import Papa from "papaparse";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMz33fovxyG1OWTyZdiSZ3Jk_VEb2_Dsaqgudr6VatdPZGmH31oMYQussk0B7FU5RmTdjWSOSxwPVl/pub?output=csv";

const TablePrices = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(SHEET_CSV_URL);
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(groupData(results.data));
            setLoading(false);
          },
          error: (error) => {
            setError(error.message);
            setLoading(false);
          },
        });
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const groupData = (rawData) => {
    const grouped = {};

    rawData.forEach((row) => {
      const repair = row["Reparație"];
      const deviceType = row["Tip Dispozitiv"];
      const model = row["Model"];
      const price = row["Preț"];

      if (!grouped[repair]) grouped[repair] = {};
      if (!grouped[repair][deviceType]) grouped[repair][deviceType] = [];

      grouped[repair][deviceType].push({ model, price });
    });

    return grouped;
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Se încarcă prețurile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        A apărut o eroare la încărcarea prețurilor: {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="alert alert-warning">Nu există date disponibile.</div>
    );
  }

  return (
    <div className="repair-prices-container">
      {Object.entries(data).map(([repairType, deviceGroups]) => (
        <div key={repairType}>
          <h5 className="mt-4 fw-bold">{repairType}</h5>

          {Object.entries(deviceGroups).map(([deviceType, models]) => (
            <div key={`${repairType}-${deviceType}`}>
              <h6 className="mt-3">{deviceType}</h6>

              <table
                className="table table-sm table-bordered table-striped align-middle"
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <thead className="table-light">
                  <tr>
                    <th>Model</th>
                    <th>Preț (RON)</th>
                  </tr>
                </thead>
                <tbody>
                  {models
                    .sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
                    .map(({ model, price }, index) => (
                      <tr
                        key={`${deviceType}-${model}-${index}`}
                        className="table-light"
                      >
                        <td>{model}</td>
                        <td>{price}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TablePrices;
