import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { countries } from "../../utils/countries";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext } from "react";
import { CartContext } from "../../context";

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get("firstName") || "",
    lastName: Cookies.get("lastName") || "",
    address: Cookies.get("address") || "",
    address2: Cookies.get("address2") || "",
    zip: Cookies.get("zip") || "",
    city: Cookies.get("city") || "",
    country: Cookies.get("country") || countries[0].code,
    phone: Cookies.get("phone") || "",
  };
};

const AddressPage = () => {
  const router = useRouter();

  const { updateAdress } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: getAddressFromCookies(),
  });

  const onSubmitAddress = (data: FormData) => {
    updateAdress(data);
    router.push("/checkout/summary");
  };

  return (
    <ShopLayout
      title={"Direccion"}
      pageDescription={"Confirmar direccion del destino"}
    >
      <form onSubmit={handleSubmit(onSubmitAddress)} noValidate>
        <Typography variant="h1" component={"h1"}>
          Dirección
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item sm={6}>
            <TextField
              label={"Nombre"}
              variant="filled"
              fullWidth
              {...register("firstName", {
                required: "Este campo es requerido",
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label={"Apellido"}
              variant="filled"
              fullWidth
              {...register("lastName", {
                required: "Este campo es requerido",
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              label={"Direccion"}
              variant="filled"
              fullWidth
              {...register("address", {
                required: "Este campo es requerido",
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label={"Direccion 2"}
              variant="filled"
              fullWidth
              {...register("address2")}
            />
          </Grid>

          <Grid item sm={6}>
            <TextField
              label={"Codigo Postal"}
              variant="filled"
              fullWidth
              {...register("zip", {
                required: "Este campo es requerido",
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label={"Ciudad"}
              variant="filled"
              fullWidth
              {...register("city", {
                required: "Este campo es requerido",
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>

          <Grid item sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                variant="filled"
                label="Pais"
                defaultValue={countries[0].code}
                {...register("country", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.country}
                //helperText={errors.country?.message}
              >
                {countries.map((country) => (
                  <MenuItem value={country.code}>{country.name}</MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item sm={6}>
            <TextField
              label={"Telefono"}
              variant="filled"
              fullWidth
              {...register("phone", {
                required: "Este campo es requerido",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>
        <Box
          sx={{
            mt: 5,
          }}
          display="flex"
          justifyContent={"center"}
        >
          <Button
            color="secondary"
            className="circular-btn"
            size="large"
            type="submit"
          >
            Revisar pedido
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// Esto ahora se puede hacer con middleware

/* 
export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const { token= '' } = await req.cookies  

  let userId='';
  let isValidToken= false;
  try {
    userId= await jwt.isValidToken(token);
    isValidToken=true;
  } catch (error) {
    isValidToken= false;
  }

  if(!isValidToken){
    return{
      redirect:{
        destination: '/auth/login?p=/checkout/address',
        permanent: false
      }
    }
  }

  return {
    props: {
      
    }
  }
} */

export default AddressPage;
