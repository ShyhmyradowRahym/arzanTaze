import "./style.css";

function Carusel({arrayImage}){


    function goSlide(action){
        if(action) {
            document.getElementById("slide_c").scrollLeft += window.innerWidth
        } else {
            document.getElementById("slide_c").scrollLeft -= window.innerWidth
        }
    }

    return (
        <div className="carusel">
            <div onClick={()=> goSlide(false)} className="carusel_left_btn">&#10094;</div>
            <div className="carusel_head" id="slide_c">
                {
                    arrayImage.map((value, index) => {
                        return (
                            <img key={index} className="carusel_img" src={value} alt="carusel"/>      
                        )
                    })
                }
            </div>
            <div onClick={()=> goSlide(true)} className="carusel_right_btn">&#10095;</div>
        </div>        
    )
}

export default Carusel;