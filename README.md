# js-utilities
Collection of JS utils, like Json IO.

## JSON-IO
Set up JSON file upload/download for data import/export.
Simply run "_Configure_Json_IO" function.

#### Parameters

- fileExport = <button id="file_export">Save as</button>
- fileUpload = <input type="file" id="file_upload" accept=".json">
- fileNaming = <input type="text" id="file_naming">
defaultFileName = 'Data'
- parseInputData =  function(d) { return d }
- parseOutputData = function(d) { return d }

| Parameters      | Default       | Type  |
| --------------- |:-------------:| -----:|
| fileExport      | <button id="file_export">Save as</button>           | HTML Object |
| fileUpload      | <input type="file" id="file_upload" accept=".json"> | HTML Object |
| fileNaming      | <input type="text" id="file_naming">                | HTML Object |
| parseInputData  | function(d) { return d }                            | function |
| parseOutputData | function(d) { return d }                            | function |
