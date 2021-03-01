import React, {useState} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  layout: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '0',
    paddingRight: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: `calc(100% - 50px)`,
    height: '100vh'
  },
  root: {
    margin: theme.spacing(5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  firstNumberPanel: {
    display: 'flex',
    alignItems: 'center'
  },
  addNumberBtn: {
    marginLeft: 50,
    textTransform: 'none',
    color: 'white',
    backgroundColor: green[200]
  },
  resultDiv: {
    marginTop: 50,
    display: 'flex',
    alignItems: 'center'
  },
  operatorPanel: {
    width: 80,
    height: 80,
    borderRadius: 5,
    backgroundColor: '#D5F4F5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    margin: 20
  },
  equalDiv: {
    marginTop: 50,
    fontSize: 50
  },
  resultNumber: {
    marginTop: 50,
    fontSize: 100,
    color: green[200]
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  addOperationDiv: {
    display: 'flex',
    alignItems: 'center'
  }
}));

function App() {
  const classes = useStyles();
  const [firstOperand, setFirstOperand] = useState(0);
  const [addFirstOperand, setAddFirstOperand] = useState(false);

  const [operator, setOperator] = useState(0);
  const [secondOperand, setSecondOperand] = useState(0);
  const [addOperation, setAddOperation] = useState(false);

  const [result, setResult] = useState(0);

  const onAddFirstOperand = () => {
    setAddFirstOperand(true);
  };

  const handleOperator = (event) => {
    setOperator(event.target.value);
    setResult(getResult(event.target.value));
  };

  const handleOperand = (e) => {
    setSecondOperand(Number(e.target.value));
  };

  const onAddOperation = () => {
    setAddOperation(true);
    setResult(getResult(operator));
  };

  const getOperator = (operator) => {
    switch (operator) {
      case 0:
        return '+';
      case 1:
        return '-';
      case 2:
        return '*';
      case 3:
        return '/';
      default:
        return '+';
    }
  };

  const getResult = (operator) => {
    switch (operator) {
      case 0: // +
        return firstOperand + secondOperand;
      case 1: // -
        return firstOperand - secondOperand;
      case 2: // *
        return firstOperand * secondOperand;
      case 3: // /
        return firstOperand / secondOperand;
      default:
        return firstOperand + secondOperand;
    }
  };

  return (
    <Container component="main" className={classes.layout}>
      <div className={classes.root}>
        <div className={classes.firstNumberPanel}>
          <TextField
            type={'number'}
            defaultValue={firstOperand}
            id="first_number"
            label="Please enter a number"
            variant="outlined"
            onChange={e => setFirstOperand(Number(e.target.value))}
          />
          <Button
            variant="contained"
            className={classes.addNumberBtn}
            onClick={onAddFirstOperand}
          >
            Add number
          </Button>
        </div>
        <div className={classes.resultDiv}>
          <div className={classes.operatorPanel}>
            {addFirstOperand ? firstOperand : '--'}
          </div>
          <div className={classes.operatorPanel}>
            {addOperation ? secondOperand : '--'}
          </div>
          <div className={classes.operatorPanel}>
            {addOperation ? getOperator(operator) : '--'}
          </div>
        </div>
        <div className={classes.equalDiv}>=</div>
        <div className={classes.resultNumber}>
          {addOperation ? result : '--'}
        </div>
        {addFirstOperand && (
          <div className={classes.addOperationDiv}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="operator_label">Operator</InputLabel>
              <Select
                id="operator"
                value={operator}
                onChange={handleOperator}
                label="operator"
              >
                <MenuItem value={0}>+</MenuItem>
                <MenuItem value={1}>-</MenuItem>
                <MenuItem value={2}>*</MenuItem>
                <MenuItem value={3}>/</MenuItem>
              </Select>
            </FormControl>
            <TextField
              type={'number'}
              defaultValue={secondOperand}
              id="operand"
              label="Operand"
              variant="outlined"
              onChange={e => handleOperand(e)}
            />
            <Button
              variant="contained"
              className={classes.addNumberBtn}
              onClick={onAddOperation}
            >
              Add Operation
            </Button>
          </div>
        )}
      </div>
    </Container>
  );
}

export default App;
