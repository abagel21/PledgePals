import React from 'react'
import PropTypes from 'prop-types'
import './styles/Sendreq.css'
import axios from 'axios'

const Sendreq = props => {
    function sendreq(){
        axios.get();
    }
    return (
        <div className="sendreq-wrapper">
            <div>
                <button className="btn btn-primary" onClick={sendreq}>Send a request</button>
            </div>
        </div>

    )
}

Sendreq.propTypes = {

}

export default Sendreq;
