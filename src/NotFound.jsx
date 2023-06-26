import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="found">
            <h2>sorry</h2>
            <p>This page cannot be found</p>
            <Link to="/">back to home</Link>
        </div>
     );
}
 
export default NotFound;