

import React from 'react'
import { Table, TableHeader, TableColumn, TableRow, TableCell, TableBody } from '@nextui-org/react'


export default function MainContent() {
  return (
    <div>
      <p>jUDUL</p>
      <Table>
        <TableHeader>
          <TableColumn>Name</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Roy</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
