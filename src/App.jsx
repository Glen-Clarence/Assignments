import * as XLSX from "xlsx";
import ExcelData from "./assets/components/ExcelData";
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [isdata, setIsdata] = useState(false);
  const fileUpload = (e) => {
    const files = e.target.files;
    if (files == 0) {
      alert("Please choose any other file");
      return;
    }
    var filename = files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == ".XLSX") {
      setIsdata(true);
      excelFileToJSON(files[0]);
    } else {
      alert("please selecta valid file");
    }
  };
  //Method to read excel file and convert it into JSON
  function excelFileToJSON(file) {
    try {
      var reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = function (e) {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
          type: "binary",
        });
        var result = {};
        workbook.SheetNames.forEach(function (sheetName) {
          var roa = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetName]
          );
          if (roa.length > 0) {
            result[sheetName] = roa;
          }
        });
        //displaying the json result
        console.log(result);
        setData(result);
      };
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="container mx-auto">
      <div className="w-1/2 mt-4">
                <input type="file" placeholder="place file" onChange={(e) => fileUpload(e)} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" />
            </div>
      <input  />
      <ExcelData data={data} isdata={isdata} />
    </div>
  );
}

export default App;
