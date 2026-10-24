import bannerImg from "../assets/banner.jpg";

function Banner() {
  return (
    <div className="banner">
      <img src={bannerImg} alt="Deakin University" />
      <div className="banner-text">Hello there, I'm Gaurav</div>
    </div>
  );
}

export default Banner;
