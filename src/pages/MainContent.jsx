// import React from 'react';
// import Rest from './Rest'
// import SuggestedSubjects from './SuggestedSubjects'

import Frequent from "../components/home/Frequent";
import Rest from "../components/home/Rest";
import SuggestedSubjects from "./SuggestedSubjects";

// import Frequent from './Frequent';
export default function SideBar() {
    return (

        <div className="main-content">
            <Rest/>
            <Frequent />
            <SuggestedSubjects />
        </div>
    );
}