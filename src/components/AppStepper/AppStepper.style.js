export const appStepperStyle = theme => ({
  root: {
    background: 'transparent',
    height: '100%',
    padding: theme.spacing.unit * 3,
    position: 'relative'
  },
  stepper: {
    background: 'transparent'
  },
  helpIcon: {
    position: 'absolute',
    right: 10,
    top: 5
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  btnContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
  }
});
