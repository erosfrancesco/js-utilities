// Default UI
const createFileExportButton = () => {
    const el = document.createElement('button');
    el.id = 'file_export';
    el.innerHTML = 'Save as';
    return el;
}

const createFileUploadInput = () => {
    const el = document.createElement('input');
    el.id = 'file_upload';
    el.type = 'file'
    el.accept = '.json';
    return el;
}

const createFileNamingInput = () => {
    const el = document.createElement('input');
    el.id = 'file_naming';
    el.type = 'text'
    return el;
}
//


// Utils
const download = (content, fileName, type) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type });
    
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}
const upload = (import_file, onFileUploaded) => {
    const reader = new FileReader();
    reader.readAsText(import_file);
    reader.addEventListener('load', (e) => onFileUploaded(e.target.result));
}
//


const _Configure_Json_IO = (App_Global = {}) => {
    // setup
    const {
        fileExport = createFileExportButton(),  // <button id="file_export">Save as</button>
        fileUpload = createFileUploadInput(),   // <input type="file" id="file_upload" accept=".json">
        fileNaming = createFileNamingInput(),   // <input type="text" id="file_naming">
        defaultFileName = 'Data',
        parseInputData =  function(d) { return d },
        parseOutputData = function(d) { return d }
    } = App_Global;


    const saveData = (data = {}) => {
        const parsed = JSON.stringify(parseOutputData(data));
        const fileName = fileNaming.value || defaultFileName;
        download(parsed, fileName + '.json', 'application/json');
    }
    const loadData = (import_file) => {
        upload(import_file, (data) => parseInputData(JSON.parse(data)));
    }
    //

    // UI
    fileExport.onclick = saveData;

    fileUpload.addEventListener('change', (e) => {
        const fileList = e.target.files;
        loadData(fileList[0]);
    });
    
    fileUpload.addEventListener('dragover', (e) => {
        e.stopPropagation();
        e.preventDefault();
        // Style the drag-and-drop as a "copy file" operation.
        e.dataTransfer.dropEffect = 'copy';
    });
    
    fileUpload.addEventListener('drop', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const fileList = e.dataTransfer.files;
        loadData(fileList[0]);
    });
    //

    return {
        loadData,
        saveData,
        fileExport,
        fileUpload,
        fileNaming
    }
}
