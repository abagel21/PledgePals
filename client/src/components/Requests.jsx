import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import './styles/Requests.css'

const Requests = props => {
    const [reqArr, setReqArr] = React.useState([]);
    
    function handleClick(){
        setReqArr(function(prev){
            let img = "../images/medallion_img.png";
            return [...prev, new req(img, "asdf","1/2/2020", img)];
        });
        console.log(reqArr);
    }
    return (
        <div className="requestswrapper">
            <img src="../images/medallion_img.png" alt="medal"/>
            <button onClick={handleClick}>Add Request</button>
            <ul>{reqArr.map(function(e){
                console.log(JSON.stringify(e))
                return (<div>
                    <img src={e.image} alt="s"/>
                    <h1>{e.name}</h1>
                    <h1>{e.date}</h1>
                    <h1>{e.medal}</h1>
                </div>
            )
        })}</ul>
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