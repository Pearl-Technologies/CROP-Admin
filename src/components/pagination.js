import React from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
const PaginationComponent = ({count, limit, callback, page}) => {
  return (
    <Stack spacing={2} style={{ float: 'right' }}>
      <Pagination count={Math.ceil(count / limit)} color='primary' onChange={(event, value) => callback(value)} page={page}/>
    </Stack>
  )
}

export default PaginationComponent
