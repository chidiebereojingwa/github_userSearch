import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IGitHubGist } from '../interfaces/IGitHubGist';

const GistsList = (props: { gistsUrl: string }) => {
    const { gistsUrl } = props;
    const [gistsList, setGistsLists] = useState<IGitHubGist[]>([]);

    useEffect(() => {
        (async () => {
            const url = gistsUrl.replace(/\{.*\}/, '');
            const result = await axios.get<IGitHubGist[]>(url);
            setGistsLists(result.data);
        })();
    }, [gistsUrl]);

    return (
        <div>
            {!gistsList.length && <p>No gists found.</p>}
            {!!gistsList.length &&
                <ul>
                    {gistsList.map(gist => <li key={gist.id}>
                        <a href={gist.html_url} target="_blank" rel="noreferrer">
                            {gist.description || 'No Description'}
                        </a>
                    </li>)}
                </ul>
            }
        </div>
    );
};

export default GistsList;