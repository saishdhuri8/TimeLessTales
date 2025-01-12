import React, { useEffect, useState } from 'react';
import Tags from './Tags';
import LikeButton from './LikeButton';
import { useParams } from "react-router";
import { getDetailedPost, getUserBasicInfo } from '../services/APIS/apihit';
import { Link } from 'react-router';
import CommentSection from './Comments/CommentSection';

const DetailedCard = () => {
    const { postId } = useParams();

    const [post, setpost] = useState({});
    const [user, setuser] = useState({});



    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchCompeletePost = async () => {
            const completePost = await getDetailedPost(postId);
            setpost(completePost);
            const basicUserInfo = await getUserBasicInfo(completePost.owner);
            setuser(basicUserInfo);
        };
        fetchCompeletePost();
    }, []);


    return (
        <div className="min-h-screen bg-black">
            <article className="max-w-4xl mx-auto">
                {/* Owner Info Section */}
                <div className="flex items-center space-x-4 px-6 md:px-8 py-4">
                    <img
                        src={user.profilePic || "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png"}
                        alt="Owner's profile picture"
                        className="w-12 h-12 rounded-full object-cover"
                    />
                    <Link to={`/user/${post.owner}`}>
                        <span className="text-lg hover:underline font-semibold text-white">{`${user.name || ""} ${user.lastName || ""}`}</span>
                    </Link>
                </div>

                {/* Hero Image Section */}
                <div className="w-full h-[400px] relative overflow-hidden rounded-b-3xl">
                    <img
                        src={post.backgroundImage || ""}
                        alt="Modern workspace with laptop and coffee"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="px-6 md:px-8">
                    {/* Title */}
                    <h1 className="text-4xl font-bold text-violet-100 mt-8 mb-4">
                        {post.title || ""}
                    </h1>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags ? post.tags.map((currentTag, i) => (
                            <Tags tag={currentTag} key={i * 2} />
                        )) : <div></div>}
                    </div>

                    {/* Summary */}
                    <pre className="text-lg leading-relaxed text-gray-300 mt-6" style={{ whiteSpace: 'pre-wrap' }}>
                        {post.mainContent || ""}
                    </pre>


                    {/* Like Button */}
                    <div className="flex flex-col items-center m-5">
                        <LikeButton count={post?.likes?.length} postId={postId} />
                    </div>

                    {/* Comments Section */}
                    <CommentSection allComments={post?.comments} postId={postId} />
                </div>
            </article>
        </div>
    );
};

export default DetailedCard;
