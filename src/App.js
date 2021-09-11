import React, { useState, useEffect } from "react";
import "./App.css";
import MaterialTable from "material-table";

const App = () => {
  const baseUrl =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const getData = () => {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((resJson) => {
        setData(resJson);
        return resJson;
      });
  };

  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Role", field: "role" },
  ];

  const deleteSelected = () => {
    const updatedData = data.filter((row) => !selectedRows.includes(row));
    setData(updatedData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container">
        <div></div>
        <div className="d-flex justify-content-center">
          <h4>Admin - Panel</h4>
          {console.log(data)}
        </div>
        <div>
          <MaterialTable
            columns={columns}
            data={data}
            title="User Information"
            onSelectionChange={(rows) => {
              setSelectedRows(rows);
            }}
            editable={{
              onRowAdd: (newRow) =>
                new Promise((resolve, reject) => {
                  setData([...data, newRow]);
                  resolve();
                }),
              onRowUpdate: (newRow, oldRow) =>
                new Promise((resolve, reject) => {
                  const updatedData = [...data];
                  updatedData[oldRow.tableData.id] = newRow;
                  setData(updatedData);
                  resolve();
                }),
              onRowDelete: (selectedRow) =>
                new Promise((resolve, reject) => {
                  console.log(selectedRow);
                  const updatedData = [...data];
                  updatedData.splice(selectedRow.tableData.id, 1);
                  setData(updatedData);
                  resolve();
                }),
            }}
            options={{
              pageSize: 10,
              paginationType: "stepped",
              exportButton: true,
              addRowPosition: "first",
              actionsColumnIndex: -1,
              selection: true,

              grouping: true,
              columnsButton: true,
            }}
            actions={[
              {
                icon: "delete",
                tooltip: "Delete all selected rows",
                onClick: () => deleteSelected(),
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default App;
