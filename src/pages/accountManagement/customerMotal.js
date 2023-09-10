import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import React, { useState, useEffect } from 'react'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import axios from 'axios'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import ArrowUpDropCircleOutline from 'mdi-material-ui/ArrowUpDropCircleOutline'
import ArrowDownDropCircleOutline from 'mdi-material-ui/ArrowDownDropCircleOutline'
import CustomerTransitionsModal from './customerMotal'
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height:'100%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export default function BasicModal({data, item}) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen}>view</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Grid item xs={12}>
            <Card>
              <TableContainer>
                <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
                  <TableHead>
                    {/* <button onClick={() => setShow(x => !x)}> */}
                      {/* <ArrowUpDropCircleOutline /> */}
                    {/* </button> */}
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Order No</TableCell>
                      <TableCell>Transaction Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Credit</TableCell>
                      <TableCell>Debit</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.filter(x => x.user === item.user)
                      .map(row => (
                        <TableRow hover key={row._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                          <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                              <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                                {new Date(row.createdAt).toDateString()}
                              </Typography>
                              <Typography variant='caption'>{row.designation}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>{row.orderNo}</TableCell>
                          <TableCell>{row.transactionType}</TableCell>
                          <TableCell>{row.transactionAmount}</TableCell>
                          <TableCell>{row?.credit}</TableCell>
                          <TableCell>{row?.debit}</TableCell>
                          <TableCell>{'view'}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
        </Box>
      </Modal>
    </div>
  )
}
