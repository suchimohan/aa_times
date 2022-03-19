import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Error from "../../models/Error"
import Alert from '@mui/material/Alert';

class Props{
    errors: Error[]

    constructor(errors: Error[]) {
        this.errors = errors;
    }
};

export default function ErrorList(props: Props){
    const errors = props.errors;
return (
	    <List >
            {
              errors.map((err:Error)=>(
                <ListItem
                  key={`error-${err.id}`}
                  disableGutters>
                  <Alert severity="error">{`${err.message}`}</Alert>
                </ListItem>
              ))
            }
        </List>
	);
}