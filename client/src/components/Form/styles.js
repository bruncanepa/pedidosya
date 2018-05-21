const errorLabel = {
  color: 'red',
  textAlign: 'right',
  width: '100%'
};

export default {
  content : {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'rgb(241, 241, 241)',
    justifyContent: 'center',
  },
  inputContent : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  errorLabel,
  successLabel: {
    ...errorLabel,
    color: 'green'
  },
  errorContent : {
    height: 15,
    fontSize: 13,
    display: 'flex',
    alignItems: 'flex-end',
    width: '80%'
  }
}