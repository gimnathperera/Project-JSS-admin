import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const FormHeaderContainer = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    row-gap: 30px;
  `
);

const FormSubHeaderSection = styled(Box)(
  ({ theme }) => `
      display: flex;
      flex-direction: column;
      row-gap: 10px;
    `
);

const Login = () => {
  const navigate = useNavigate();

  const handleOnSubmit = (values) => {
    navigate('/dashboards/crypto');
  };
  const initialFormValues = {
    email: '',
    password: ''
  };

  const userLoginSchema = Yup.object({
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    password: Yup.string().max(255).required('Password is required')
  });
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm">
        <Formik
          initialValues={initialFormValues}
          validationSchema={userLoginSchema}
          onSubmit={(values) => {
            handleOnSubmit(values);
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <FormHeaderContainer sx={{ mb: 3 }}>
                <Typography color="#A4A6B3" variant="h3" align="center">
                  Dashboard
                </Typography>
                <FormSubHeaderSection sx={{ mb: 3 }}>
                  <Typography color="#252733" variant="h2" align="center">
                    Log In to Dashboard
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                    align="center"
                    sx={{
                      letterSpacing: '0.3px',
                      fontSize: '14px',
                      lineHeight: '20px'
                    }}
                  >
                    Enter your email and password below
                  </Typography>
                </FormSubHeaderSection>
              </FormHeaderContainer>

              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
                variant="outlined"
              />
              <Box sx={{ py: 2 }}>
                {/* {loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                )} */}
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Log In
                </Button>
              </Box>
              <Typography color="textSecondary" variant="body1" align="center">
                Don&apos;t have an account?
                <Link
                  component={RouterLink}
                  to="/register"
                  variant="h6"
                  sx={{ textDecoration: 'none' }}
                >
                  Sign up
                </Link>
              </Typography>
            </form>
          )}
        </Formik>
      </Container>
    </Box>
  );
};
export default Login;
