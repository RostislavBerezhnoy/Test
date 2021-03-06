import React, { Component } from "react";
import PropTypes from "prop-types";
import { SpinnerComponent } from "../SpinnerComponent";


export default class Todos extends Component {
    constructor(props) {
        super(props);
        this.renderTodosCard = this.renderTodosCard.bind(this);
    }

    componentDidMount() {
        const { userId, onGetUserTodos } = this.props;
        onGetUserTodos(userId);
    }

    renderTodosCard(){
        const { userTodosList } = this.props;
        return (
            <div className="user-box todos-card margin-top-50px overflow-auto">
                <h3 className="text-center margin-bottom-20px">Текущие задачи</h3>
                {
                    userTodosList.map(c =>
                        <div className="margin-vertical-10px" key={c.id}>
                            <input className="display-inline margin-right-10px" type="checkbox" checked={c.completed} readOnly/>
                            <p className="display-inline font-size-17px">{c.title}</p>
                        </div>
                    )
                }
            </div>
        );
    }

    render() {
        const { loading } = this.props.userTodos;
        if(!loading){
            return this.renderTodosCard();
        } else {
            return (<SpinnerComponent/>);
        }
    }
}

Todos.propTypes = {
    userId: PropTypes.string.isRequired,
    onGetUserTodos: PropTypes.func.isRequired,
    userTodos: PropTypes.shape({
        list: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired
    }).isRequired,
    userTodosList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            userId: PropTypes.number,
            title: PropTypes.string,
            completed: PropTypes.bool,
        }).isRequired,
    ).isRequired,
};