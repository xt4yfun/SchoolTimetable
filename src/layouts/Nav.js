import React from "react";
import { Link } from "react-router-dom";
// import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Nav(){
return(
    <nav className="border bg-white p-4 flex justify-between items-center">
        <Link to="/Admin/">
            <div className="text-indigo-500 text-2xl"><strong>Ders Programı</strong></div>
        </Link>
        <div className="flex items-center space-x-4">
            <div className="flex ">
                <p type="text" placeholder="Admin name" className="bg-white p-2 rounded" >Tayfun Y</p>
                <p className="bg-white p-2 rounded hover:cursor-pointer">

                </p>
            </div>
        </div>
    </nav>

);
}
export default Nav;