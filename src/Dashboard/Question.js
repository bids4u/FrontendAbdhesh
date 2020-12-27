import React from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';


function Question(props) {
    const [value, setValue] = React.useState('');
    const handleChange = (event) => {
        setValue(event.target.value);
        props.ans({qid:props.qid,ans:event.target.value})
      };
    
    return (
        <div>
        <Card style={{padding:"10px",margin:"10px"}}>
            <FormControl component="fieldset">
            <FormLabel component="legend">{props.qn}. {props.question}</FormLabel>
            {props.code?<code>{props.code}</code>:null}
            <RadioGroup aria-label="quiz" name="quiz1" value={value} onChange={handleChange}>
                {props.option1?<FormControlLabel value={props.option1} control={<Radio />} label={props.option1} />:null}
                
                {props.option2?<FormControlLabel value={props.option2} control={<Radio />} label={props.option2} />:null}
                
                {props.option3?<FormControlLabel value={props.option3} control={<Radio />} label={props.option3} />:null}
                
                {props.option4?<FormControlLabel value={props.option4}  control={<Radio />} label={props.option4} />:null}
                
            </RadioGroup>
            </FormControl>
            <CardActions>
            </CardActions>
        </Card>
        </div>
    )
}

export default Question
