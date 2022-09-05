import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));









/* @import url("https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap");
.wrapper {
    background-color: rgb(180, 129, 70);
    align-items: center;
    justify-content: center;
    padding: 50px;
    margin-top: 60px;
    margin-left: 400px;
    margin-right: 400px;
    border-radius: 40px;
    display: flex;
    font-family: 'PT Sans', sans-serif;
    
}
h1 {
    color: red;
    align-items: center;
    justify-content: center;
    margin-left: 100px
}
.form-inputs-data {
    padding: 20px;
    margin: 20px;
}
.form-inputs-data input {
    border-radius: 10px;
    border: none;
   
    width: 300px;
    height: 30px;
}
.form-inputs-data label {
    font-size: 500;
    font-weight: 700;
    margin-right: 20px;
}
.card-btns {
    padding: 1rem;
    font-family: inherit;
    font-weight: bold;
    background-color: blue;
    color: #fff;
    border-radius: 0.2rem;
    transition: background 200ms ease-in, color 200ms ease-in;
    cursor: pointer;
}
.btns {
    padding: 0 16px 8px 16px;
    display: flex;
    justify-content: space-between;
} */