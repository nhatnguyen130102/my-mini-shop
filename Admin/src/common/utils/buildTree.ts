import { ISidebar, ISidebarTree } from "../interface/sidebar-interface"

export const buildTree = (items: ISidebar[]): ISidebarTree[] => {
    const map: Record<string, ISidebarTree> = {}
    const roots: ISidebarTree[] = []

    for (const item of items) {
        map[item.id] = { ...item, children: [] }
    }

    for (const item of items) {
        const node = map[item.id]
        if (item.parentId && map[item.parentId]) {
            map[item.parentId]?.children.push(node)
        } else {
            roots.push(node)
        }
    }

    return roots
}
