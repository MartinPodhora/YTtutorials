import React, { useState, useEffect, useContext} from 'react'
import { Link } from 'react-router-dom';
import { Button, Checkbox, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { HandleError as handleError } from "./ErrorAlert"
import Axios from 'axios';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

function MultiSelect() {
    const [personList, setPersonList] = useState([])

    useEffect(() => {
        Axios.get("http://192.168.0.61:9011/UAM/rest/applications/7289/users")
        .then(res => setPersonList(res.data))
        .catch(err => handleError(err, "MultiSelect"))
    }, [])

    return (
        <div>
            <Link to="/MartinPodhora/YTtutorials.git" style={{textDecoration: "none"}}>
                <Button
                    color="primary"
                    variant="contained"
                    style={{margin: '20px'}}
                >
                    back
                </Button>
            </Link>
            <Autocomplete
                multiple
                options={personList}
                disableCloseOnSelect
                getOptionLabel={(option) => option.firstName}
                renderOption={(option, { selected }) => (
                    <>
                      <Checkbox
                        icon={<CheckBoxOutlineBlankIcon/>}
                        checkedIcon={<CheckBoxIcon/>}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.firstName}
                    </>
                )}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined"  placeholder="search" />
                )}
            />
        </div>
    )
}

export default MultiSelect
