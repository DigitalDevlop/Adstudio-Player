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
    CToast,
    CToaster,
    CToastBody,
    CToastHeader,
    CAlert,
} from '@coreui/react';
import { insertGenrateIframe } from './service/videoInsert.service'
import { cilWarning, cilChevronCircleDownAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import VideoFileInsert from './videoFileInsert'

const VideoInsert = () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileAccessLink, setFileAccessLink] = useState(null);
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [videoLink, setVideoLink] = useState('');
    const [uploadOption, setUploadOption] = useState(null);

    const [successMsg, setSuccessMsg] = useState('');


    useEffect(() => {
        // Set a timeout to clear the successMsg after 5 minutes
        const timeoutId = setTimeout(() => {
            setSuccessMsg('');
        }, 2 * 1000);

        // Clear the timeout if the component is unmounted
        return () => clearTimeout(timeoutId);
    }, [successMsg]);

    const resetValues = () => {
        setVideoTitle('');
        setVideoDescription('');
        setVideoLink('');
    };


    const handleUploadFile = useCallback(() => {
        // Implement file upload logic here
    }, [uploadedFile]);

    const handleAddLink = useCallback(() => {
        const requestData = {
            link: videoLink,
            name: videoTitle,
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

    const handleOptionSelect = option => {
        setUploadOption(option);
    };

    return (
        <CRow>
            <CCol xs={12}>

                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Choose Upload Option</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CButton className="m-2"  style={{ backgroundColor: '#A23478', border: 'none' }} onClick={() => handleOptionSelect('file')}>
                            Add Video
                        </CButton>
                        <CButton className='m-2' style={{ backgroundColor: '#A23478', border: 'none' }} onClick={() => handleOptionSelect('link')}>
                            Add Video Link
                        </CButton>
                    </CCardBody>
                </CCard>

                {uploadOption === 'file' && (
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>File Upload</strong>
                        </CCardHeader>
                        <CCardBody>
                            <CForm>
                                <VideoFileInsert />
                            </CForm>
                        </CCardBody>
                    </CCard>
                )}

                {uploadOption === 'link' && (
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Video Uplod</strong>
                        </CCardHeader>
                        <CCardBody>
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
                                <CFormLabel className="mt-3">Add Video Link</CFormLabel>
                                <CFormInput
                                    type="text"
                                    placeholder="Enter video link"
                                    value={videoLink}
                                    onChange={(e) => setVideoLink(e.target.value)}
                                />

                                <CButton className="mt-3"  style={{ backgroundColor: '#A23478', border: 'none' }} onClick={handleAddLink} disabled={!videoTitle || !videoDescription || !videoLink}>
                                    Genarate Iframe
                                </CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                )}

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
            </CCol>
        </CRow>
    );
};

export default VideoInsert;
