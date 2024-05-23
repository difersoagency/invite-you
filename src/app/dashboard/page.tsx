"use client"

import React, { useEffect, useState, } from 'react'
import { Table, TableHeader, TableColumn, TableRow, TableCell, TableBody, getKeyValue, ChipProps, Tooltip, User, Chip, } from '@nextui-org/react'
import headDashboard from './headDashboard'
import {EyeIcon} from './../component/icon/EyeIcon'
import {DeleteIcon} from './../component/icon/DeleteIcon'
import {EditIcon} from './../component/icon/EditIcon'
import {head, users} from './../data/data'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

type User = typeof users[0];

const statusColorMap: Record<string, ChipProps["color"]> ={
  soon : "warning",
  finished : "success",
}


export default function Dashboard() {
  const router = useRouter();
  const token = Cookies.get('token');

  


  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];
  
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-xs text-gold capitalize">{user.email}</p>
          </div>
        );
      case "acara":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-xs text-gold capitalize">{user.template}</p>
          </div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit User">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete User">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);


  return (
    <section>
        {headDashboard()}

        
        <div className='px-10 py-7'>
          <h1 className='font-bold mb-5'>Daftar Client</h1>

          <Table aria-label="Example table with custom cells">
      <TableHeader columns={head}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
      </div>
    </section>
  )
}