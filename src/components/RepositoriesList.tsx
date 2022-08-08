import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IGitHubRepo } from '../interfaces/IGitHubRepo';

const RepositoriesList = (props: { repositoriesUrl: string }) => {
    const { repositoriesUrl } = props;
    const [repositoriesList, setRepositoriesList] = useState<IGitHubRepo[]>([]);
    useEffect(() => {
        (async () => {
            const result = await axios.get<IGitHubRepo[]>(repositoriesUrl);
            setRepositoriesList(result.data);
        })();
    }, [repositoriesUrl])

    return (
        <div>
            {!repositoriesList.length && <p>No repositories found.</p>}
            {repositoriesList.length &&
                <ul>
                    {repositoriesList.map(repository => <li key={repository.id}>
                        <a href={repository.html_url} target="_blank" rel="noreferrer" >{repository.name}</a></li>)}
                </ul>
            }
        </div>
    );
}

export default RepositoriesList;