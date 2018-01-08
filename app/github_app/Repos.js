import React, {Component} from 'react';
import 'whatwg-fetch';
import {Link, browserHistory} from 'react-router';

class Repos extends Component {
    constructor() {
        super(...arguments);
        this.state={
            repositories: []
        };
    }

    componentDidMount(){
        fetch('https://api.github.com/users/pro-react/repos')
            .then((res) => {
                if (res.ok)
                    res.json()
                else
                    throw new Error('Server failed!');
            })
            .then((data) => { this.setState({ repositories: data }) })
            .catch((e) => {
                browserHistory.push('error')
            });
    }

    render() {
        let repos;
        if (this.state.repositories.length > 0) {
            repos = this.state.repositories.map((repo) => (
                <li key={repo.id}>
                    <Link to={"/repo/" + repo.name}>{repo.name}</Link>
                </li>
            ));
        }

        let child = this.props.children && React.cloneElement(this.props.children,
            {repositories: this.state.repositories}
        );

        return (
            <div>
                <h1>Github repositories</h1>
                <ul>
                    {repos}
                </ul>
                {child}
            </div>
        );
    }
}

export default Repos;