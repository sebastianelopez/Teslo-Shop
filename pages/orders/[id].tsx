import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { CartList, OrderSummary } from "../../components/cart";
import { ShopLayout } from "../../components/layouts/ShopLayout";

const OrderPage = () => {
  return (
    <ShopLayout
      title={"Resumen de la orden 21544215"}
      pageDescription={"Resumen de la orden"}
    >
      <Typography variant="h1" component={"h1"}>
        Orden 21544215
      </Typography>

      {/* <Chip
        sx={{ my: 2 }}
        label="Pendiente de pago"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}

      <Chip
        sx={{ my: 2 }}
        label="Pagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          {/**Cart list */}
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          {/**Cart list */}
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 Productos)</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display={"flex"} justifyContent="space-between">
                <Typography variant="subtitle1">
                  Direccion de entrega
                </Typography>
                <NextLink href={"/checkout/address"} passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box display={"flex"} justifyContent="end">
                <NextLink href={"/cart"} passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              {/**Orden summary */}
              <OrderSummary />
              <Box
                sx={{
                  mt: 3,
                }}
              >
                <Button color="secondary" className="circular-btn" fullWidth>
                  Pagar
                </Button>
                <Chip
                  sx={{ my: 2 }}
                  label="Pagada"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
