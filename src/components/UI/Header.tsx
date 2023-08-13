import {
  AppBar,
  Typography,
  Button,
  Toolbar,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { removeUser } from "../../store/reducers/userSlice"
import { getProfileName } from "../../utils/getProfileName"
import { authAPI } from "../../services/AuthService"

export default function Header() {
  const [logout] = authAPI.useLogoutMutation()
  const dispatch = useAppDispatch()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const user = useAppSelector(state => state.userReducer)
  function handleLogout() {
    handleCloseUserMenu()
    dispatch(removeUser())
    logout(null)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color={"primary"}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              to="/"
              state={{ email: user.email }}
              style={{ textDecoration: "inherit", color: "inherit" }}
            >
              Sociale
            </Link>
          </Typography>
          {user.id ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src={user.avatarUrl!} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu} disabled>
                  <Typography component="div">Logged in as: {getProfileName(user.email)}</Typography>
                </MenuItem>
                <Divider />
                <Link
                  to={user.id}
                  style={{ textDecoration: "inherit", color: "inherit" }}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    Profile
                  </MenuItem>
                </Link>
                <Link
                  to="settings"
                  style={{ textDecoration: "inherit", color: "inherit" }}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    Settings
                  </MenuItem>
                </Link>

                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) :
            <>
              <Button>
                <Link
                  to="login"
                  style={{ textDecoration: "inherit", color: "white" }}
                >
                  Login
                </Link>
              </Button>
              <Button>
                <Link
                  to="register"
                  style={{ textDecoration: "inherit", color: "white" }}
                >
                  Register
                </Link>
              </Button>
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  )
}
