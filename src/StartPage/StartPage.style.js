export const startPageStyles = theme => ({
  root: {
    backgroundColor: '#fff6',
    flexGrow: 1,
    margin: theme.spacing.unit * 3,
    maxWidth: '100%',
    padding: theme.spacing.unit * 3,
    position: 'relative'
  },
  background: {
    backgroundImage: 'url("./bg.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100%',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: -1
  },
  heroTitle: {
    color: '#fff',
    // fontWeight: 'bold',
    marginBottom: 30
  },
  card: {
    height: '100%',
    margin: '0 10px'
  },
  cardArea: {
    height: '100%'
  },
  paperContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeOptionGrid: {
    padding: 25
  },
  homeOptionsGridContainer: {
    display: 'flex'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});
