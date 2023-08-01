import React from "react";
import {
  Card,
  Heading,
  CardBody,
  CardFooter,
  Image,
  Text,
  Stack,
  Button,
  Center,
} from "@chakra-ui/react";
import swal from "sweetalert";
import { formatRupiah } from "../utils/formatRupiah";
import { IProduct } from "../ts/foood";

const FoodCard = ({ gambar, harga, nama, tipe, id }: IProduct) => {
  const addToCart = () => {
    const existingCartItems = localStorage.getItem("cart");
    const cartItems = existingCartItems ? JSON.parse(existingCartItems) : [];

    const isItemExistInCart = cartItems.some(
      (item: IProduct) => item.id === id
    );

    if (!isItemExistInCart) {
      const newItem = { id, gambar, harga, nama, tipe, quantity: 1 };
      cartItems.push(newItem);

      localStorage.setItem("cart", JSON.stringify(cartItems));

      swal({
        title: "Masuk Keranjang!",
        text: "Item berhasil ditambahkan ke keranjang.",
        icon: "success",
      });
    } else {
      swal({
        title: "Peringatan!",
        text: "Item sudah ada di keranjang.",
        icon: "warning",
      });
    }
  };

  return (
    <Card maxW="xs" key={id}>
      <CardBody>
        <Center>
          <Image
            src={
              gambar
                ? gambar
                : "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            }
            maxH={120}
            minH={120}
            objectFit="contain"
            alt={nama}
            borderRadius="lg"
          />
        </Center>
        <Stack mt="6" spacing="3">
          <Heading size="md">{nama}</Heading>
          <Text color="#009aad" fontSize="md" fontWeight="bold">
            {formatRupiah(harga)}
          </Text>
        </Stack>
        <Button
          mt={5}
          width="100%"
          colorScheme="#009aad"
          backgroundColor="#009aad"
          onClick={addToCart}
        >
          Tambahkan ke keranjang
        </Button>
      </CardBody>
    </Card>
  );
};

export default FoodCard;
