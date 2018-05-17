const content = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'black'
};

export default {
  content,
  overlayContent: {
    ...content,
    backgroundColor: 'black',
    width: window.screen.width,
    height: window.screen.height,
    zIndex: 10,
    position: 'fixed',
    top: 0,
    left: 0,
    opacity: 0.7,
    color: 'white',
  },
  labelText: {
    fontSize: 20
  }
};