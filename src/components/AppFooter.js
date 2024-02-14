import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://adstudio.cloud" target="_blank" rel="noopener noreferrer">
          Adstudio
        </a>
        <span className="ms-1">&copy; 2024 creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://adstudio.cloud/" target="_blank" rel="noopener noreferrer">
          Adstudio
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
