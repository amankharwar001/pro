import { FaTwitter, FaFacebook, FaEnvelope, FaPlus } from "react-icons/fa";
import React from 'react';
import { FacebookShareButton, TwitterShareButton, EmailShareButton, FacebookIcon, TwitterIcon, EmailIcon } from 'react-share';

const SocialShare = ({ url, title }) => {
    return (
        <div className="container items-center flex justify-center mt-10">
            <div className="text-center">
                <span className="text-lg font-semibold text-foreground text-center">Social Share:</span>
                <div className="flex space-x-2 mt-2">
                    {/* Facebook Share */}
                    <FacebookShareButton
                        url={url}
                        quote={title}
                        className="p-2 rounded-lg bg-blue-700"
                    >
                        <FacebookIcon size={32}  />
                    </FacebookShareButton>

                    {/* Twitter Share */}
                    <TwitterShareButton
                        url={url}
                        title={title}
                        className="p-2 rounded-lg bg-blue-500"
                    >
                        <TwitterIcon size={32}  />
                    </TwitterShareButton>

                    {/* Email Share */}
                    <EmailShareButton
                        subject={title}
                        body={`Check out this article: ${url}`}
                        className="p-2 rounded-lg bg-slate-500"
                    >
                        <EmailIcon size={32}  />
                    </EmailShareButton>

                    {/* Add custom share functionality (not implemented with react-share) */}
                    {/* <a
                        href="#"
                        className="text-white p-2  bg-blue-500"
                    >
                        <FaPlus size={16} />
                    </a> */}
                </div>
            </div>
        </div>
    );
};

export default SocialShare;
