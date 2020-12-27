import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

function QuestionList(props) {
    return (
        <>
            <ListItem button>
              <ListItemText primary={props.question}/>
            </ListItem>
        </>
    )
}

export default QuestionList
