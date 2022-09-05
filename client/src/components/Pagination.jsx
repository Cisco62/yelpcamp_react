import React from "react";

import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import useStyles from './styles';
import { useSelector } from "react-redux";


const Paginate = ({ page }) => {
    const classes = useStyles();
    const { numberOfPages } = useSelector((state) => state.campgrounds);

    return (
        <Pagination classes={{ ul: classes.ul }} count={numberOfPages} page={Number(page) || 1} variant='outlined' color='primary' renderItem={(item) => (
            <PaginationItem {...item} component={Link} to={`/campgrounds?page=${item.page}`} />
        )} />
    );
}

export default Paginate;