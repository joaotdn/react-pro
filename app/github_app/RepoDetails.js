import React, {Component} from 'react';
import 'babel-polyfill';

class RepoDetails extends Component {

    renderRepository(){
        let repository = this.props.repositories.find((repo) => repo.name === this.props.params.repo_name);
        return (
            <div>
                <h2>{repository.name}</h2>
                <p>{repository.description}</p>
                <span>{repository.stargazers_count} stars!</span>
            </div>
        );
    }

    render() {
        if (this.props.repositories.length > 0) {
            return this.renderRepository();
        } else {
            return <h4>Loading...</h4>;
        }
    }
}

export default RepoDetails;