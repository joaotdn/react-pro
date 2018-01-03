import React, { Component } from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import 'babel-polyfill';
import update from 'react-addons-update';
import {throttle} from './snack-shopp/utils';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    Authorizarion: 'joaotdn'
};

class KanbanBoardContainer extends Component {
    constructor() {
        super();
        this.state={
            cards: [],
        };

        // only call updateCardStatus when arguments change
        this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
        // call updateCardPosition at max every 500ms (or when arguments change)
        this.updateCardPosition = throttle(this.updateCardPosition.bind(this));
    }

    componentDidMount() {
        fetch(`${API_URL}/cards`, {headers: API_HEADERS})
            .then((res) => res.json())
            .then((data) => {
                this.setState({cards: data});
                window.state = this.state;
            })
    }

    addTask(cardId, taskName) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let newTask = {id: Date.now(), name: taskName, done: false};
        let nextState = update(this.state.cards,
            {
                [cardIndex]: {
                    tasks: {$push: [newTask]}
                }
            }
        );

        this.setState({cards: nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
            .then((res) => {
                if (res.ok) {
                    res.json()
                } else {
                  throw new Error("Server response wasn't OK");
                }
            })
            .then((data) => {
                newTask.id=data.id;
                this.setState({cards: nextState});
            })
            .catch((e) => {
                this.setState(prevState);
            });
    }

    deleteTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$splice: [[taskIndex,1]]}
            }
        });

        this.setState({cards: nextState});

        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        })
            .then((res) => {
                if(!res.ok)
                    throw new Error("Server response wasn't OK");
            })
            .catch((e) => {
                this.setState(prevState);
            });
    }

    toggleTask(cardId, taskId, taskIndex) {
        let prevState;
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let newDoneValue;
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {$apply: (done) => {
                            newDoneValue = !done;
                            return newDoneValue;
                        }}
                    }
                }
            }
        });

        this.setState({cards: nextState});

        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done:newDoneValue})
        })
            .then((res) => {
                if(!res.ok)
                    throw new Error("Server response wasn't OK");
            })
            .catch((e) => {
                this.setState(prevState);
            });
    }

    updateCardStatus(cardId, listId) {
        let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
        let card = this.state.cards[cardIndex];
        if (card.status !== listId) {
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: { $set: listId }
                    }
                }
            }));
        }
    }

    updateCardPosition(cardId, afterId) {
        if (cardId !== afterId) {
            let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
            let card = this.state.cards[cardIndex];
            let afterIndex = this.state.cards.findIndex((card) => card.id === afterId);

            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }));
        }
    }

    persistCardDrag(cardId, status) {
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
        let card = this.state.cards[cardIndex];

        fetch(`${API_URL}/cards/${cardId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({
                status: card.status,
                row_order_position: cardIndex
            })
        })
            .then((res) => {
                if(!res.ok)
                    throw new Error("Server respond wasn´t OK");
            })
            .catch((e) => {
                console.log("Fetch error: ", e);
                this.setState(update(this.state, {
                    cards: {
                        [cardIndex]: {
                            status: {$set: status}
                        }
                    }
                }));
            });
    }

    render() {
        fetch(API_URL + '/cards', {headers: API_HEADERS})
            .then((res) => res.json())
            .then((data) => this.setState({cards: data}))
            .catch((e) => {
               console.log('Error fetching and parsing data', e);
            });

        return <KanbanBoard cards={this.state.cards}
                            taskCallbacks={{
                                toggle: this.toggleTask.bind(this),
                                delete: this.deleteTask.bind(this),
                                add: this.addTask.bind(this) }}
                            cardCallbacks={{
                                updateStatus: this.updateCardStatus,
                                updatePosition: this.updateCardPosition,
                                persistCardDrag: this.persistCardDrag.bind(this)
                            }}/>
    }
}

export default KanbanBoardContainer;