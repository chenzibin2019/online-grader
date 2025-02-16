import React, { useRef, useEffect, useState } from "react";

export default function DragDropUploadDialog(props) {

  const [isInside, setIsInside] = useState(false);
  const {unmount, onfile} = props;

  const dialogRef = useRef(null);

  const showFilePicker = () => {
    const picker = document.querySelector("input");
    picker.click();
  };

  const handleFiles = (files) => {
    // if not json file, alert
    if (!files || files.length !== 1 || files[0].type !== "application/json") {
      alert("Invalid target. Please select one JSON file.");
      return;
    }
    const json_file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = JSON.parse(e.target.result);
        onfile(result);
        unmount();
      } catch (error) {
        alert("Invalid JSON file.");
        console.error(error);
        
      }
      
    };
    reader.readAsText(json_file);
  };


  const handleDragEnter = (e) => {
    e.preventDefault();
    !isInside && setIsInside(true);
  }

  const handleDragEnd = (e) => {
    e.preventDefault();
    isInside && setIsInside(false);
  }

  // 拖拽进入
  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  // 拖拽释放
  const handleDrop = (event) => {
    event.preventDefault();
    setIsInside(false);
    handleFiles(event.dataTransfer.files);
  };

  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  return (
    <div>
      <dialog ref={dialogRef} className="upload-dialog">
        <p>Please drag and drop your rubric JSON file here. You can also click the area below to pick one from your file system.</p>
        <div
          className={`drop-area ${isInside ? "file-in" : ""}`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragEnd}
          onDrop={handleDrop}
          onClick={showFilePicker}
        >
          <p>
            <i class="fa-solid fa-cloud-arrow-up"></i> &nbsp;
            Upload rubric JSON file... 
          </p>
          <input
            type="file"
            accept=".json"
            onChange={(e) => handleFiles(e.target.files)}
            className="file-input"
          />
        </div>
        <button 
          className="reset-button"
          onClick={() => {
            dialogRef.current.close()
            unmount();
          }}
        >Close</button>
      </dialog>
    </div>
  );
}

