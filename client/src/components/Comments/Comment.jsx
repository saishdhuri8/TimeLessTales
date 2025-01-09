import { Link } from "react-router";

const Comment = ({ currentComment }) => {
    const comment=currentComment.comment;
    const { name, lastName, profilePic} = currentComment.user;

    return (
        <div className="w-full bg-slate-700 p-4 rounded-lg mb-4 flex items-center gap-4">
            {/* User Profile Picture */}
            <img
                src={profilePic || 'https://via.placeholder.com/50'} 
                alt={`${name} ${lastName}`}
                className="w-12 h-12 rounded-full object-cover"
            />

            {/* User Name and Comment */}
            <div>
                <Link to={`/user/${currentComment.userId}`}><h3 className="text-white hover:underline font-medium">
                    {name} {lastName}
                </h3></Link>
                <p className="text-gray-300">{comment}</p>
            </div>
        </div>
    );
};

export default Comment;
