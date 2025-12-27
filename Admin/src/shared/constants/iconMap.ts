import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import StraightenIcon from '@mui/icons-material/Straighten';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
export const iconMap: Record<string, React.ElementType> = {
    SettingsOutlined: SettingsOutlinedIcon,
    PermIdentityOutlined: PermIdentityOutlinedIcon,
    ViewSidebarOutlined: ViewSidebarOutlinedIcon,
    EditOutlined: EditOutlinedIcon,
    DeleteOutlineOutlined: DeleteOutlineOutlinedIcon,
    Palette: PaletteOutlinedIcon,
    Layers: LayersOutlinedIcon,
    Straighten: StraightenIcon,
    Category: CategoryOutlinedIcon,
    ExpandLess: ExpandLessIcon,
    ExpandMore: ExpandMoreIcon,
    DashboardOutlined: DashboardOutlinedIcon,
    PushPin: PushPinOutlinedIcon,
    AppsOutlined: AppsOutlinedIcon,
    AccountCircleOutlined: AccountCircleOutlinedIcon,
    Menu: MenuIcon,
    ChevronLeft: ChevronLeftIcon,
    ChevronRight: ChevronRightIcon,
    LockOutlined: LockOutlinedIcon,
    PeopleOutlined: PeopleOutlinedIcon,
    Inventory2Outlined: Inventory2OutlinedIcon,
    LocalOfferOutlined: LocalOfferOutlinedIcon,
    ShoppingCartOutlined: ShoppingCartOutlinedIcon,
    PaymentOutlined: PaymentOutlinedIcon,
    GroupOutlined: GroupOutlinedIcon,
};


export const getAllIconName: string[] = Object.keys(iconMap);
