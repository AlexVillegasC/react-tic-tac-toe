import { Link } from "../Link";

export default function  Page404(){
  return (
    <>
      <h2>404</h2>
      <p>Sorry, the page you are looking for does not exist...</p>
      <Link to='/'>Go to Home</Link>
      <img src='https://miro.medium.com/v2/da:true/resize:fit:1200/0*ZjYSm_q36J4KChdn' alt="Not found"/>
    </>
  )
}