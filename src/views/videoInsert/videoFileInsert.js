import React, { useState, useCallback, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CProgress,
  CRow,
  CAlert,
} from '@coreui/react';
import { insertGenrateIframe } from './service/videoInsert.service';
import { cilWarning, cilChevronCircleDownAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import AWS from 'aws-sdk';

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
});

const FileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoLink, setVideoLink] = useState('');

  const [successMsg, setSuccessMsg] = useState('');


  const handleAddLink = useCallback(() => {
    const requestData = {
      link: videoLink,
      name: videoTitle,
    };

    const resetValues = () => {
      setVideoTitle('');
      setVideoDescription('');
      setVideoLink('');
      setUploadProgress(0);
      setUploadedFile(null)
    };

    insertGenrateIframe(requestData)
      .then(response => {
        if (response.status === 200) {
          setSuccessMsg('File uploaded, iframe generated, and created successfully.');
          resetValues();

        } else {
          // Handle other status codes if needed
          setSuccessMsg('Error: Unable to add data.');
        }
      })
      .catch(error => {
        // Handle any error scenarios for the request
        setSuccessMsg('Error: An error occurred.');
        console.error('Error Genarate File:', error);

      });

  }, [videoLink, videoTitle, videoDescription]);


  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.name.toLowerCase().endsWith('.mp4')) {
      setUploadedFile(file);

      const params = {
        Bucket: S3_BUCKET,
        Key: file.name,
        Body: file,
      };

      const uploadRequest = s3.upload(params);

      uploadRequest.on('httpUploadProgress', (progress) => {
        const percentUploaded = Math.round((progress.loaded / progress.total) * 100);
        setUploadProgress(percentUploaded);
      });

      uploadRequest.send((err, data) => {
        if (err) {
          console.error('Error uploading file:', err);
        } else {
          console.log('File uploaded successfully:', data.Location);

          // Set video link in state
          setVideoLink(data.Location);

          // Update the text area with the video link
          const videoLinkTextArea = document.getElementById('videoLinkTextArea');
          if (videoLinkTextArea) {
            videoLinkTextArea.value = data.Location;
          }
        }
      });
    } else {
      console.error('Invalid file format. Please upload an MP4 video.');
    }
  };


  useEffect(() => {
    // Clean up the event listener when the component unmounts
    return () => {
      if (uploadedFile) {
        setUploadedFile(null);
        setUploadProgress(0);
      }
    };
  }, [uploadedFile]);

  return (
    <div>
      <CForm>
        <CFormLabel>Video Title</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter video title"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
        />

        <CFormLabel className="mt-3">Description</CFormLabel>
        <CFormTextarea
          placeholder="Enter video description"
          rows="4"
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
        />

        <CFormLabel className="mt-3">Choose File</CFormLabel>
        <CFormInput type="file" accept=".mp4" onChange={handleFileChange} />

        {uploadProgress > 0 && (
          <div className="mt-3">
            <CProgress animated color="success" value={uploadProgress} className="mb-3" />
            <div>{`${uploadProgress}% Uploaded`}</div>
          </div>
        )}

        <CFormLabel className="mt-3">Add Video Link</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter video link"
          value={videoLink}
          id="videoLinkTextArea"
          readOnly
          onChange={(e) => setVideoLink(e.target.value)}
        />

        <CButton className="mt-3" style={{ backgroundColor: '#A23478', border: 'none' }} onClick={handleAddLink} disabled={!videoTitle || !videoDescription || !videoLink}>
          Genarate Iframe
        </CButton>


      </CForm>

      {successMsg && (
        <CAlert
          color={successMsg.includes('Error') ? 'danger' : 'success'}
          className="d-flex align-items-center mt-3"
        >
          <CIcon
            icon={successMsg.includes('Error') ? cilWarning : cilChevronCircleDownAlt}
            className="flex-shrink-0 me-2"
            width={24}
            height={24}
          />
          <div>{successMsg}</div>
        </CAlert>
      )}

    </div>
  );
};

export default FileUpload;
