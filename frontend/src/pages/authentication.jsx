import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Authentication() {

const [username, setUsername] = React.useState("");
const [password, setPassword] = React.useState("");
const [name, setName] = React.useState("");

    const [error, setError] = React.useState();
    const [message, setMessage] = React.useState();

    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                let result = await handleLogin(username, password)
            }
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                console.log(result);
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(0)
                setPassword("")
            }
        } catch (err) {
            console.log(err);
            let message = (err.response.data.message);
            setError(message);
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid 
                container 
                component="main" 
                sx={{ 
                    height: '100vh',
                    overflow: 'hidden',
                    padding: { xs: 0, sm: 0, md: '2rem' },
                    gap: { xs: 0, sm: 0, md: '2rem' },
                }}
            >
                <CssBaseline />
                {/* Left side - Background Image */}
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(/public/logo3.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: { xs: 0, sm: 0, md: '2rem' },
                        marginTop: { xs: 0, sm: 0, md: '2rem' },
                        marginBottom: { xs: 0, sm: 0, md: '2rem' },
                        borderRadius: { xs: 0, sm: 0, md: '16px' },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            zIndex: 1,
                            borderRadius: { xs: 0, sm: 0, md: '16px' },
                        }
                    }}
                >
                    {/* Optional: Add some content on the background */}
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 2,
                            textAlign: 'center',
                            color: 'white',
                            px: 6,
                            py: 4,
                        }}
                    >
                        <Typography 
                            variant="h3" 
                            component="h1" 
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                                mb: 3,
                            }}
                        >
                            Welcome to VideoConnect
                        </Typography>
                        <Typography 
                            variant="h6"
                            sx={{
                                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                                lineHeight: 1.6,
                            }}
                        >
                            Connect with friends and colleagues through seamless video calls
                        </Typography>
                    </Box>
                </Grid>
                
                {/* Right side - Form */}
                <Grid 
                    item 
                    xs={12} 
                    sm={8} 
                    md={5} 
                    component={Paper} 
                    elevation={6} 
                    square
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                        backgroundColor: 'white',
                        overflow: 'auto',
                        marginLeft: 'auto',
                        marginRight: { xs: 0, sm: 0, md: '2rem' },
                        marginTop: { xs: 0, sm: 0, md: '2rem' },
                        marginBottom: { xs: 0, sm: 0, md: '2rem' },
                        borderRadius: { xs: 0, sm: 0, md: '16px' },
                        maxWidth: { xs: '100%', sm: '100%', md: '450px' },
                        width: { xs: '100%', sm: '100%', md: '450px' },
                    }}
                >
                    <Box
                        sx={{
                            py: 6,
                            px: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '380px',
                            width: '100%',
                            minHeight: 'fit-content',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
                            {formState === 0 ? 'Sign In' : 'Sign Up'}
                        </Typography>

                        {/* Toggle Buttons */}
                        <Box sx={{ 
                            mb: 4, 
                            display: 'flex', 
                            gap: 1,
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                            borderRadius: '12px',
                            padding: '4px',
                        }}>
                            <Button 
                                variant={formState === 0 ? "contained" : "text"} 
                                onClick={() => { setFormState(0) }}
                                sx={{ 
                                    minWidth: '100px',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: formState === 0 ? 'bold' : 'normal',
                                    boxShadow: formState === 0 ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                                }}
                            >
                                Sign In
                            </Button>
                            <Button 
                                variant={formState === 1 ? "contained" : "text"} 
                                onClick={() => { setFormState(1) }}
                                sx={{ 
                                    minWidth: '100px',
                                    borderRadius: '8px',
                                    textTransform: 'none',
                                    fontWeight: formState === 1 ? 'bold' : 'normal',
                                    boxShadow: formState === 1 ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
                                }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        <Box component="form" noValidate sx={{ mt: 2, width: '100%', maxWidth: '100%' }}>
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    name="name"
                                    value={name}
                                    autoFocus
                                    onChange={(e) => setName(e.target.value)}
                                    sx={{ mb: 2 }}
                                />
                            )}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={username}
                                autoFocus={formState === 0}
                                onChange={(e) => setUsername(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                            
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                sx={{ mb: 3 }}
                            />

                            {error && (
                                <Typography 
                                    color="error" 
                                    variant="body2" 
                                    sx={{ 
                                        mt: 1, 
                                        mb: 2,
                                        textAlign: 'center',
                                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                        padding: '8px 12px',
                                        borderRadius: '4px',
                                        border: '1px solid rgba(244, 67, 54, 0.3)'
                                    }}
                                >
                                    {error}
                                </Typography>
                            )}

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ 
                                    mt: 2, 
                                    mb: 2,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    borderRadius: '8px',
                                    textTransform: 'none'
                                }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Sign In" : "Create Account"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={4000}
                message={message}
                onClose={() => setOpen(false)}
            />
        </ThemeProvider>
    );
}