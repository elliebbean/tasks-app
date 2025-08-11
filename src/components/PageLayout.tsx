interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <>
      <h1 className="text-2xl ml-4 my-2 sm:ml-10 sm:my-8">{title}</h1>
      <div className="flex justify-center px-2">
        <main className="w-full max-w-2xl">{children}</main>
      </div>
    </>
  );
}
