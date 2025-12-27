'use client'
import MiniShopCard from '@/shared/components/MiniShopCard'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Table, TableBody, TableContainer, Paper, TableHead, Typography } from '@mui/material'
import { useSidebarStore } from '@/common/stores/sidebar.store'
import { sidebarService } from '@/common/services/sidebar-service'
import EditCreateDialog from './components/EditCreateDialog'
import AlertDialog from './components/AlertDialog'
import DetailDialog from './components/DetailDialog'
import { ISidebar } from '@/common/interface/sidebar-interface'
import { StyledTableCell, StyledTableRowHead } from '@/shared/components/table/styled'
import { renderRows } from './components/RenderRow'
import { buildTree } from '@/common/utils/buildTree'

const SidebarPage = () => {
    const queryClient = useQueryClient()
    const [openDialogEditCreate, setOpenDialogEditCreate] = useState(false)
    const [openDialogAlter, setOpenDialogAlter] = useState(false)
    const [openDialogDetail, setOpenDialogDetail] = useState(false)
    const [type, setType] = useState<"changeStatus" | "deleteSoft" | "deleteHard">("changeStatus")
    const [expandedRows, setExpandedRows] = useState<string[]>([]);

    const { setSidebars, setSelectedSidebar, setSelectedParentSidebar } = useSidebarStore()

    const handleChangeStatus = (data: ISidebar & { children?: ISidebar[] }) => {
        setType("changeStatus")
        const { children, ...rest } = data
        setSelectedSidebar(rest)
        setOpenDialogAlter(true)
    }

    const editRecord = (data: ISidebar & { children?: ISidebar[] }) => {
        const { children, ...rest } = data
        setSelectedSidebar(rest)
        setOpenDialogEditCreate(true)
    }

    const createRecord = (parent: ISidebar | null) => {
        setSelectedSidebar(null)
        setSelectedParentSidebar(parent)
        setOpenDialogEditCreate(true)
    }

    const handleCloseDialogEditCreate = () => {
        queryClient.invalidateQueries({ queryKey: ['sidebars'] })
        setOpenDialogEditCreate(false)
        setSelectedParentSidebar(null)
    }

    const handleDelete = (data: ISidebar & { children?: ISidebar[] }) => {
        const { children, ...rest } = data
        setSelectedSidebar(rest)
        setType("deleteSoft")
        setOpenDialogAlter(true)
    }

    const handleDeleteHard = (data: ISidebar & { children?: ISidebar[] }) => {
        const { children, ...rest } = data
        setSelectedSidebar(rest)
        setType("deleteHard")
        setOpenDialogAlter(true)
    }


    const handleView = (data: ISidebar & { children?: ISidebar[] }) => {
        const { children, ...rest } = data
        setSelectedSidebar(rest)
        setOpenDialogDetail(true)
    }

    const handleCloseDialogDetail = () => setOpenDialogDetail(false)
    const handleCloseDialogAlter = () => {
        queryClient.invalidateQueries({ queryKey: ['sidebars'] })
        setOpenDialogAlter(false)
    }

    const fetchSidebar = async () => {
        const res = await sidebarService.getAll()
        if (!res?.payload?.isSuccess) throw new Error(res?.payload?.message || "Fetch sidebar failed")
        setSidebars(res?.payload?.data ?? [])
        return res
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['sidebars'],
        queryFn: fetchSidebar,
        refetchOnWindowFocus: false,
    })

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {error.message}</div>

    const treeData = buildTree(data?.payload?.data ?? [])

    return (
        <MiniShopCard title="Sidebar Page">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <StyledTableRowHead>
                            <StyledTableCell align='right'>
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    Name
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    Code
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell align='left'>
                                <Typography variant="subtitle2" fontWeight="bold">
                                    Path
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell align='center' >
                                <Typography variant="subtitle2" fontWeight="bold">
                                    Active
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell align='center' >
                                <Typography variant="subtitle2" fontWeight="bold">
                                    Actions
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell align='center' >
                                <Typography variant="subtitle2" fontWeight="bold">
                                    Add child
                                </Typography>
                            </StyledTableCell>
                        </StyledTableRowHead>
                    </TableHead>
                    <TableBody>
                        {renderRows(
                            treeData,
                            0,
                            createRecord,
                            editRecord,
                            handleView,
                            handleDelete,
                            handleDeleteHard,
                            handleChangeStatus,
                            null,
                            expandedRows,
                            setExpandedRows
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <EditCreateDialog open={openDialogEditCreate} onClose={handleCloseDialogEditCreate} />
            <AlertDialog open={openDialogAlter} onClose={handleCloseDialogAlter} type={type} />
            <DetailDialog open={openDialogDetail} onClose={handleCloseDialogDetail} />
        </MiniShopCard>
    )
}

export default SidebarPage
