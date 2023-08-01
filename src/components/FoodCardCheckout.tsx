import { useState } from "react";
import {
  Image,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Button,
  Text,
  Input,
  Flex,
  HStack,
  Box,
} from "@chakra-ui/react";
import { formatRupiah } from "../utils/formatRupiah";
import { IProduct } from "../ts/foood";

interface FoodCardCheckoutProps extends IProduct {
  onQuantityChange: (newQuantity: number, newNote: string) => void;
  onNoteChange: (newNote: string) => void;
  note: string; // Added 'note' prop to receive and display notes
}

const FoodCardCheckout: React.FC<FoodCardCheckoutProps> = ({
  gambar,
  harga,
  nama,
  tipe,
  quantity,
  onQuantityChange,
  onNoteChange,
  note,
}: FoodCardCheckoutProps) => {
  const [itemQuantity, setItemQuantity] = useState<number>(quantity ?? 0);
  const handleDecrease = () => {
    const newQuantity = Math.max(0, itemQuantity - 1);
    setItemQuantity(newQuantity);
    onQuantityChange(newQuantity, note);
  };

  const handleIncrease = () => {
    const newQuantity = itemQuantity + 1;
    setItemQuantity(newQuantity);
    onQuantityChange(newQuantity, note);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNote = e.target.value;
    onNoteChange(newNote);
  };

  return (
    <>
      <Card
        mt={2}
        width="100%"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="unstyled"
        gap={5}
      >
        <Image
          objectFit="cover"
          rounded="md"
          width={100}
          height={100}
          src={
            gambar
              ? gambar
              : "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          }
          alt={nama}
        />

        <Stack width="100%">
          <CardBody>
            <Heading fontWeight="semibold" size="sm">
              {nama}
            </Heading>
            <Text color="#009aad" fontSize="sm" fontWeight="semibold">
              {formatRupiah(harga)}
            </Text>
          </CardBody>

          <Flex
            minWidth="100%"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>{tipe}</Text>

            <HStack maxW="150px" mt={2}>
              <Button
                size="xs"
                colorScheme="#009aad"
                backgroundColor="#009aad"
                disabled={itemQuantity === 0}
                onClick={handleDecrease}
              >
                -
              </Button>
              <Box
                bg="white"
                borderRadius={2}
                paddingLeft={2}
                paddingTop={2}
                paddingBottom={2}
                paddingRight={2}
              >
                <Text>{itemQuantity}</Text>
              </Box>
              <Button
                size="xs"
                colorScheme="#009aad"
                backgroundColor="#009aad"
                onClick={handleIncrease}
              >
                +
              </Button>
            </HStack>
          </Flex>
        </Stack>
      </Card>
      <Input
        value={note}
        onChange={handleNoteChange}
        mb={5}
        size="sm"
        mt={4}
        placeholder="Masukkan catatan disini..."
      />
    </>
  );
};

export default FoodCardCheckout;
