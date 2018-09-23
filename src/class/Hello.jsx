import {saveAs} from 'file-saver/FileSaver';
import JSZip from '../../node_modules/jszip';


class Hello {

    static downloadZip(modelName, files) {
        var zip = new JSZip()

        for (let x = 0; x < files.length; x++) {
                zip.file(files[x].fileName, files[x].fileContent);
        }
        zip.generateAsync({type: "blob"})
            .then(function (content) {
                saveAs(content, modelName + ".zip");
            });
    }

    static copyToClipBoard(data) {
        navigator.clipboard.writeText(data);
    }

    static saveToFile(data, filename, type, format) {
        const file = new Blob([data], {type: type});
        const anchor = document.createElement("a");
        anchor.download = filename + format;
        anchor.href = window.URL.createObjectURL(file);
        anchor.target = "_blank";
        anchor.style.display = "none"; // just to be safe!
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }

    static CheckNullStatus(data) {
        for (let x = 0; x < data.length; x++) {
            if (data[x] === "" || data[x] === null) {
                console.log(data[x]);
                return false;
            }
        }
        return true;
    }
}

export default Hello;
