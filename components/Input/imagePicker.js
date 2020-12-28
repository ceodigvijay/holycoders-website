import React from "react";
export default function imagePicker(props) {
  return (
    <div className="image-picker-container">
      {!props.image ? (
        <form className="image-picker-form">
          <input
            className="file-input"
            type="file"
            onChange={props.handleImageUpload}
          />
          <svg
            className="upload-icon"
            width="100px"
            height="100px"
            viewBox="0 0 16 16"
            className="upload-icon"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M.5 8a.5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5a.5.5 0 0 1 1 0V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5A.5.5 0 0 1 .5 8zM5 4.854a.5.5 0 0 0 .707 0L8 2.56l2.293 2.293A.5.5 0 1 0 11 4.146L8.354 1.5a.5.5 0 0 0-.708 0L5 4.146a.5.5 0 0 0 0 .708z"
            />
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 2z"
            />
          </svg>
          <p className="upload-text">Drag your Featured Image or Click Here.</p>
        </form>
      ) : (
        <div className="relative">
          <img
            src={props.image}
            className="featured-image rounded-md"
            width="720px"
            height="400px"
          />
          <button onClick={props.handleImageDelete} className="absolute top-0 right-0 bg-red-600 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      )}

      <style jsx>{`
        .image-picker-container {
          position: relative;
          height: 420px;
          margin: 10px 0;
        }
        .image-picker-form {
          border-radius: 10px;
          position: absolute;
          cursor: pointer;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 720px;
          height: 400px;
          border: 2px solid #eee;
        }

        .file-input {
          cursor: pointer;
          position: absolute;
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          outline: none;
          opacity: 0;
        }
        .upload-icon {
          display: block;
          margin: 80px auto 10px auto;
        }
        .upload-text {
          text-align: center;
          font-family: Arial;
        }
        .featured-image {
          display: block;
          margin: 0 auto;
        }
        .delete-image-btn {
          position: absolute;
          right: -20px;
          top: -20px;
        }
      `}</style>
    </div>
  );
}
