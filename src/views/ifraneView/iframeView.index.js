import React, { useState, useRef, useEffect } from 'react';
import SlidingSidePanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css'; // Make sure to import the CSS as well

import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CButton,
  CTableHead
} from '@coreui/react';
import copy from 'copy-text-to-clipboard';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getIframeView } from './services/iframeView.service'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula, dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';





function IframeViewindex() {
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [emberdLink, setEmberdLink] = useState('');
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch data from the API 
      getIframeView()
            .then(response => {
                if (response.status === 200) {
                  setTableData(response.data.data);
        

                } else {
                    // Handle other status codes if needed
                }
            })
            .catch(error => {
                // Handle any error scenarios for the request
                console.error('Error Genarate File:', error);

            });
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  const handleEmberdClick = (link) => {
    setEmberdLink(link);
    setShowSidePanel(true);
  };

  const closeSidePanel = () => {
    setShowSidePanel(false);
  };

  const copyToClipboard = () => {
    try {
      copy(emberdLink);
      toast.success('🎬 Copy to clipboard !', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
      toast.error('Error copying to clipboard');
    }
  };

  return (
    <div>
      <CRow>
        <CCol xs={24} md={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Iframe View</strong>
            </CCardHeader>
            <CCardBody>
              <CTable striped>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col"> </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Video Link</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Embed</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableData.map((rowData, index) => (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{rowData.attributes.videoTitle}</CTableDataCell>
                      <CTableDataCell>{rowData.attributes.filePath}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          onClick={() =>
                            handleEmberdClick(rowData.attributes.iframe)
                          }
                          style={{ backgroundColor: '#A23478', border: 'none',color:'white' }}
                        >
                          Embed
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Sliding Side Panel */}
      <SlidingSidePanel
        type="right"
        isOpen={showSidePanel}
        size={30}
        onClose={closeSidePanel}
      >
        <ToastContainer />
        <div className="side-panel" style={{ backgroundColor: 'white', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CCardHeader className='m-3'>
              <h3>Iframe</h3>
            </CCardHeader>
          <CCard className="mb-4" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            
          <CCardBody style={{ width: '100%' }}>
          <SyntaxHighlighter language="javascript" style={dracula}>
        {emberdLink}
      </SyntaxHighlighter>

  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <CButton style={{ backgroundColor: '#A23478', border: 'none' }} onClick={copyToClipboard}>
      Copy
    </CButton>
  </div>
</CCardBody>


          </CCard>
          <div style={{ alignSelf: 'flex-end', margin: '10px' }}>
            <CButton onClick={closeSidePanel} className="ml-2"  style={{ backgroundColor: '#A23478', border: 'none' }}>Close</CButton>
          </div>
        </div>
      </SlidingSidePanel>
    </div>
  );
}

export default IframeViewindex;
