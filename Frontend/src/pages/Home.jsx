import Banner from "../components/Banner";
import About from "../components/About";
import Work from "../components/Work";
import FeaturedSection from "../components/FeaturedSection";
import Photos from "../components/Photos";
import { articles } from "../data/articles";
import { tutorials } from "../data/tutorials";

function Home() {
    return (
        <>
            <Banner />
            <About />
            <Work />
            <FeaturedSection id="articles" heading="Featured Articles" items={articles} buttonText="See all articles" />
            <FeaturedSection id="tutorials" heading="Featured Tutorials" items={tutorials} buttonText="See all tutorials" />
            <Photos />
        </>
    );
}

export default Home;