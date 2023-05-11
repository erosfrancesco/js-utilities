# js-utilities
Collection of JS utils, like Json IO.

## JSON-IO
Set up JSON file upload/download for data import/export.
Simply run "_Configure_Json_IO" function.

| Parameters      | Description   |
| --------------- |:--------------|
| fileExport      | A Save Button. Pass a HTML Object Reference (button) |
| fileUpload      | A File Drop. Pass a HTML Object Reference (input type=file accept=.json) |
| fileNaming      | A Text Input. Pass a HTML Object Reference (input type=text) |
| parseInputData  | Parse uploaded JSON data when uploaded. Must return parsed data. |
| parseOutputData | Parse data for JSON when saving. Must Return parsed data. |
