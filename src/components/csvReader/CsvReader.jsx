import React, { useState, useEffect } from 'react'
import CSVReader from 'react-csv-reader'

function AppCsvReader(){
  const [data, setData] = useState()
  const handleForce = (data, fileInfo) => setData({
    ...data
  }) 

  const papaparseOptions = {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      transformHeader: header =>
        header
          .toLowerCase()
          .replace(/\W/g, '_')
    }

    console.log(data)
  
  return (
    <CSVReader
      cssClass="csv-reader-input"
      label="Select CSV with secret Death Star statistics"
      onFileLoaded={handleForce}
      parserOptions={papaparseOptions}
    />
  )
}

export default AppCsvReader