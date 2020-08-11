import React from 'react'
import { Grid, Hidden } from '@material-ui/core'

function NewAppLayout() {
    return (
        <>
            <Grid
                container
                direction="row"
            >
                <Grid 
                    item
                    xs={12}
                    style={{backgroundColor: "red", height: "60px"}}
                >
                    navbar
                </Grid>
                <Grid
                    item
                    container
                    direction="colummn"
                >
                    <Grid
                        item
                        xs={3}
                        md={2}
                        lg={1}
                        style={{backgroundColor: "blue",  height: "2000px"}}
                    >
                        menu
                    </Grid>
                    <Grid
                        item
                        container
                        xs={9}
                        md={10}
                        lg={11}
                        style={{backgroundColor: "green",  height: "2000px"}}
                    >
                        <Grid                            
                            container
                            direction="row"
                        >
                            <Hidden xsUP>
                                <Grid  
                                    item
                                    xs={10}
                                    sm={5}
                                    md={3}
                                    lg={2}
                                    style={{backgroundColor: "yellow", margin: "5px", height: "5%"}} 
                                >
                                    now size is extra small or bigger
                                </Grid>
                            </Hidden>
                            <Hidden xsDown>
                                <Grid  
                                    item
                                    sm={5}
                                    md={3}
                                    lg={2}
                                    style={{backgroundColor: "yellow", margin: "5px", height: "5%"}} 
                                >
                                    now size is small or bigger
                                </Grid>
                            </Hidden>
                            <Hidden smDown>
                                <Grid  
                                    item
                                    md={3}
                                    lg={2}
                                    style={{backgroundColor: "yellow", margin: "5px", height: "5%"}} 
                                >
                                    now size is medium or bigger
                                </Grid>
                            </Hidden>
                            <Hidden mdDown>
                                <Grid  
                                    item
                                    lg={2}
                                    style={{backgroundColor: "yellow", margin: "5px", height: "5%"}} 
                                >
                                    now size is large or bigger
                                </Grid>
                            </Hidden>
                            <Hidden lgDown>
                                <Grid  
                                    item
                                    xl={2}
                                    style={{backgroundColor: "yellow", margin: "5px", height: "5%"}} 
                                >
                                    now size is extra large or bigger
                                </Grid>
                            </Hidden> 
                        </Grid>


                    </Grid>
                </Grid>
                <Hidden only={["sm", "xs"]}>
                    <Grid 
                        item
                        xs={12}
                        style={{backgroundColor: "yellow", height: "120px"}}
                    >
                        footer
                    </Grid>
                </Hidden>
                
            </Grid>
        </>
    )
}

export default NewAppLayout
