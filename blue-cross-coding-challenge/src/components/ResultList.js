import { useState } from 'react';
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './ResultList.css';

const ResultList = ({ recipes }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    //Fill empty rows when results do not fill the last page.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - recipes.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableBody>
                    {(rowsPerPage > 0
                    ? recipes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : recipes
                    ).map(recipe => (
                        <TableRow key={recipe.id}> 
                            <TableCell component="th" scope="row">
                                <img src={recipe.image} alt="recipe" />
                            </TableCell> 
                            <TableCell>
                                <Link  to={`/recipe-details/${recipe.id}`}>{recipe.title}</Link>
                            </TableCell>   
                        </TableRow>
                      ))}
                      {emptyRows > 0 && (
                          <TableRow style={{ height: 53 * emptyRows }}>
                              <TableCell colSpan={6} />
                          </TableRow>
                       )}
                </TableBody>
                <TableFooter className="pagination">
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            colSpan={2}
                            count={recipes.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            showFirstButton={true}
                            showLastButton={true}/>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default ResultList;