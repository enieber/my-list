import React from "react";
import { useMutation, gql } from "@apollo/client";

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!, $is_completed: Boolean!) {
    update_todos(
      where: { id: { _eq: $id } }
      _set: { is_completed: $is_completed }
    ) {
      returning {
        id
        is_completed
      }
    }
  }
`;

const REMOVE_TODO = gql`
  mutation RemoveTodo($id: Int!) {
    delete_todos(where: {id: { _eq: $id}}) {
        affected_rows
      }   
    }
`

export default function Todo(props) {
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [removeTodo] = useMutation(REMOVE_TODO)

  const onChange = e => {
    toggleTodo({
      variables: {
        id: props.todo.id,
        is_completed: !props.todo.is_completed
      }
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
      <input
        type="checkbox"
        className="todo-checkbox"
        name={props.todo.id}
        checked={props.todo.is_completed}
        onChange={onChange}
      />
      <p>{props.todo.title}</p>
      <bitton onClick={() => {
        removeTodo({
            variables: {
                id: props.todo.id
            }
        })
      }}>
          <span role="img" aria-label="sheep">❌</span></bitton>
    </div>
  );
}
