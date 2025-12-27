import React, { useState } from 'react'
import MiniShopTable, { Column } from '@/shared/components/table/MiniShopTable';
import { useRoleStore } from '@/common/stores/role.store';
import { roleService } from '@/common/services/role-service';
import { useQuery } from '@tanstack/react-query';
import { IRole } from '@/common/interface/role-interface';

const columnRole: Column<IRole>[] = [
    { id: 'code', label: 'Code', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'description', label: 'Mô tả', minWidth: 200 },
    { id: 'isActive', label: 'Kích hoạt', minWidth: 100, align: 'center' },
];

const RoleTab = () => {
    const { roles: roles, setRoles: setRoles } = useRoleStore();
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)
    const fetchRole = async () => {
        try {
            const res = await roleService.getAll();

            if (!res?.payload?.isSuccess) {
                throw new Error(res?.payload?.message || "Fetch role failed");
            }

            const data = res;
            setRoles(data?.payload?.data ?? []);
            return data;
        } catch (err) {
            console.error("Fetch role error:", err);
            throw err;
        }
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['roles'],
        queryFn: () => fetchRole(),
        placeholderData: (previousData) => previousData,
        refetchOnWindowFocus: false,
    });

    const roleData = data?.payload?.data ?? [];
    const roleTotal = data?.payload?.total ?? 0;
    return (
        <MiniShopTable<IRole>
            serverSide={true}
            columns={columnRole}
            rows={roleData}
            // onEdit={(row) => editRecord(row)}
            // onDelete={(row) => handleDelete(row, "deleteSoft")}
            // onDeleteHard={(row) => handleDelete(row, "deleteHard")}
            // onToggleStatus={(row) => handleChangeStatus(row)}
            // onRowClick={(row) => handleView(row)}
            onPageChange={(page, pageRole) => {
                setPage(page)
                setLimit(pageRole)
            }}
            pageSize={limit}
            totalCount={roleTotal}
        />
    )
}

export default RoleTab