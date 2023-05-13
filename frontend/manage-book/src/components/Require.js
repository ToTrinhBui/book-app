import React from "react";
import { Link } from "react-router-dom";

export default function Require(){
    return(
        <div className="require container">
            <p>Please <span><Link to='/login'>Login</Link></span> to see this content.</p>
        </div>
    )
}