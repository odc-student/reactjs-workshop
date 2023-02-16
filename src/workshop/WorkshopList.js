import React, { useState, useEffect } from "react";
import axios from "axios";

const WorkshopList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/api/v1/workshops");
    setItems(response.data);
    fetchData();
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/v1/workshop/${id}`);
    fetchData();
  };

  const workshops = items?.data?.workshops;
  return (
    <>
      <h1>Workshop Lists</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {workshops?.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{new Date(item.date).toDateString()}</td>
              <td>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default WorkshopList;
