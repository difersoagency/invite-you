"use client"

import React, { useCallback, useEffect, useState, } from 'react'
import { Table, TableHeader, TableColumn, TableRow, TableCell, TableBody, getKeyValue, ChipProps, Tooltip, User, Chip, Button, } from '@nextui-org/react'
import HeadDashboard from './headDashboard'
import {EyeIcon} from './../component/icon/EyeIcon'
import {DeleteIcon} from './../component/icon/DeleteIcon'
import {EditIcon} from './../component/icon/EditIcon'
import {head, users} from './../data/data'
import { NextApiRequest } from 'next'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import axios from 'axios'
import { deleteProject, getProjectList } from '../../../services/manage'
import Link from 'next/link'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/ReactToastify.css';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure} from "@nextui-org/react";



type User = typeof users[0];

const statusColorMap: Record<string, ChipProps["color"]> ={
  soon : "warning",
  finished : "success",
}


export default  function Dashboard() {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [projectList, setProjectlist] = useState([]);
  const [idHapus, setIdHapus] = useState('');
  const getProjectListAPI = useCallback( async () =>{
  const data = await getProjectList()
  setProjectlist(data.data)

  if(data.status > 300 ){
    toast.error(data.message)
  }

  },[getProjectList])

  useEffect(()=>{
    getProjectListAPI()
    
  },[])
  const router = useRouter();
  const token = Cookies.get('token');
  if(!token) {
    router.push('/login');
    }

  const openNewTab = (link) => {
    const url =  `${process.env.NEXT_PUBLIC_WEB}${link}`;
    window.open(url, '_blank');
  };

  const openModalWithID = (id) => {
    setIdHapus(id);
    onOpen();
  };
  
  const hapusHandler = async () => {
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    try {
      
      const response = await deleteProject(idHapus);
      
      if (response.status >= 200 && response.status < 300) {
          onClose();
          toast.success("Berhasil di Hapus",
            {   
              onClose: () => {
                setTimeout(()=>{
                  window.location.reload();
                },500)
            }
            });
        //  router.push('/dashboard');
      } else {
          toast.error(response.message);
      }
  } catch (error) {
      console.error('Error:', error);
      toast.error('Gagal di Publish');
  }
  }
    

  const renderCell = React.useCallback((user: User, columnKey: React.Key,  id: string) => {
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
              <span onClick={() => openNewTab(user.link)}className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <Link href={`/create/${id}`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon />
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Delete Project">
            <button className="text-lg text-danger cursor-pointer active:opacity-50" type='button' onClick={() => openModalWithID(id)} >
            <DeleteIcon />
            </button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);


  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Konfirmasi Hapus</ModalHeader>
              <ModalBody>
                <p> 
                  Project akan dihapus ?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Batal
                </Button>
                <Button color="primary" onPress={hapusHandler}>
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    <section>
        <HeadDashboard/>

        
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
      <TableBody items={projectList}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey,item.id)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
      </div>
    </section>
     <ToastContainer></ToastContainer>
     </>
  )
}

