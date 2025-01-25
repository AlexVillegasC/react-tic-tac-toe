import React from 'react';
import { FollowMouse } from './components/FollowMouse';

function App() {  

  const [mounted, setMounted] = React.useState(true)

  return (
    <main>     
      {mounted && <FollowMouse></FollowMouse>}
      <button onClick={() => setMounted(!mounted)}>
          Toggle Show MouseFollower Component
      </button>
    </main>
  )
}

export default App
