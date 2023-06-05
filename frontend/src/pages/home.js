import { useSelector } from "react-redux";
import UserAsideInfo from "../components/UserAsideInfo";
import PostForm from "../components/PostForm";
import Posts from "../components/Posts";
import ads from "../assets/images/ads/ads.png";
import postServices from "../services/posts";
import { useQuery } from "react-query";
const Home = () => {
    const { user } = useSelector(state => state.auth);
    const { data, isLoading, error } = useQuery(
        "getPosts",
        postServices.getFeedPosts
    );
    return (
        <div className="home  py-10 px-4  grid grid-cols-1 lg:grid-cols-4 gap-4">
            <UserAsideInfo user={user} />
            <div className="posts  md:col-span-2">
                <PostForm user={user} />
                <Posts data={data} isLoading={isLoading} error={error} />
            </div>
            <div>
                <div className="bg-white dark:bg-secondry-dark rounded-sm shadow-sm p-4 mb-4">
                    <div className="ads">
                        <div className="flex items-center justify-between mb-4">
                            <h3>Sponsored</h3>
                            <button>Create Ads</button>
                        </div>
                        <img
                            src={ads}
                            alt="ads"
                            className="rounded-lg max-h-[200px] w-full mb-4"
                        />
                        <p>
                            Hulu Launches Binge Ad Experience As Users Sour On
                            Interruptive Ads
                        </p>
                    </div>
                </div>
                <div className="bg-white dark:bg-secondry-dark  rounded-sm shadow-sm p-4">
                    <div className="ads">
                        <div className="flex items-center justify-between mb-4">
                            <h3>Sponsored</h3>
                            <button>Create Ads</button>
                        </div>
                        <img
                            src={ads}
                            alt="ads"
                            className="rounded-lg max-h-[200px] w-full mb-4"
                        />
                        <p>
                            Hulu Launches Binge Ad Experience As Users Sour On
                            Interruptive Ads
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
