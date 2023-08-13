import { FC } from "react"
import { authAPI } from "../services/AuthService"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import {
  TextField,
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  Alert,
} from "@mui/material"
import { setUser } from "../store/reducers/userSlice"
import { useAppDispatch } from "../hooks/redux"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { LoadingButton } from "@mui/lab"
import { SubmitHandler, useForm } from "react-hook-form"
import { User as IFirebaseUser } from "firebase/auth"

interface FormValues {
  firstName?:string;
  lastName?:string;
  email:string;
  password:string;
}


const Auth: FC = () => {
  const { pathname } = useLocation()
  const [loginUser, { error: loginError, isLoading: loginLoading }] = authAPI.useLoginMutation()
  const [registerUser, { error: registerError, isLoading: registerLoading }] = authAPI.useRegisterMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({mode:"onBlur"})

  const handleAuth:SubmitHandler<FormValues> = async (data) => {
    if (pathname === "/login") {
      const response = await loginUser(data)
      if(loginError){
        return;
      }
      else{
      dispatch(
        setUser({ email: (response as {data: IFirebaseUser}).data.email, id: (response as { data: IFirebaseUser }).data.uid }),
      )
      navigate("/")
      }
    } else {
      const response = await registerUser(data)
      if(registerError){
        return;
      }
      else{
      dispatch(
        setUser({ email: (response as {data: IFirebaseUser}).data.email, id: (response as { data: IFirebaseUser }).data.uid }),
      )
      navigate("/")
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {pathname === "/login" ? "Войти" : "Зарегистрироваться"}
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleAuth)}
          sx={{ mt: 1 }}
        >
          {pathname === "/register" && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("firstName", {
                      required: "Поле обязательно",
                      minLength: {
                        value: 2,
                        message: "Длина должна быть больше 2-х символов",
                      },
                    })}
                    autoComplete="given-name"
                    name="firstName"
                    error={!!errors.firstName}
                    helperText={errors?.firstName?.message?.toString()}
                    fullWidth
                    required
                    id="firstName"
                    label="Имя"
                    
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...register("lastName", {
                      required: "Поле обязательно",
                      minLength: {
                        value: 2,
                        message: "Длина должна быть больше 2-х символов",
                      },
                    })}
                    error={!!errors.lastName}
                    helperText={errors?.lastName?.message?.toString()}
                    fullWidth
                    required
                    id="lastName"
                    label="Фамилия"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
              </Grid>
            </>
          )}
          <TextField
            {...register("email", {
              required: "Поле обязательно",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Неверная форма электронной почты",
              },
            })}
            margin="normal"
            error={!!errors.email}
            helperText={errors?.email?.message?.toString()}
            type={"email"}
            required
            fullWidth
            id="email"
            label="Email"
            autoComplete="email"
            
          />
          <TextField
            {...register("password", {
              required: "Поле обязательно",
              minLength: {
                value: 6,
                message: "Длина пароля должна быть больше 6 символов",
              },
            })}
            error={!!errors.password}
            helperText={errors?.password?.message?.toString()}
            margin="normal"
            required
            fullWidth
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {loginError && <Alert severity="error">{loginError?.message?.split("Error")[1]}</Alert>}
          {registerError && <Alert severity="error">{registerError?.message?.split("Error")[1]}</Alert>}
          <LoadingButton
            fullWidth
            loading={loginLoading || registerLoading}
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {pathname === "/login" ? "Войти" : "Зарегистрироваться"}
          </LoadingButton>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              {pathname === "/login" ? (
                <Link to="/register">{"Нет аккаунта? Зарегистрироваться"}</Link>
              ) : (
                <Link to="/login">{"Уже есть аккаунт? Войти"}</Link>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Auth