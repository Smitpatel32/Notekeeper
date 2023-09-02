import React from 'react';

function Alert(props) {
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div className="container-fluid sticky-top" style={{top:"50px"}}>
            {props.alert && <div style={{height:"3rem",width:"97vw",position:"absolute"}} className={`alert alert-${props.alert.type} alert-dismissible`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong> {props.alert.msg}
            </div>}
        </div>
    )
}

export default Alert;