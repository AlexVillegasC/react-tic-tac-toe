
import { Link }  from '../Link.jsx';

export default function AboutPage({ routeParams }) {
  return (
    <>
      <h2>About Page</h2>
      <img src='https://www.github.com/alexvillegasc.png' alt="Alex Photo"/>
      <p>Hi, this is Alex and Im creating a react router clone!</p>      
      <Link to='/'>Go to Home</Link>
    </>
  )
} 