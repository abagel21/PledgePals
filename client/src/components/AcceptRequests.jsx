import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./styles/Requests.css";
import axios from "axios";

const AcceptRequests = (props) => {
  useEffect(() => {
    async function wrapperFunc() {
      console.log("GETTING MEDALLIONS");
      const res = await axios.get("/api/medallion/requests");
      console.log(res.data);
      setReqArr(res.data);
    }
    wrapperFunc();
  }, []);
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
    <div className="medallionPageWrapper">
      <div className="banner">
        <img src="../images/requests-des.png" alt="" />
      </div>
      {reqArr.length > 0 ? (
        <div className="requestswrapper">
          {reqArr.map(function (e) {
            console.log(JSON.stringify(e));
            return (
              <div className="medallion">
                <div className="medallion_inner">
                  <div className="front">
                    <h2 className="medallionContent">{e.content}</h2>
                    <div className="flexWrapper">
                      <img
                        className="medallion__pic"
                        src="../images/medallion_img.png"
                        alt="s"
                      />
                      <div className="name__wrapper" name={e._id}>
                        <label className="medallion__name">
                          {e.senderName}
                        </label>
                      </div>
                      <img
                        className="clock__pic"
                        src="../images/date_img.png"
                        alt="s"
                      />
                    </div>
                    <h1>{e.date}</h1>
                    <h1>{e.medal}</h1>
                  </div>
                  <div className="back">
                    <button className="complete">Complete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="requestswrapper">
          <h2 className="pendingError">
            You Don't Have Any Pending Medallions!
          </h2>
        </div>
      )}
    </div>
  );
};

function req(image, name, date, medal) {
  this.image = image;
  this.name = name;
  this.date = date;
  this.medal = medal;
}

AcceptRequests.propTypes = {};
export default AcceptRequests;
