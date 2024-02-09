import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))



//Main Pages
const VideoInsert = React.lazy(() => import('./views/videoInsert/videoInsert.index'))
const IframeView = React.lazy(() => import('./views/ifraneView/iframeView.index.js'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/Video/Insert', name: 'Video Insert', element: VideoInsert },
  { path: '/Iframe/View', name: 'Iframe View', element: IframeView },


]

export default routes
