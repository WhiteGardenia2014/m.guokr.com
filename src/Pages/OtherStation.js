import { Outlet, useLocation } from "react-router-dom"
import NotFound from "./NotFound"

function OtherStation() {
  const location = useLocation()
  const pathname = location.pathname

  const validPath = ['/foodlab', '/calendar', '/pretty']
  if (validPath.indexOf(pathname) === -1) {
    return (
      <NotFound />
    )
  } else {
    return (
      <>
        <div style={{marginTop: '44px'}}></div>
        <Outlet />
      </>
    )
  }
}

export default OtherStation