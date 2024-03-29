// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import Database from 'mdi-material-ui/Database'
import AccountCog from 'mdi-material-ui/AccountCog'
import NotificationClearAll from 'mdi-material-ui/NotificationClearAll'
import AccountConvertOutline from 'mdi-material-ui/AccountConvertOutline'
import AccountArrowUpOutline from 'mdi-material-ui/AccountArrowUpOutline'
import AccountGroupOutline from 'mdi-material-ui/AccountGroupOutline'
import MessageTextOutline from 'mdi-material-ui/MessageTextOutline'
import BadgeAccountOutline from 'mdi-material-ui/BadgeAccountOutline'
import SmartToyIcon from '@mui/icons-material/SmartToy'


const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    // {
    //   title: 'Account Settings',
    //   icon: BadgeAccountOutline,
    //   path: '/account-settings'
    // },
    // {
    //   sectionTitle: 'Pages'
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    // {
    //   sectionTitle: 'User Interface'
    // },
    // {
    //   title: 'Typography',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Icons',
    //   path: '/icons',
    //   icon: GoogleCirclesExtended
    // },
    // {
    //   title: 'Cards',
    //   icon: CreditCardOutline,
    //   path: '/cards'
    // },
    // {
    //   title: 'Tables',
    //   icon: Table,
    //   path: '/tables'
    // },
    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
    {
      sectionTitle: 'Pages'
    },
    // Database Management
    {
      icon: Database,
      title: 'Database Management',
      path: '/databaseManagement',
    },
    {
      icon: AccountCog,
      title: 'Account Management',
      path: '/accountManagement',
      
    },
    {
      icon: AccountConvertOutline,
      title: 'Operations Management',
      path: '/operationsManagement'
    },
    {
      icon: SmartToyIcon,
      title: 'Interactive Chat',
      path: '/pages/InteractiveChat'
    },
    {
      icon: NotificationClearAll,
      title: 'Notifications',
      path: '/notifications'
    },
    {
      icon: AccountGroupOutline,
      title: 'Commercials',
      path: '/commercials'
    },
    {
      icon: MessageTextOutline,
      title: 'Marcom',
      path: '/marcom'
    }   
  ]
}

export default navigation
