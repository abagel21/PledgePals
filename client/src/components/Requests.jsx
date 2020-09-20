import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import './styles/Requests.css'
import axios from 'axios';

const Requests = props => {
    useEffect(() => {
        async function wrapperFunc() {
            console.log("GETTING MEDALLIONS")
            const res = await axios.get("/api/medallion");
            console.log(res.data)
            setReqArr(res.data);
        }
        wrapperFunc();
    }, [])
    const [reqArr, setReqArr] = React.useState([]);
    
    function initializeArray(data){
        console.log(data);
        let tempArr = [];
        if(data.data.length == 0){
            return;
        }
        for(let i = 0; i < data.data.length; i++){
            // tempArr.push(new req(data.data[i].img, data.data[i].name,data.data[i].date, img));
        }
        setReqArr(function(prev){
            return [tempArr];
        });
    }
    useEffect(() =>{
        axios.get('/api/medallion/requests').then(function(data){
            initializeArray(data);
        });
    })
    return (
        <div className="medallionPageWrapper">
            <div className="banner">
                <img src="../images/requests-des.png" alt=""/>
            </div>
        <div className="requestswrapper">
            {reqArr.map(function(e){
                console.log(JSON.stringify(e))
                return (<div className="medallion">
                    <img src="../images/medallion_img.png" alt="s"/>
                    <div className="friendWrapper" name={e._id}>
                  <label className="friendName">{e.name}</label>
                </div>
                    <h1>{e.date}</h1>
                    <h1>{e.medal}</h1>
                </div>
            )
        })}
        </div>
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