export const contactDialogStyles = theme => ({
  card: {
    display: 'flex',
    marginBottom: 10
  },
  noTextDecoration: {
    textDecoration: 'none'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  content: {
    flex: '1 0 auto',
    paddingBottom: '0 !important'
  },
  bigAvatar: {
    height: '100%',
    margin: '10px 20px',
    maxHeight: 150,
    maxWidth: 150,
    width: 'auto'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
});
