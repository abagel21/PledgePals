import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import './styles/Requests.css'
import axios from 'axios';

const Requests = props => {
    const [reqArr, setReqArr] = React.useState([]);
    
    // function initializeArray(data){
    //     let tempArr = [];
    //     for(let i = 0; i < data.length; i++){
    //         tempArr.push(new req(data[i].img, data[i].name,data[i].date, img));
    //     }
    //     setReqArr(function(prev){
    //         return [tempArr];
    //     });
    // }
    // useEffect(() =>{
    //     axios.get('/getdata').then();
    // })
    return (
        <div className="requestswrapper">
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