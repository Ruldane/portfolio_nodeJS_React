import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: "auto",
        height: "auto",
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

const  TitlebarGridList = ({project, children}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <GridList cellHeight={300} className={classes.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                </GridListTile>
                    <GridListTile key={project.img} cols={2}>
                        <img src={`/images/${project.img}`} alt={project.title} />
                        <GridListTileBar
                            title={project.title}
                            subtitle={<span>using: {project.description}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${project.title}`} className={classes.icon}>
                                    <a href={project.link} target='_blank'>
                                        <GitHubIcon />
                                    </a>
                                </IconButton>
                            }

                        />
                        <div className="readMore">
                            {children}
                        </div>
                    </GridListTile>
                )}
            </GridList>
        </div>
    );
}

export default TitlebarGridList
