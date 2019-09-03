export const reportPageStyles = theme => ({
    root: {
        flexGrow: 1,
        height: "100%",
    },
    paperContainer: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    bodyList: {
        marginBottom: 35
    },
    list: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
        overflow: "hidden"
    },
    inline: {
        display: 'inline',
    },
});