import { Container } from "@chakra-ui/react";
const data = new Array(20).fill({});

export const PageSkeleton = () => {
  return (
    <Container
      justifyContent="center"
      alignItems="center"
      maxW="container.lg"
      pt={20}
      pb={20}
    >
      <main className="p-8 h-screen">
        <div className="p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
            {data.map((_, index) => (
              <div
                key={index}
                className="bg-slate-200 rounded-lg p-4 hover:cursor-pointer h-40"
              />
            ))}
          </div>
        </div>
      </main>
    </Container>
  );
};
