import React from 'react'
import PropTypes from 'prop-types'
import './styles/Requests.css'

const Requests = props => {
    const [reqArr, setReqArr] = React.useState([]);
    
    function handleClick(){
        setReqArr(function(prev){
            let img = "../images/medallion_img.png";
            prev.push(new req(img, "asdf","1/2/2020", img));
            return prev;
        });
        console.log(reqArr);
    }
    return (
        <div className="requestswrapper">
            <button onClick={handleClick}>Add Request</button>
            {reqArr.map(function(e){
                return (<div>
                    <img src={e.image} alt="s"/>
                    <h1>{e.name}</h1>
                    <h1>{e.date}</h1>
                    <h1>{e.medal}</h1>
                </div>
                )
            })}
        </div>
    )
}

function req(image,name, date, medal){
    this.image = image;
    this.name = name;
    this.date = date;
    this.medal = medal;  
}

Requests.propTypes = {

}
export default Requests;