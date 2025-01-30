"use client";
import React, { useEffect, useState } from 'react';
import { getDepartments } from '@/utils/getDepartments';
import { addEmployeeToDepartment } from '@/utils/addEmployeeToDepartment';
import { addDepartment } from '@/utils/addDepartment';
import { getEmployeesFromDepartment } from '@/utils/getEmployeesFromDepartment';
// import { getEmployeesFromDepartment } from '@utils/getEmplyeesFromDepartment'

const Page = () => {
  const [csvData, setCsvData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setErrorMessage('Please select a file.');
      return;
    }
    if (!file.name.endsWith('.csv')) {
      setErrorMessage('Please upload a CSV file.');
      return;
    }
    setIsLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split('\n').map((row) => row.split(','));
      setCsvData(rows);
      setErrorMessage('');
      setIsLoading(false);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDepartments();
      const departmentNames = data.map(department => department.department_name);
      console.log(departmentNames);
  
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      // Iterate over the csvData (skipping the first row)
      for (const row of csvData.slice(1)) {
        const departmentName = row[0];
  
        try {
          if (row[2] && emailRegex.test(row[2])) {  // Validate email here
            if (departmentNames.includes(departmentName)) {
              console.log(`${departmentName} already in db`);
  
              // Fetch existing employees for this department only if the department exists
              const existingEmployees = await getEmployeesFromDepartment(departmentName);
  
              // Check if the employee already exists in the department
              const employeeExists = existingEmployees.employees.some(
                employee => employee.email === row[2] && employee.name === row[1]
              );
  
              if (!employeeExists) {
                // Add employee to department if not already present
                await addEmployeeToDepartment(row[0], "", row[1], row[2], row[3]);
                console.log(`Employee ${row[1]} added to ${departmentName}`);
              } else {
                console.log(`Employee ${row[1]} already exists in ${departmentName}`);
              }
            } else {
              console.log(`${departmentName} not in db`);
              await addDepartment(row[0], "");
              console.log("Department added");
              await addEmployeeToDepartment(row[0], "", row[1], row[2], row[3]);
            }
          } else {
            console.log(`Invalid email: ${row[2]}`);
          }
        } catch (error) {
          console.error(`Error processing ${departmentName}:`, error);
        }
      }
    };
  
    fetchData();
}, [csvData]);

  
  
  
  return (
    <div style={{ padding:'20px', maxWidth:'800px', margin:'0 auto' }}>
        <h1>example CSV file structure</h1>
        <p>
            department_name,name,email,status<br/>
            Engineering,John Doe,john.doe@example.com,Active<br/>
            Marketing,Jane Smith,jane.smith@example.com,Inactive<br/>
        </p>
      <h1 style={{marginBottom: '20px' }}>
          <br/>Loading Data from File
      </h1>
      <input type="file" onChange={handleFileUpload} 
            accept=".csv" style={{ marginBottom: '10px' }} 
      />
      { errorMessage && <div style={{color:'red', marginBottom:'10px' }}>
        { errorMessage }</div> 
      }
      { isLoading ? 
        (
          <div style={{ textAlign:'center', marginTop:'20px' }}>
            Loading...
          </div>
        ) : 
        (
          csvData.length > 0 && (
             
          <table style={{ borderCollapse:'collapse', 
                          width:'100%', marginTop:'20px' }}>
            <tbody>
              { csvData.map((row, index) => (
                <tr key={index}>
                  { row.map((cell, cellIndex) => (
                    <td key={cellIndex} 
                        style={{ border:'1px solid #ccc', padding:'8px' }}>
                        {cell}
                    </td>
                  ))}
                </tr>
                ))
              }
            </tbody>
          </table>
          )
        )
      }
    </div>
  );
};
export default Page;