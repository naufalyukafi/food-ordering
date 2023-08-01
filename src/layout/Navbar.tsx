import {
  Container,
  Box,
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  Heading,
  Input,
  Badge,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import swal from "sweetalert";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import FoodCardCheckout from "../components/FoodCardCheckout";
import { formatRupiah } from "../utils/formatRupiah";
import { IProduct } from "../ts/foood";
import { useRequest } from "../hooks/useRequest";
import { baseURL } from "../api";

const Navbar = ({ ...props }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [queryVoucher, setQueryVoucher] = useState<string>("");
  const [notes, setNotes] = useState<{ [id: number]: string }>({});
  const existingCartItems = localStorage.getItem("cart");
  const [carts, setCarts] = useState<IProduct[]>(
    existingCartItems ? JSON.parse(existingCartItems) : []
  );

  const { data: voucher } = useRequest(`vouchers?kode=${queryVoucher}`);

  const totalItemsInCart = carts?.length;
  console.log(carts);
  const calculateTotalPrice = useCallback(() => {
    let totalPrice = 0;
    carts.forEach((item: IProduct) => {
      const quantity = item.quantity ?? 0;
      totalPrice += item.harga * quantity;
    });
    return totalPrice;
  }, [carts]);

  const handleQuantityChange = (
    itemId: number,
    newQuantity: number,
    newNote: string
  ) => {
    const updatedCarts = carts.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity, note: newNote };
      }
      return item;
    });
    setCarts(updatedCarts);
    setNotes((prevNotes) => ({
      ...prevNotes,
      [itemId]: newNote,
    }));
    localStorage.setItem("cart", JSON.stringify(updatedCarts));
  };

  const handleNoteChange = (itemId: number, newNote: string) => {
    setNotes((prevNotes) => ({
      ...prevNotes,
      [itemId]: newNote,
    }));
  };

  const calculateDiscountedPrice = useCallback(() => {
    if (voucher?.datas) {
      const totalHarga = calculateTotalPrice();
      const voucherData = voucher.datas;
      const hargaSetelahDiskon = totalHarga - voucherData.nominal;
      return hargaSetelahDiskon > 0 ? hargaSetelahDiskon : 0;
    }
    return calculateTotalPrice();
  }, [calculateTotalPrice, voucher]);

  const addItemKeranjang = () => {
    const keranjangItem = {
      nominal_diskon: JSON.stringify(voucher?.datas?.nominal),
      nominal_pesanan: JSON.stringify(calculateTotalPrice()),
      items: carts.map((el) => ({
        id: el.id,
        harga: el.harga,
        catatan: el.note,
      })),
    };
    axios
      .post(baseURL + "order", keranjangItem)
      .then(() => {
        localStorage.clear();
        localStorage.clear();
        setCarts([]);
        setNotes({});
        setQueryVoucher("");
        onClose();
        swal({
          title: "Sukses",
          text: "Anda berhasil checkout",
          icon: "success",
          timer: 2000,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box as="nav" w="100%" backgroundColor="white" {...props}>
      <Container
        display="flex"
        alignItems="center"
        p={3}
        maxW="container.lg"
        justifyContent="space-between"
      >
        <div>
          <Link to="/">
            <Heading cursor="pointer" as="h3" size="md" color={"teal"}>
              Main Course
            </Heading>
          </Link>
        </div>

        <Box>
          <IconButton
            colorScheme="teal"
            aria-label="Call Segun"
            size="md"
            icon={<FaShoppingCart />}
            style={{ marginRight: 15 }}
            onClick={onOpen}
          />
          <Badge marginLeft={"-12px"} marginRight="6px" marginTop="-40px">
            {totalItemsInCart}
          </Badge>
        </Box>

        <Drawer size="sm" isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Main Course</DrawerHeader>
            <Divider />
            <DrawerBody>
              {carts?.map((el: IProduct, i: number) => (
                <FoodCardCheckout
                  onQuantityChange={(newQuantity, newNote) =>
                    handleQuantityChange(el.id, newQuantity, newNote)
                  }
                  onNoteChange={(newNote) => handleNoteChange(el.id, newNote)}
                  key={i}
                  id={el.id}
                  gambar={el.gambar}
                  harga={el.harga}
                  nama={el.nama}
                  tipe={el.tipe}
                  quantity={el.quantity}
                  note={notes[el.id] || ""}
                />
              ))}

              <Divider mt={10} mb={4} />
              <Text fontSize="sm" fontWeight="semibold" mb={2}>
                Tambah Voucher
              </Text>
              <Input
                value={queryVoucher}
                onChange={(e) => setQueryVoucher(e.target.value)}
                placeholder="Masukkan Vouchermu disini"
                size="sm"
              />
              {queryVoucher.length > 0 && !voucher?.datas && (
                <Text fontSize="xs" mt={2} color="red">
                  * Voucher Tidak ditemukan
                </Text>
              )}
            </DrawerBody>

            <DrawerFooter>
              <Box width="100%">
                <Flex
                  justifyContent="space-between"
                  mb={5}
                  backgroundColor="blackAlpha.100"
                  p={3}
                  borderRadius={6}
                >
                  <Text>Total</Text>
                  {queryVoucher.length > 0 && voucher?.datas ? (
                    <>
                      <Text>{formatRupiah(calculateDiscountedPrice())}</Text>
                    </>
                  ) : (
                    <Text>{formatRupiah(calculateTotalPrice())}</Text>
                  )}
                </Flex>
                {queryVoucher.length > 0 && voucher?.datas && (
                  <Text
                    textAlign="right"
                    fontSize="md"
                    color="green.500"
                    mb={5}
                    mt="-5px"
                  >
                    Anda Hemat {formatRupiah(voucher.datas.nominal)}
                  </Text>
                )}
                <Button
                  onClick={addItemKeranjang}
                  width="100%"
                  colorScheme="blue"
                >
                  Buat Pesanan
                </Button>
              </Box>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Container>
    </Box>
  );
};

export default Navbar;
