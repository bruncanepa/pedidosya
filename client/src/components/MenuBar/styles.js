const link = {
  alignItems: 'center',
  flex: 1,
  paddingTop: 12,
  textAlign: 'center',
  backgroundColor: 'rgb(245, 47, 65)',
  textDecoration: 'none',
  color: 'pink',
  height: 20,
  paddingBottom: 14,
};

export default {
  content: {
    // borderTop: 'solid 1px white',
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
    borderBottom: 'solid 2.5px white',
    color: 'white',
    paddingBottom: 11,
  }
};