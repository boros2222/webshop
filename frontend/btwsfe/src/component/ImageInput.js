import React, {useRef, useState} from 'react';
import {FileUpload} from "primereact/fileupload";

function ImageInput({files, setFiles, maxFileNumber, maxFileSize, disabled}) {

    const fileUploadRef = useRef(undefined);
    const [error, setError] = useState(undefined);

    const convertFileSize = (size) => {
        if (size > 1000000) {
            return `${size/1000000}MB`;
        } else if (size > 1000) {
            return `${size/1000}KB`;
        } else {
            return `${size}B`
        }
    };

    const onChange = (event) => {
        fileUploadRef.current.clear();
        const newFile = event.files[0];
        if (!newFile.type.startsWith("image/")) {
            setError("Csak képet lehet feltölteni!");
            return;
        }
        if (newFile.size > maxFileSize) {
            setError(`A fájl meghaladja a maximum fájlméretet: ${convertFileSize(maxFileSize)}`);
            return;
        }
        if (files.findIndex(x => x.name === newFile.name) !== -1) {
            setError("Ez a kép már hozzá lett adva!");
            return;
        }
        setFiles([...files, newFile]);
        setError(undefined);
    };

    const removeFile = (file) => {
        const copiedFiles = files.slice();
        const index = copiedFiles.indexOf(file);
        if (index > -1) {
            copiedFiles.splice(index, 1);
            setFiles(copiedFiles);
        }
        setError(undefined);
    };

    const fileExists = (file) => {
        return file.id != null;
    };

    return (
        <>
            <div className="w-100 mb-2">
                <span className={files.length >= maxFileNumber || disabled ? "p-fileupload-disabled" : ""}>
                    <FileUpload ref={fileUploadRef} mode="basic" accept="image/*"
                                disabled={files.length >= maxFileNumber || disabled}
                                customUpload={true} uploadHandler={onChange} auto={true} chooseLabel="Kiválasztás" />
                </span>
            </div>

            <p className="w-100 mb-2 error-message">{error}</p>

            <div className={`w-100 ${files.length > 0 ? "custom-border" : ""}`}>
                {files.map(file => (
                    <div key={fileExists(file) ? file.path : file.name} className="w-100 row mb-2">
                        <div className="col-12 col-lg-2">
                            <img className="w-100" src={fileExists(file) ? file.path : file.objectURL} alt=""/>
                        </div>
                        <div className="col-12 col-lg-9 d-flex flex-column justify-content-center">
                            {fileExists(file) ?
                                <p>Már feltöltött kép</p>
                                :
                                <>
                                    <p>Fájlnév: <span className="font-weight-bold">{file.name}</span></p>
                                    <p>Fájlméret: {convertFileSize(file.size)}</p>
                                </>
                            }
                        </div>
                        <div className="col-12 col-lg-1 d-flex align-items-center justify-content-end">
                            <button type="button" className="custom-button red-button font-size-normal flex-center"
                                    disabled={disabled} onClick={() => removeFile(file)}>
                                <i className="pi pi-times"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ImageInput;