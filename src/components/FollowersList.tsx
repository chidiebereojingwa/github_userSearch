import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IGitHubFollower } from '../interfaces/IGitHubFollower';

const FollowersList = (props: { followersUrl: string }) => {
    const { followersUrl } = props;
    const [followersList, setFollowersList] = useState<IGitHubFollower[]>([]);

    useEffect(() => {
        (async () => {
            const result = await axios.get<IGitHubFollower[]>(followersUrl)
            setFollowersList(result.data);
        })();
    }, [followersUrl]);

    return (
        <div>
            {!followersList.length && <p>No followers found.</p>}
            {followersList.length &&
                followersList.map(follower =>
                    <div key={follower.id} className="follower">
                        <img src={follower.avatar_url} alt={follower.login} />
                        <h3><a href={follower.html_url} target="_blank" rel="noreferrer">{follower.login}</a></h3>
                    </div>
                )
            }
        </div>
    );
};

export default FollowersList;