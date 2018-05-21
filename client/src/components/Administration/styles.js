const separator = {
  border: 'solid 0.1px lightgray', 
  width: '100%',
};

export default {
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  dataContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dataLabel: {
    fontSize: 18,
    paddingLeft: 5
  },
  separator,
  separatorWithPadding: {
    ...separator,
    paddingTop: 1,
    marginTop: 5
  }
};