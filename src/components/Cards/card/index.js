import { Grid } from '@material-ui/core';
const Card = ({ children }) => {
    return (
        <Grid container className="main-card">
            <Grid item xs={1} sm={1} md={1}></Grid>
            <Grid item xs={10} sm={10} md={10}>
                {children}
            </Grid>
            <Grid item xs={1} sm={1} md={1}></Grid>
        </Grid>
    )
}

export { Card };