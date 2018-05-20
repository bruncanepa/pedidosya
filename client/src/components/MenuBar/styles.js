const li = {
  alignItems: 'center',
  color: 'black',
  flex: 1,
  paddingBottom: 12,
  textAlign: 'center',
  textTransformation: 'uppercase',
};

const link = {
  textDecoration: 'none',
  color: 'black'  
};

export default {
  content: {
    backgroundColor: 'rgb(241, 241, 241)',
    height: 30,
  },
  ul: {
    paddingLeft: 0,
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  li,
  activeLi: {
    ...li,
    borderBottom: 'solid rgb(245, 47, 65)',
    color: 'rgb(245, 47, 65)',
  },
  link,
  activeLink: {
    ...link,
    color: 'rgb(245, 47, 65)',
  }
};