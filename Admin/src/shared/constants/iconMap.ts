import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import PaletteIcon from '@mui/icons-material/Palette';
import InventoryIcon from '@mui/icons-material/Inventory';
import LayersIcon from '@mui/icons-material/Layers';
import StraightenIcon from '@mui/icons-material/Straighten';
import CategoryIcon from '@mui/icons-material/Category';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
export const iconMap: Record<string, React.ElementType> = {
    SettingsOutlined: SettingsOutlinedIcon,
    PermIdentityOutlined: PermIdentityOutlinedIcon,
    ViewSidebarOutlined: ViewSidebarOutlinedIcon,
    EditOutlined: EditOutlinedIcon,
    DeleteOutlineOutlined: DeleteOutlineOutlinedIcon,
    Palette: PaletteIcon,
    Inventory: InventoryIcon,
    Layers: LayersIcon,
    Straighten: StraightenIcon,
    Category: CategoryIcon,
    ExpandLess: ExpandLessIcon,
    ExpandMore: ExpandMoreIcon,
    DashboardOutlined: DashboardOutlinedIcon,
    PushPin: PushPinIcon,
    AppsOutlined: AppsOutlinedIcon,
    AccountCircleOutlined: AccountCircleOutlinedIcon,
    Menu: MenuIcon,
    ChevronLeft: ChevronLeftIcon,
    ChevronRight: ChevronRightIcon,
};

export const getAllIconName: string[] = Object.keys(iconMap);