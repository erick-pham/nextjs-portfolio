import MainLayout from "@/components/MainLayout";

const HomePage: React.FC<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => <MainLayout>{children}</MainLayout>;

export default HomePage;
