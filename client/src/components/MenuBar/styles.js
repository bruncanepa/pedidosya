const link = {
  alignItems: 'center',
  color: 'grey',
  flex: 1,
  paddingTop: 12,
  textAlign: 'center',
  backgroundColor: 'white',
  textDecoration: 'none',
  color: 'grey',
  height: 20,
  paddingBottom: 14,
};

export default {
  content: {
    paddingLeft: 0,
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 0,
    alignItems: 'center'
  },
  link,
  activeLink: {
    ...link,
    borderBottom: 'solid 2.5px rgb(245, 47, 65)',
    color: 'rgb(245, 47, 65)',
    paddingBottom: 11,
  }
};