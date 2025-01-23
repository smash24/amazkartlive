
import {useNavigate} from  'react-router-dom'


export default function Search({keyword, setKeyword}) {
   
    
    const navigate = useNavigate()
    
    function searchHandler(){
    
    navigate("/search?keyword="+keyword)

      }

  return (
    <div className="col-12 col-md-6 mt-2 mt-md-0">
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          value={keyword}
        //   onBlur={searchHandler}
          
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />

        <div className="input-group-append">
          <button onClick={searchHandler} id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
