
import { Link }  from '../Link.jsx';

export default function HomePage(){
    return (
      <>
        <h2>Home Page</h2>
        <p>This is the home page example to use react router!</p>      
        <Link to='/about'>About</Link>
      </>
    )
  }